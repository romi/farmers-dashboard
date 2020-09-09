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
        const crop = (await axios.get(`${ROMI_API}/crops/${scan?.observation_unit?.id}`)).data;
        const scans = crop.scans.sort(({ date: dateA }, { date: dateB }) => new Date(dateA) - new Date(dateB));
        const allAnalyses = scans.map(({ id }) =>
          crop?.analyses?.find(
            ({ scan: scanId, short_name, state }) =>
              scanId === id && short_name === 'plant_analysis' && state === 'Finished',
          ),
        );
        const plantAnalysis = (
          await axios.all(allAnalyses.map(({ id }) => axios.get(`${ROMI_API}/analyses/${id}`)))
        ).map(({ data: { results: { plants } } }, index) => ({ date: scans[index]?.date, plants }));
        const plantEvolution = plantAnalysis[0].plants.map(({ id }) => ({
          id,
          evolution: plantAnalysis.map(({ date, plants }) => {
            const { image, mask } = plants.find(({ id: plantId }) => plantId === id);
            return {
              date,
              image,
              mask,
            };
          }),
        }));
        console.log('plantEvolution', plantEvolution);
        setStages(plantEvolution);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [scan, plant?.id]);
  console.log('plant', plant);

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
{/*
        {stages.map((e, i) => (
          <SmoothImg key={e.plant.image} first={i === 0}>
            {new Date(e.date).toISOString().split('T')[0].split('-').reverse().join('/')}
            <img height={100} width={100} alt="plant" src={`${ROMI_API}/images/${e.plant[select]}`} />
          </SmoothImg>
        ))}
*/}
      </ImageList>
    </Layout>
  );
};
Stages.propTypes = {
  scan: PropTypes.shape({
    observation_unit: PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
};

export default Stages;
