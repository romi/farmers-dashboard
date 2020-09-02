import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Error from 'components/Error';
import Title from 'components/Title';
import Navbar from 'components/Navbar';
import useRouter from 'utils/hooks/router';
import { ROMI_API } from 'utils/constants';
import Loading from 'components/Loader';
import { Container, PlotContainer, PlotItem, ItemTitle } from './style';

const Farm = ({ match }) => {
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
  if (!plots.id) return <Loading />;

  return (
    <div className="Layout">
      <Navbar farm />
      <Container>
        <PlotContainer>
          <Title title={plots.short_name || ''} />

          {plots.crops && plots.crops.length > 0 ? (
            plots.crops.map(({ id, short_name: shortName }) => (
              <PlotItem key={id} onClick={() => router.push(`/crops/${id}`)}>
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

Farm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Farm;
