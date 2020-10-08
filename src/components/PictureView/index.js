import React, { useState, useContext } from 'react';
import { Line } from 'react-lineto';
import PropTypes from 'prop-types';

import { ROMI_API } from 'utils/constants';
import Button from 'components/Button';
import Loading from 'components/Loader';
import { PlantContext } from 'utils/providers/plant';
import useRouter from 'utils/hooks/router';

import { useRomiAnalyses } from './api';
import {
  Center,
  Layout,
  ButtonList,
  Image,
  ImgContainer,
  ThumbnailContainer,
  Thumbnail,
  ThumbnailInView,
} from './style';

export const PictureView = ({ imgData, plantData, scanId }) => {
  const [select, setSelect] = useState('picture');
  const { onRequest, viewOptions } = useRomiAnalyses(imgData, plantData.id);
  const router = useRouter();
  const { plant, setPlant } = useContext(PlantContext);

  const getPlantImage = () => (select === 'picture' ? plant?.image : plant?.mask);

  const clickEvent = evt => {
    const boardPic = document.getElementById('board-picture');
    const thumb = document.getElementById('thumbnail');
    const scrollLeftMax = boardPic.scrollLeftMax || 0;
    const scrollTopMax = boardPic.scrollTopMax || 0;
    const ratioX = viewOptions.width / (evt.target.width + scrollLeftMax);
    const ratioY = viewOptions.height / (evt.target.height + scrollTopMax);
    const clientx = evt.clientX + boardPic.scrollLeft - boardPic.offsetLeft;
    const clienty = evt.clientY + boardPic.scrollTop - boardPic.offsetTop;

    const value = viewOptions.plants
      .map(({ x: px, y: py, width, height, ...res }) => ({
        x: (px + evt.target.width * 2 + width / 2) / ratioX,
        y: (py + height / 2) / ratioY,
        width: width / ratioX,
        height: height / ratioY,
        ...res,
      }))
      .find(
        ({ x: px, y: py, width, height }) =>
          clientx >= px - width && clientx <= px + width && clienty >= py - height && clienty <= py + height,
      );

    if (!value) return;
    setPlant({
      id: value.id,
      plantId: value.observation_unit,
      image: value.image,
      mask: value.mask,
      x: value.x,
      y: value.y,
      width: value.width,
      height: value.height,
      line: {
        x0: thumb.offsetLeft + thumb.offsetWidth,
        y0: thumb.offsetTop + thumb.offsetHeight / 2,
        x1: value.x + boardPic.scrollLeft + boardPic.offsetLeft,
        y1: value.y + boardPic.scrollTop + boardPic.offsetTop + value.height / 2,
      },
      bright: true,
    });
    if (!router.pathname.includes('plant')) router.push(`/plant/${scanId}`);
  };

  if (onRequest) return <Loading />;
  if (!imgData || !viewOptions) return <Center>There is no image or plant analyses of the board</Center>;
  return (
    <>
      {plant?.line && Object.keys(plant.line).some(key => plant.line[key] !== 0) && (
        <Line {...plant.line} borderStyle="dashed" borderColor="#d3d3d3" borderWidth={2} />
      )}
      <Layout>
        <ButtonList>
          <ThumbnailContainer id="thumbnail" show={getPlantImage()}>
            {plant?.image && (
              <Thumbnail
                alt="Selected Plant"
                show={getPlantImage()}
                src={`${ROMI_API}/images/${getPlantImage()}?size=thumb`}
              />
            )}
          </ThumbnailContainer>
          <Button active={select === 'picture'} onClick={() => setSelect('picture')}>
            Picture
          </Button>
          <Button active={select === 'inspection'} onClick={() => setSelect('inspection')}>
            Inspection
          </Button>
        </ButtonList>

        {viewOptions?.options[select] && (
          <ImgContainer id="board-picture" onClick={clickEvent}>
            {plant?.bright && (
              <ThumbnailInView
                alt="thumbnail-view"
                x={plant?.x}
                y={plant?.y}
                width={plant?.width}
                height={plant?.height}
                src={`${ROMI_API}/images/${getPlantImage()}?size=thumb`}
                isMaskActive={select === 'inspection'}
              />
            )}

            <Image
              alt="board picture"
              brightness={plant?.bright}
              src={`${ROMI_API}/images/${viewOptions.options[select]}?size=large`}
            />
          </ImgContainer>
        )}
      </Layout>
    </>
  );
};

PictureView.propTypes = {
  imgData: PropTypes.shape({
    id: PropTypes.string,
  }),
  plantData: PropTypes.shape({
    id: PropTypes.string,
  }),
  scanId: PropTypes.string,
};

PictureView.defaultProps = {
  imgData: undefined,
  plantData: undefined,
  scanId: '',
};
