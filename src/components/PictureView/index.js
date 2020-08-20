import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ROMI_API } from '../../utils/constants';
import { Center, Layout, ButtonList, Image, ImgContainer } from './style';
import Button from '../Button';

export const PictureView = ({ imgData, plantData }) => {
  const [viewOptions, setViewOptions] = useState(undefined);
  const [onRequest, setOnRequest] = useState(true);
  const [select, setSelect] = useState('picture');

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

  if (onRequest) return <Center>Loading...</Center>;

  if (!imgData || !viewOptions) return <Center>There is no image or plant analyses of the board</Center>;

  return (
    <Layout>
      <ButtonList>
        <Button active={select === 'picture'} onClick={() => setSelect('picture')}>
          Picture
        </Button>
        <Button active={select === 'inspection'} onClick={() => setSelect('inspection')}>
          Inspection
        </Button>
      </ButtonList>
      <ImgContainer>
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
};
PictureView.defaultProps = {
  imgData: undefined,
  plantData: undefined,
};
