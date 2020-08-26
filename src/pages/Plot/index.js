import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Error from '../../components/Error';
import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import useRouter from '../../utils/hooks/router';
import { Container, PlotContainer, PlotItem, ItemTitle } from './style';
import { ROMI_API } from '../../utils/constants';

const Plot = ({ match }) => {
  const [plots, setPlots] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${ROMI_API}/farms/${match.params.id}`);

        setPlots(data);
      } catch (err) {
        console.error(err);
        setError('An invalid ID was provided');
      }
    })();
  }, [match.params.id]);

  if (error.length > 0) return <Error error={error} />;
  if (!plots.id) return <div>Loading...</div>;

  return (
    <div className="Layout">
      <Navbar plot />
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
    </div>
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
