import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ROMI_API } from 'utils/constants';
import Button from 'components/Button';
import { PlantContext } from 'utils/providers/plant';
import Loading from 'components/Loader';
import { Layout, SmoothImg, ButtonList, ImageList } from './style';

const Stages = ({ scan }) => {
  const { plant } = useContext(PlantContext);
  const [stages, setStages] = useState(undefined);
  const [select, setSelect] = useState('image');

  useEffect(() => {
    if (plant?.id < 0) return;
    (async () => {
      try {
        const zone = (await axios.get(`${ROMI_API}/crop/${scan.zone}`)).data;
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
            plant: plants.find(({ id }) => id === plant?.id),
          }));
        setStages(analyses);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [scan.zone, plant?.id]);

  if (!stages) return <Loading />;

  return (
    <Layout>
      <ButtonList>
        Lettuce #{plant?.id}
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
