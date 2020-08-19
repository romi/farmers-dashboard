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
      const { data } = await axios.get(`${ROMI_API}/farms/${match.params.id}`);

      setPlots(data);
    })();
  }, [match.params.id]);

  if (!plots.id) return <div>Loading...</div>;

  return (
    <Container>
      <PlotContainer>
        <Title title={plots.short_name || ''} />

        {plots.zones && plots.zones.length > 0 ? (
          plots.zones.map(({ id, short_name: shortName }) => (
            <PlotItem key={id} onClick={() => router.push(`/board/${id}`)}>
              <ItemTitle>{shortName}</ItemTitle>
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
