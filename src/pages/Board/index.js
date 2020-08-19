/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Timeline from '../../components/Timeline';
import Notes from '../../components/Notes';
import Card from '../../components/Card';
import { BREAKPOINT, ROMI_API } from '../../utils/constants';
import Navbar from '../../components/Navbar';
import useBreakpoint from '../../utils/hooks/breakpoint';
import { Container, Grid } from './style';
import NotesProvider from '../../utils/providers/notes';

const Board = ({ match }) => {
  const [scans, setScans] = useState([]);
  const breakpoint = useBreakpoint(BREAKPOINT);

  useEffect(() => {
    (async () => {
      try {
        const farmsIds = (await axios.get(`${ROMI_API}/farms`)).data.map(({ id }) => id);
        const plots = await Promise.all(
          farmsIds.map(async farmId => {
            const {
              data: { zones },
            } = await axios.get(`${ROMI_API}/farms/${farmId}`);

            return {
              farmId,
              zones: await Promise.all(
                zones.map(async ({ id }) => {
                  const {
                    data: { scans: sc },
                  } = await axios.get(`${ROMI_API}/farms/${farmId}/zones/${id}`);

                  return {
                    zoneId: id,
                    scans: sc.map(({ id: i }) => i),
                  };
                }),
              ),
            };
          }),
        );

        const ids = {
          farmId: '',
          zoneId: '',
        };
        plots.forEach(({ farmId, zones }) =>
          zones.forEach(({ zoneId, scans: sc }) => {
            if (sc.length > 0 && sc.includes(match.params.id)) {
              ids.farmId = farmId;
              ids.zoneId = zoneId;
            }
          }),
        );
        const { data } = await axios.get(
          `${ROMI_API}/farms/${ids.farmId}/zones/${ids.zoneId}/scans/${match.params.id}`,
        );
        setScans(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [match.params.id]);

  return (
    <div className="Layout">
      <Navbar board />
      <Container>
        {scans?.short_name}
        <Grid>
          <Card title="Picture View" />
          <Card title="Note" />
          <NotesProvider>
            <Card title="Timeline">
              <Notes />
              <Timeline />
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
Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Board;
