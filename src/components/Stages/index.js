import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ROMI_API } from 'utils/constants';
import Button from 'components/Button';
import { StageContext } from 'utils/providers/stage';
import { Layout, SmoothImg, ButtonList, ImageList } from './style';

const Stages = ({ scan }) => {
  const { plantId } = useContext(StageContext);
  const [stages, setStages] = useState(undefined);
  const [select, setSelect] = useState('image');

  useEffect(() => {
    try {
      (async () => {
        const zone = (await axios.get(`${ROMI_API}/zones/${scan.zone}`)).data;
        const scansAnalyses = (await axios.all(zone.scans.map(({ id }) => axios.get(`${ROMI_API}/scans/${id}`))))
          .map(({ data }) => data)
          .filter(({ analyses }) => analyses.find(({ short_name }) => short_name === 'plant_analysis'))
          .map(({ date, analyses }) => ({
            date,
            id: analyses.find(({ short_name }) => short_name === 'plant_analysis').id,
          }));
        const analyses = (await axios.all(scansAnalyses.map(({ id }) => axios.get(`${ROMI_API}/analyses/${id}`))))
          .map(({ data }) => data)
          .map(({ results: { plants } }, i) => ({
            date: scansAnalyses[i].date,
            plant: plants.find(({ id }) => id === plantId),
          }));
        setStages(analyses);
      })();
    } catch (e) {
      console.error(e);
    }
  }, [scan.zone, plantId]);

  if (!stages) return <div>Loading...</div>;

  return (
    <Layout>
      <ButtonList>
        Lettuce #{plantId}
        <Button active={select === 'image'} onClick={() => setSelect('image')}>
          Picture
        </Button>
        <Button active={select === 'mask'} onClick={() => setSelect('mask')}>
          Inspection
        </Button>
      </ButtonList>
      <ImageList>
        {stages.map((e, i) => (
          <SmoothImg key={e.plant.image} first={i === 0}>
            {new Date(e.date).toISOString().split('T')[0].split('-').reverse().join('/')}
            <img height={100} width={100} alt="plant" src={`${ROMI_API}/images/${e.plant[select]}`} />
          </SmoothImg>
        ))}
      </ImageList>
    </Layout>
  );
};
Stages.propTypes = {
  scan: PropTypes.shape({
    zone: PropTypes.string,
  }).isRequired,
};

export default Stages;
