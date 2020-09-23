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
  DebugInputs,
} from './style';

export const PictureView = ({ imgData, plantData, scanId }) => {
  const [select, setSelect] = useState('picture');
  const [debug, setDebug] = useState([]);
  const { onRequest, viewOptions } = useRomiAnalyses(imgData, plantData.id);
  const router = useRouter();
  const { plant, setPlant } = useContext(PlantContext);

  const clickEvent = evt => {
    const boardPic = document.getElementById('board-picture');
    const thumb = document.getElementById('thumbnail');
    const scrollLeftMax = boardPic.scrollLeftMax || 0;
    const scrollTopMax = boardPic.scrollTopMax || 0;
    const ratioX = viewOptions.width / (evt.target.width + scrollLeftMax);
    const ratioY = viewOptions.height / (evt.target.height + scrollTopMax);
    const x = (evt.clientX + boardPic.scrollLeft - boardPic.offsetLeft) * ratioX;
    const y = (evt.clientY + boardPic.scrollTop - boardPic.offsetTop) * ratioY;
    const value = viewOptions.plants.find(
      ({ x: px, y: py, width, height }) => x >= px - width && x <= px + width && y >= py - height && y <= py + height,
    );

    if (!value) return;
    setPlant({
      id: value.id,
      plantId: value.observation_unit,
      image: value.image,
      x: value.x / ratioX,
      y: (value.y - value.height / 2) / ratioY,
      width: value.width / ratioX,
      height: value.height / ratioY,
      line: {
        x0: thumb.offsetLeft + thumb.offsetWidth,
        y0: thumb.offsetTop + thumb.offsetHeight / 2,
        x1: value.x / ratioX + boardPic.scrollLeft + boardPic.offsetLeft,
        y1: value.y / ratioY + boardPic.scrollTop + boardPic.offsetTop,
      },
      bright: true,
    });
    if (!router.pathname.includes('plant')) router.push(`/plant/${scanId}`);
  };

  const doDebug = evt => {
    const boardPic = document.getElementById('debug-pic');
    const scrollLeftMax = boardPic.scrollLeftMax || 0;
    const scrollTopMax = boardPic.scrollTopMax || 0;
    const ratioX = viewOptions.width / (evt.target.width + scrollLeftMax);
    const ratioY = viewOptions.height / (evt.target.height + scrollTopMax);

    setDebug(
      viewOptions.plants.map(({ x, y, width, height, image, id }) => ({
        x: x / ratioX,
        y: (y + height / 2) / ratioY,
        width: width / ratioX,
        height: height / ratioY,
        image,
        id,
      })),
    );
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
          <ThumbnailContainer id="thumbnail" show={plant?.image}>
            {plant?.image && (
              <Thumbnail
                alt="Selected Plant"
                show={plant.image}
                src={`${ROMI_API}/images/${plant.image}?size=thumb&orientation=horizontal`}
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

        {router.pathname.includes('crop') && viewOptions?.options[select] && (
          <ImgContainer id="debug-pic" onClick={doDebug}>
            {debug.length > 0 &&
              debug.map(({ x, y, width, height, image, id }) => (
                <div key={id}>
                  <ThumbnailInView
                    alt="thumbnail-view"
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    src={`${ROMI_API}/images/${image}?size=thumb&orientation=horizontal`}
                  />
                  <DebugInputs x={x} y={y}>
                    {id}
                  </DebugInputs>
                </div>
              ))}

            <Image
              alt="board picture"
              brightness
              src={`${ROMI_API}/images/${viewOptions.options[select]}?size=large`}
            />
          </ImgContainer>
        )}

        {router.pathname.includes('plant') && viewOptions?.options[select] && (
          <ImgContainer id="board-picture" onClick={clickEvent}>
            {plant?.bright && (
              <ThumbnailInView
                alt="thumbnail-view"
                x={plant?.x}
                y={plant?.y}
                width={plant?.width}
                height={plant?.height}
                src={`${ROMI_API}/images/${plant?.image}?size=thumb&orientation=horizontal`}
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
