import React, { useState, useContext } from 'react';
import { Line } from 'react-lineto';
import PropTypes from 'prop-types';

import { ROMI_API } from 'utils/constants';
import Button from 'components/Button';
import Loading from 'components/Loader';
import { PlantContext } from 'utils/providers/plant';
import useRouter from 'utils/hooks/router';

import ReactTooltip from 'react-tooltip';
import { useRomiAnalyses } from './api';
import {
  Center,
  Layout,
  ButtonList,
  DebugInputs,
  Image,
  ImgContainer,
  ThumbnailContainer,
  Thumbnail,
  ThumbnailInView,
  ThumbnailInViewDiv,
  ThumbnailTooltip,
} from './style';

export const PictureView = ({ imgData, plantData, scanId }) => {
  const [select, setSelect] = useState('picture');
  const [debug, setDebug] = useState([]);
  const { onRequest, viewOptions } = useRomiAnalyses(imgData, plantData.id);
  const router = useRouter();
  const { plant, setPlant } = useContext(PlantContext);

  const getPlantImage = () => (select === 'picture' || select === 'debug' ? plant?.image : plant?.mask);

  const clickEvent = evt => {
    const boardPic = document.getElementById('board-picture');
    const thumb = document.getElementById('thumbnail');
    const ratioX = viewOptions.width / evt.target.width;
    const ratioY = viewOptions.height / evt.target.height;
    const clientx = evt.clientX + boardPic.scrollLeft - boardPic.offsetLeft;
    const clienty = evt.clientY + boardPic.scrollTop - boardPic.offsetTop;
    const value = viewOptions.plants
      .map(({ x: px, y: py, width, height, ...res }) => ({
        x: px / ratioX,
        y: py / ratioY,
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

  const doDebug = () => {
    const boardPic = document.getElementById('board-picture');
    const ratioX = viewOptions.width / boardPic.clientWidth;
    const ratioY = viewOptions.height / boardPic.clientHeight;

    setDebug(
      viewOptions.plants.map(({ x, y, width, height, image, id }) => ({
        x: x / ratioX,
        y: y / ratioY,
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
          <ThumbnailContainer id="thumbnail" show={getPlantImage()}>
            {plant?.image && (
              <>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a data-tip data-for="thumbnail-picture-view">
                  <Thumbnail
                    alt="Selected Plant"
                    show={getPlantImage()}
                    src={`${ROMI_API}/images/${getPlantImage()}?size=thumb`}
                  />
                </a>
                <ReactTooltip id="thumbnail-picture-view" place="right" type="dark" effect="solid">
                  <ThumbnailTooltip
                    alt="Selected Plant"
                    show={getPlantImage()}
                    src={`${ROMI_API}/images/${getPlantImage()}?size=thumb`}
                  />
                </ReactTooltip>
              </>
            )}
          </ThumbnailContainer>
          <Button
            active={select === 'picture'}
            onClick={() => {
              setSelect('picture');
              setDebug([]);
            }}
          >
            Picture
          </Button>
          <Button
            active={select === 'inspection'}
            onClick={() => {
              setSelect('inspection');
              setDebug([]);
            }}
          >
            Inspection
          </Button>
          {process.env.REACT_APP_DEBUG === 'true' && (
            <Button
              active={select === 'debug'}
              onClick={() => {
                setSelect('debug');
                doDebug();
              }}
            >
              Debug
            </Button>
          )}
        </ButtonList>

        {viewOptions?.options[select === 'debug' ? 'picture' : select] && (
          <ImgContainer id="board-picture" onClick={clickEvent}>
            {debug.length > 0 &&
              debug.map(({ x, y, width, height, image, id }) => (
                <div key={id}>
                  <ThumbnailInView
                    debug
                    alt="thumbnail-view"
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    src={`${ROMI_API}/images/${image}?size=thumb`}
                  />
                  <DebugInputs debug x={x} y={y}>
                    {id}
                  </DebugInputs>
                </div>
              ))}
            {plant?.bright && (
              <ThumbnailInViewDiv
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
              brightness={select === 'debug' || plant?.bright}
              src={`${ROMI_API}/images/${viewOptions.options[select === 'debug' ? 'picture' : select]}?size=large`}
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
