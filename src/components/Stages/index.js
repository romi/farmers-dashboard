import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ROMI_API } from 'utils/constants';
import Button from 'components/Button';
import { PlantContext } from 'utils/providers/plant';
import Loading from 'components/Loader';
import { TimelineContext } from 'utils/providers/timeline';
import { Layout, SmoothImg, ButtonList, ImageList } from './style';

const Stages = ({ scan }) => {
  const { plant, setPlant } = useContext(PlantContext);
  const [stages, setStages] = useState(undefined);
  const [scanList, setScanList] = useState(undefined);
  const [select, setSelect] = useState('image');
  const { picView, setPicView } = useContext(TimelineContext);

  useEffect(() => {
    if (plant?.id < 0) return;
    (async () => {
      try {
        const crop = (await axios.get(`${ROMI_API}/crops/${scan?.observation_unit?.id}`)).data;
        const scans = crop.scans.sort(({ date: dateA }, { date: dateB }) => new Date(dateA) - new Date(dateB));
        setScanList(scans);
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
        setStages(plantEvolution);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [scan, plant?.id]);

  if (!stages) return <Loading />;

  if (!plant.id) return <div>Plant not selected</div>;

  if (!stages.find(({ id }) => id === plant.id)) return <div>Something went wrong</div>;

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
        {stages
          .find(({ id }) => id === plant.id)
          ?.evolution.map((e, idx) => (
            <SmoothImg
              key={e.image}
              first={idx === 0}
              onClick={() => {
                const { id: scanId } = scanList.find(({ date }) => date === e.date);
                if (scanId === picView) return;
                setPicView(scanId);
                setPlant({
                  ...plant,
                  image: e.image,
                });
              }}
            >
              {new Date(e.date).toISOString().split('T')[0].split('-').reverse().join('/')}
              <img height={100} width={100} alt="plant" src={`${ROMI_API}/images/${e[select]}`} />
            </SmoothImg>
          ))}
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
