import React, { useEffect, useState, useContext, useRef } from 'react';
import { Line } from 'react-lineto';
import PropTypes from 'prop-types';

import useRouter from 'utils/hooks/router';
import { ROMI_API } from 'utils/constants';
import Button from 'components/Button';
import { StageContext } from 'utils/providers/stage';
import Loading from 'components/Loader';
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
import { useRomiAnalyses } from './api';

export const PictureView = ({ imgData, plantData, scanId }) => {
  const ref = useRef(null);
  const router = useRouter();
  const [blur, setBlur] = useState(false);
  const { setPlantId } = useContext(StageContext);
  const [select, setSelect] = useState('picture');
  const { onRequest, viewOptions } = useRomiAnalyses(imgData, plantData.id);
  const [currentPlant, setCurrentPlant] = useState({ id: -1, image: '' });
  const [line, setLine] = useState({
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
  });

  const resetValues = () => {
    setCurrentPlant({ id: -1, image: '' });
    setBlur(false);
    setLine({ x0: 0, y0: 0, x1: 0, y1: 0 });
  };

  useEffect(() => {
    const clickEvent = evt => {
      if (ref.current && !ref.current.contains(evt.target)) {
        resetValues();
        return;
      }
      const boardPic = document.getElementById('board-picture');
      const ratioX = parseFloat(viewOptions.width / (evt.target.width + boardPic.scrollLeftMax));
      const ratioY = parseFloat(viewOptions.height / (evt.target.height + boardPic.scrollTopMax));
      const x = (evt.clientX + boardPic.scrollLeft - boardPic.offsetLeft) * ratioX;
      const y = (evt.clientY + boardPic.scrollTop - boardPic.offsetTop) * ratioY;

      const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = document.getElementById('thumbnail');
      const plant = viewOptions.plants.find(
        ({ x: px, y: py, width, height }) => x >= px - width && x <= px + width && y >= py - height && y <= py + height,
      );

      if (!plant) return;
      setCurrentPlant({
        ...plant,
        x: plant.x / ratioX,
        y: (plant.y - plant.height / 2) / ratioY,
        width: plant.width / ratioX,
        height: plant.height / ratioY,
      });
      if (!router.pathname.includes('plant')) router.push(`/plant/${scanId}`);
      else {
        setPlantId(plant.id);
        setLine({
          x0: offsetLeft + offsetWidth,
          y0: offsetTop + offsetHeight / 2,
          x1: plant.x / ratioX + boardPic.scrollLeft + boardPic.offsetLeft,
          y1: plant.y / ratioY + boardPic.scrollTop + boardPic.offsetTop,
        });
        setBlur(true);
      }
    };

    document.addEventListener('mousedown', clickEvent);
    return () => {
      document.removeEventListener('mousedown', clickEvent);
    };
  }, [ref, viewOptions, scanId, setPlantId, router]);

  if (onRequest) return <Loading />;
  if (!imgData || !viewOptions) return <Center>There is no image or plant analyses of the board</Center>;
  return (
    <>
      {Object.keys(line).some(key => line[key] !== 0) && (
        <Line {...line} borderStyle="dashed" borderColor="#d3d3d3" borderWidth="2" />
      )}
      <Layout>
        <ButtonList>
          <ThumbnailContainer id="thumbnail" style={{ opacity: currentPlant?.image ? 1 : 0 }}>
            <Thumbnail
              style={{ display: currentPlant?.image ? 'unset' : 'hidden' }}
              alt="Selected Plant"
              src={`${ROMI_API}/images/${currentPlant?.image}?size=thumb&orientation=horizontal&direction=ccw`}
            />
          </ThumbnailContainer>
          <Button active={select === 'picture'} onClick={() => setSelect('picture')}>
            Picture
          </Button>
          <Button active={select === 'inspection'} onClick={() => setSelect('inspection')}>
            Inspection
          </Button>
        </ButtonList>
        <ImgContainer id="board-picture" ref={ref}>
          {blur && (
            <ThumbnailInView
              alt="thumbnail-view"
              {...currentPlant}
              src={`${ROMI_API}/images/${currentPlant?.image}?size=thumb&orientation=horizontal&direction=ccw`}
            />
          )}
          <Image
            alt="board picture"
            style={{ filter: blur && 'brightness(0.5)' }}
            src={`${ROMI_API}/images/${viewOptions.options[select]}?size=large&orientation=horizontal&direction=ccw`}
          />
        </ImgContainer>
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
