import React, { useEffect, useState, useContext } from 'react';
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
          width: dataImg.width,
          height: dataImg.height,
          plants: dataPlant.plants.map(({ location: [x, y], ...res }) => ({
            x,
            y,
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

  const calculateClickArea = ({ clientY, clientX, target }) => {
    const { scrollLeft, scrollLeftMax, scrollTop, scrollTopMax, offsetTop, offsetLeft } = document.getElementById(
      'board-picture',
    );
    const ratioX = viewOptions.height / (target.height + scrollTopMax);
    const ratioY = viewOptions.width / (target.width + scrollLeftMax);

    return {
      x: (clientX + scrollLeft - offsetLeft) * ratioX,
      y: (clientY + scrollTop - offsetTop) * ratioY,
    };
  };

  const clickEvent = evt => {
    const { x, y } = calculateClickArea(evt);
    const plant = viewOptions.plants.find(
      ({ x: px, y: py, width, height }) => x <= py + width && y <= px + height && x >= py - width && y >= px - height,
    );
    if (!plant) return;
    setCurrentPlant({ id: plant.id, image: plant.image });

    if (!router.pathname.includes('plant')) router.push(`/plant/${scanId}`);
    else setPlantId(plant.id);
  };

  if (onRequest) return <Loading />;
  if (!imgData || !viewOptions) return <Center>There is no image or plant analyses of the board</Center>;

  return (
    <Layout>
      <ButtonList>
        {currentPlant?.image && (
          <ThumbnailContainer>
            <Thumbnail
              alt="Selected Plant"
              width="80px"
              height="80px"
              src={`${ROMI_API}/images/${currentPlant?.image}?size=thumb`}
            />
          </ThumbnailContainer>
        )}
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
          width="250px"
          height="1000px"
          src={`${ROMI_API}/images/${viewOptions.options[select]}?size=large`}
        />
      </ImgContainer>
    </Layout>
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
