import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Error from 'components/Error';
import Timeline from 'components/Timeline';
import Notes from 'components/Notes';
import Card from 'components/Card';
import { BREAKPOINT, ROMI_API } from 'utils/constants';
import Navbar from 'components/Navbar';
import useBreakpoint from 'utils/hooks/breakpoint';
import { PictureView } from 'components/PictureView';
import NotesProvider from 'utils/providers/notes';
import { LineChart } from 'components/LineChart';
import Loading from 'components/Loader';
import { Container, Grid } from './style';

const Zone = ({ match }) => {
  const [onRequest, setOnRequest] = useState(true);
  const [error, setError] = useState('');
  const [board, setBoard] = useState(null);
  const [pic, setPic] = useState(null);

  const breakpoint = useBreakpoint(BREAKPOINT);

  useEffect(() => {
    (async () => {
      try {
        const { data: boardData } = await axios.get(`${ROMI_API}/zones/${match.params.id}`);
        const { data: lastScanData } = await axios.get(
          `${ROMI_API}/scans/${boardData.scans[boardData.scans.length - 1]?.id}`,
        );

        setBoard(boardData);
        setPic(lastScanData);
      } catch (err) {
        console.error(err);
        setError('An invalid ID was provided');
      }
      setOnRequest(false);
    })();
  }, [match.params.id]);

  if (error.length > 0) return <Error error={error} />;
  if (!board || onRequest) return <Loading />;
  if (board.scans.length === 0) return <div>Empty</div>;

  return (
    <div className="Layout">
      <Navbar zone parentIds={{ farmId: board.farm }} />
      <Container>
        {board.short_name}
        <Grid>
          <Card title="Picture View">
            <PictureView
              imgData={pic.analyses.find(({ short_name }) => short_name === 'stitching')}
              plantData={pic.analyses.find(({ short_name }) => short_name === 'plant_analysis')}
            />
          </Card>
          <Card title="Note" />
          <NotesProvider>
            <Card title="Timeline">
              <Notes />
              <Timeline scans={board.scans} />
            </Card>
          </NotesProvider>
          {breakpoint !== 'sm' && <Card title="" />}
          <Card title="Analytics">
            <LineChart
              range={1}
              config={[
                {
                  label: 'Temperature (°C)',
                  id: 'temp',
                  apiId: board.datastreams?.find(f => f.observable === 'air temperature')?.id,
                  color: '#C7B95B',
                },
                {
                  label: 'Soil humidity (%)',
                  id: 'soil',
                  apiId: board.datastreams?.find(f => f.observable === 'soil humidity')?.id,
                  color: '#23AFF9',
                },
                {
                  label: 'Sunlight (umole/m²/s)',
                  id: 'sun',
                  apiId: board.datastreams?.find(f => f.observable === 'sunlight (photosynthetically active radiation)')
                    ?.id,
                  color: '#01AA55',
                },
              ]}
            />
          </Card>
          <Card title="Report" />
        </Grid>
      </Container>
    </div>
  );
};

Zone.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Zone;
