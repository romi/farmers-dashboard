import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ROMI_API } from '../../utils/constants';
import { Center, Layout, ButtonList, Image, ImgContainer } from './style';
import Button from '../Button';

export const PictureView = ({ farmId, zoneId, imgData, plantData }) => {
  const [viewOptions, setViewOptions] = useState(undefined);
  const [onRequest, setOnRequest] = useState(true);
  const [select, setSelect] = useState('picture');

  useEffect(() => {
    (async () => {
      if (!imgData) return;

      try {
        const dataImg = (await axios.get(
          `${ROMI_API}/farms/${farmId}/zones/${zoneId}/analyses/${imgData.id}`,
        )).data;
        const dataPlant = (await axios.get(
          `${ROMI_API}/farms/${farmId}/zones/${zoneId}/analyses/${plantData.id}`,
        )).data;
        setViewOptions({
          options: {
            picture: dataImg.results.map,
            inspection: dataImg.results.mask,
          },
          width: dataImg.results.width,
          height: dataImg.results.height,
          plants: dataPlant.results.plants.map(e => ({
            image: e.image,
            x: e.location[0],
            y: e.location[1],
            id: e.id,
            PLA: e.PLA,
            mask: e.mask,
          }))
        });
        setOnRequest(false);
      } catch (e) {
        setOnRequest(false);
        console.error(e);
      }
    })();
  }, [farmId, zoneId, plantData.id, imgData]);

  if (onRequest) return <Center>Loading...</Center>

  if (!imgData || !viewOptions)
  return <Center>There is no image or plant analyses of the board</Center>;

  console.log('data', viewOptions);

  return <Layout>
      <ButtonList>
        <Button active={select === 'picture'} onClick={() => setSelect('picture')}>Picture</Button>
        <Button active={select === 'inspection'} onClick={() => setSelect('inspection')}>Inspection</Button>
      </ButtonList>
      <ImgContainer>
        <Image
          alt="board picture"
          width="250px"
          height="1000px"
          src={`${ROMI_API}/images/${farmId}/${zoneId}/${viewOptions.options[select]}?size=large`}
        />
      </ImgContainer>
    </Layout>;
}
PictureView.propTypes = {
  farmId: PropTypes.string.isRequired,
  zoneId: PropTypes.string.isRequired,
  imgData: PropTypes.any,
  plantData: PropTypes.any
}
PictureView.defaultProp = {
  imgData: undefined,
  plantData: undefined
}