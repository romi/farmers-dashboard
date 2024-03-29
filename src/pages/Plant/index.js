import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { BREAKPOINT, ROMI_API } from 'utils/constants';
import useBreakpoint from 'utils/hooks/breakpoint';

import Error from 'components/Error';
import Navbar from 'components/Navbar';
import Card from 'components/Card';
import { PictureView } from 'components/PictureView';
import PictureViewMobile from 'components/Mobile/pictureView';
import NotesProvider from 'utils/providers/notes';
import Stages from 'components/Stages';
import Loading from 'components/Loader';
import { TimelineContext } from 'utils/providers/timeline';
import { Container, Grid } from 'pages/Crop/style';
import { PlantContext } from 'utils/providers/plant';
import Growth from 'components/Growth';

const Plant = ({ match }) => {
  const [scan, setScan] = useState();
  const [error, setError] = useState('');
  const { plant } = useContext(PlantContext);
  const [plantGrowth, setPlantGrowth] = useState(undefined);
  const { picView } = useContext(TimelineContext);
  const breakpoint = useBreakpoint(BREAKPOINT);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${ROMI_API}/scans/${match.params.id}`);
        const { data: farmData } = await axios.get(`${ROMI_API}/farms/${data.farm}`);

        setScan({
          farmData,
          ...data,
        });
      } catch (err) {
        console.error(err);
        setError('An invalid ID was provided');
      }
    })();
  }, [match.params.id]);

  useEffect(() => {
    if (!plant || !plant?.plantId) return;
    (async () => {
      try {
        const response = (await axios.get(`${ROMI_API}/plants/${plant.plantId}`))?.data?.analyses[0]?.id;
        setPlantGrowth(response);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [plant]);

  useEffect(() => {
    if (!picView) return;
    (async () => {
      try {
        setScan({ farmData: scan?.farmData, ...(await axios.get(`${ROMI_API}/scans/${picView}`))?.data });
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line
  }, [picView]);

  if (error.length > 0) return <Error error={error} />;
  if (!scan) return <Loading />;

  return (
    <div className="Layout">
      <Navbar
        plant
        parentIds={{ farmId: scan.farm, zoneId: scan.observation_unit.id }}
        address={scan?.farmData?.address}
      />
      <Container>
        <Grid>
          <Card title="Picture View">
            {breakpoint === 'sm' ? (
              <PictureViewMobile
                imgData={scan.analyses.find(({ short_name }) => short_name === 'stitching')}
                plantData={scan.analyses.find(({ short_name }) => short_name === 'plant_analysis')}
              />
            ) : (
              <PictureView
                imgData={scan.analyses.find(({ short_name }) => short_name === 'stitching')}
                plantData={scan.analyses.find(({ short_name }) => short_name === 'plant_analysis')}
              />
            )}
          </Card>
          <Card title="Note" />
          <NotesProvider>
            <Card title="Stages">
              <Stages scan={scan} />
            </Card>
          </NotesProvider>
          {breakpoint !== 'sm' && <Card title="" />}
          <Card title="Growth" style={{ gridColumn: '1 / 3' }}>
            {plant?.plantId && plantGrowth ? <Growth apiID={plantGrowth} /> : <div>No plant selected</div>}
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

Plant.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Plant;
