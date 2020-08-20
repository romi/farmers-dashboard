/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { BREAKPOINT, ROMI_API } from '../../utils/constants';
import useBreakpoint from '../../utils/hooks/breakpoint';

import { Container, Grid } from '../Board/style';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Notes from '../../components/Notes';
import { PictureView } from '../../components/PictureView';
import NotesProvider from '../../utils/providers/notes';

const Plant = ({ match }) => {
  const [scan, setScan] = useState();
  const breakpoint = useBreakpoint(BREAKPOINT);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${ROMI_API}/scans/${match.params.id}`);
        setScan(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [match.params.id]);

  if (!scan) return <div>Loading...</div>;

  return (
    <div className="Layout">
      <Navbar plant />
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
              <Notes />
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
