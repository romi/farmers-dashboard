import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Title from '../../components/Title';
import useRouter from '../../utils/hooks/router';
import { Container, PlotContainer, PlotItem, ItemTitle } from './style';
import { ROMI_API } from '../../utils/constants';

const Plot = ({ match }) => {
  const [plots, setPlots] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${ROMI_API}/farms`);
      const allFarms = await Promise.all(
        data.map(async ({ id }) => {
          const {
            data: { zones },
          } = await axios.get(`${ROMI_API}/farms/${id}`);
          return {
            id,
            zones,
          };
        }),
      );
      const { id: farmId } = allFarms.find(({ zones }) => zones.map(({ id: i }) => i).includes(match.params.id));
      const { data: result } = await axios.get(`${ROMI_API}/farms/${farmId}/zones/${match.params.id}`);
      setPlots(result);
    })();
  }, [match.params.id]);

  if (!plots.id) return <div>Loading...</div>;

  return (
    <Container>
      <PlotContainer>
        <Title title={plots.short_name || ''} />

        {plots.scans && plots.scans.length > 0 ? (
          plots.scans.map(({ id, date }) => (
            <PlotItem key={id} onClick={() => router.push(`/board/${id}`)}>
              <ItemTitle>{date}</ItemTitle>
            </PlotItem>
          ))
        ) : (
          <div>Empty</div>
        )}
      </PlotContainer>
    </Container>
  );
};

Plot.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Plot;
