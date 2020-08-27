/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { BREAKPOINT, ROMI_API } from 'utils/constants';
import useBreakpoint from 'utils/hooks/breakpoint';

import Error from 'components/Error';
import Navbar from 'components/Navbar';
import Card from 'components/Card';
import { PictureView } from 'components/PictureView';
import NotesProvider from 'utils/providers/notes';
import { Container, Grid } from '../Zone/style';
import Stages from '../../components/Stages';

const Plant = ({ match }) => {
  const [scan, setScan] = useState();
  const [error, setError] = useState('');
  const breakpoint = useBreakpoint(BREAKPOINT);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${ROMI_API}/scans/${match.params.id}`);

        setScan(data);
      } catch (err) {
        console.error(err);
        setError('An invalid ID was provided');
      }
    })();
  }, [match.params.id]);

  if (error.length > 0) return <Error error={error} />;
  if (!scan) return <div>Loading...</div>;

  return (
    <div className="Layout">
      <Navbar plant parentIds={{ farmId: scan.farm, zoneId: scan.zone }} />
      <Container>
        <Grid>
          <Card title="Picture View">
            <PictureView
              imgData={scan.analyses.find(({ short_name }) => short_name === 'stitching')}
              plantData={scan.analyses.find(({ short_name }) => short_name === 'plant_analysis')}
            />
          </Card>
          <Card title="Note" />
          <NotesProvider>
            <Card title="Stages">
              <Stages scan={scan} plantId="0" />
            </Card>
          </NotesProvider>
          {breakpoint !== 'sm' && <Card title="" />}
          <Card title="Analytics" />
          <Card title="Report" />
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
