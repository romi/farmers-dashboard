import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Title from '../../components/Title';
import useRouter from '../../utils/hooks/router';
import { Container, PlotContainer, PlotItem, ItemTitle } from './style';
import { ROMI_API } from '../../utils/constants';

const Plot = ({ match }) => {
  const [farm, setFarm] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${ROMI_API}/farms/${match.params.id}`);
      setFarm(data);
    })();
  }, [match.params.id]);

  return (
    <Container>
      <PlotContainer>
        <Title title={farm.name || ''} />
        {farm.zones && farm.zones.length > 0 ? (
          farm.zones.map(({ id, short_name: shortName }) => (
            <PlotItem key={id} onClick={() => router.push(`/board/${id}`)}>
              <ItemTitle>{shortName}</ItemTitle>
            </PlotItem>
          ))
        ) : (
          <div>Loading...</div>
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
