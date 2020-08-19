import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ROMI_API } from '../../utils/constants';
import { Center, Layout } from './style';

export const PictureView = ({ farmId, zoneId, imgData }) => {
  const [viewOptions, setViewOptions] = useState();

  useEffect(() => {
    (async () => {
      if (!imgData) return;

      try {
        const { data } = await axios.get(
          `${ROMI_API}/farms/${farmId}/zones/${zoneId}/analyses/${imgData.id}`,
        );
        console.log('data', data.results);
        setViewOptions({
          options: {
            picture: data.results.map,
            inspection: data.results.mask,
          },
          width: data.results.width,
          height: data.results.height,
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!imgData)
  return <Center>There is no image of the board</Center>;

  return <Layout>
      <div style={{ backgroundColor: 'blue', width: '10px' }}/>
      <div style={{ backgroundColor: 'red' }}/>
    </Layout>;
}
PictureView.propTypes = {
  farmId: PropTypes.string.isRequired,
  zoneId: PropTypes.string.isRequired,
  imgData: PropTypes.any
}
PictureView.defaultProp = {
  imgData: undefined
}