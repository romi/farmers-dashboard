/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container, Grid } from './style';
import Card from '../../components/Card';
import { BREAKPOINT, ROMI_API } from '../../utils/constants';
import Navbar from '../../components/Navbar';
import useBreakpoint from '../../utils/hooks/breakpoint';

const Board = ({ match }) => {
  const [scans, setScans] = useState([]);
  const breakpoint = useBreakpoint(BREAKPOINT);

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
      <Navbar board />
      <Container>
        {scans?.short_name}
        <Grid>
          <Card title="Picture View" />
          <Card title="Note" />
          <Card title="Timeline" />
          {breakpoint !== 'sm' ? <Card title="" /> : null}
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
