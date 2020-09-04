import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-lineto';
import PropTypes from 'prop-types';
import axios from 'axios';

import useRouter from 'utils/hooks/router';
import { ROMI_API } from 'utils/constants';
import Button from 'components/Button';
import { StageContext } from 'utils/providers/stage';
import Loading from 'components/Loader';
import { Center, Layout, ButtonList, Image, ImgContainer, ThumbnailContainer, Thumbnail } from './style';

export const PictureView = ({ imgData, plantData, scanId }) => {
  const { setPlantId } = useContext(StageContext);
  const [viewOptions, setViewOptions] = useState(undefined);
  const [onRequest, setOnRequest] = useState(true);
  const [currentPlant, setCurrentPlant] = useState({ id: -1, image: '' });
  const [select, setSelect] = useState('picture');
  const [line, setLine] = useState({
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!imgData) return;
      try {
        const {
          data: { results: dataImg },
        } = await axios.get(`${ROMI_API}/analyses/${imgData.id}`);
        const {
          data: { results: dataPlant },
        } = await axios.get(`${ROMI_API}/analyses/${plantData.id}`);
        setViewOptions({
          options: {
            picture: dataImg.map,
            inspection: dataImg.mask,
          },
          width: dataImg.height,
          height: dataImg.width,
          plants: dataPlant.plants.map(({ location: [y, x], ...res }) => ({
            y,
            x,
            ...res,
          })),
        });
        setOnRequest(false);
      } catch (e) {
        setOnRequest(false);
        console.error(e);
      }
    })();
  }, [plantData.id, imgData]);

  const calculateClickArea = ({ clientX, clientY, target }) => {
    const { scrollLeft, scrollLeftMax, scrollTop, scrollTopMax, offsetTop, offsetLeft } = document.getElementById(
      'board-picture',
    );
    const ratioX = parseFloat(viewOptions.width / (target.width + scrollLeftMax));
    const ratioY = parseFloat(viewOptions.height / (target.height + scrollTopMax));

    return {
      x: (clientX + scrollLeft - offsetLeft) * ratioX,
      y: (clientY + scrollTop - offsetTop) * ratioY,
    };
  };

  const clickEvent = evt => {
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = document.getElementById('thumbnail');
    const { x, y } = calculateClickArea(evt);
    const plant = viewOptions.plants.find(
      ({ x: px, y: py, width, height }) => x >= px - width && x <= px + width && y >= py - height && y <= py + height,
    );

    if (!plant) return;
    setCurrentPlant({ id: plant.id, image: plant.image });
    if (!router.pathname.includes('plant')) router.push(`/plant/${scanId}`);
    else {
      setPlantId(plant.id);
      setLine({
        x0: offsetLeft + offsetWidth,
        y0: offsetTop + offsetHeight / 2,
        x1: evt.clientX,
        y1: evt.clientY,
      });
    }
  };

  if (onRequest) return <Loading />;
  if (!imgData || !viewOptions) return <Center>There is no image or plant analyses of the board</Center>;
  return (
    <>
      {Object.keys(line).some(key => line[key] !== 0) && (
        <Line {...line} borderStyle="dashed" borderColor="#d3d3d3" borderWidth="2" zIndex="1000" />
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
        <ImgContainer id="board-picture" onClick={clickEvent}>
          <Image
            alt="board picture"
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
