/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Timeline from '../../components/Timeline';
import Card from '../../components/Card';
import { Container, Grid } from './style';
import { ROMI_API } from '../../utils/constants';

const Board = ({ match }) => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const farmsIds = (await axios.get(`${ROMI_API}/farms`)).data.map(({ id }) => id);
        const plots = await Promise.all(
          farmsIds.map(async farmId => {
            const { data } = await axios.get(`${ROMI_API}/farms/${farmId}`);

            return {
              farmId,
              zones: data.zones.map(({ id }) => id),
            };
          }),
        );
        const matching = plots.find(({ zones }) => zones.includes(match.params.id));
        const { data } = await axios.get(`${ROMI_API}/farms/${matching.farmId}/zones/${match.params.id}`);
        setScans(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [match.params.id]);

  return (
    <div className="Layout">
      <Container>
        {scans?.short_name}
        <Grid>
          <Card title="Picture View" style={{ gridRow: '1 / 5', gridColumn: '1 / 7' }} />
          <Card title="Note" style={{ gridRow: '1 / 5', gridColumn: '7' }} />
          <Card title="Timeline" style={{ gridRow: '5 / 8', gridColumn: '1 / 7' }}>
            <Timeline />
          </Card>
          <Card title="" style={{ gridRow: '5 / 8', gridColumn: '7' }} />
          <Card title="Analytics" style={{ gridRow: '8 / 12', gridColumn: '1 / 7' }} />
          <Card title="Report" style={{ gridRow: '8 / 12', gridColumn: '7' }} />
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
