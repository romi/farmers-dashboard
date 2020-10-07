import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Error from 'components/Error';
import Timeline from 'components/Timeline';
import TimelineMobile from 'components/Mobile/timeline';
// import BubbleNotes from 'components/BubbleNotes';
import Card from 'components/Card';
import Navbar from 'components/Navbar';
import useBreakpoint from 'utils/hooks/breakpoint';
import NotesProvider from 'utils/providers/notes';
import Loading from 'components/Loader';
import { PictureView } from 'components/PictureView';
import PictureViewMobile from 'components/Mobile/pictureView';
import Analytics from 'components/Analytics';
import Notes from 'components/Notes';
import { TimelineContext } from 'utils/providers/timeline';
import { BREAKPOINT, ROMI_API } from 'utils/constants';
import { Container, Grid } from './style';

const Crop = ({ match }) => {
  const [onRequest, setOnRequest] = useState(true);
  const [error, setError] = useState('');
  const [board, setBoard] = useState(null);
  const [pic, setPic] = useState(null);
  const { picView } = useContext(TimelineContext);

  const breakpoint = useBreakpoint(BREAKPOINT);

  useEffect(() => {
    (async () => {
      try {
        const { data: boardData } = await axios.get(`${ROMI_API}/crops/${match.params.id}`);
        const { data: farmData } = await axios.get(`${ROMI_API}/farms/${boardData.farm}`);
        const id = !picView ? boardData.scans[boardData.scans.length - 1]?.id : picView;

        boardData.scans.sort(({ date: a }, { date: b }) => new Date(a) - new Date(b));
        setBoard({
          farmData,
          ...boardData,
        });
        setPic((await axios.get(`${ROMI_API}/scans/${id}`))?.data);
      } catch (err) {
        console.error(err);
        setError('An invalid ID was provided');
      }
      setOnRequest(false);
    })();
    // eslint-disable-next-line
  }, [match.params.id]);

  useEffect(() => {
    if (!picView) return;
    (async () => {
      try {
        setPic((await axios.get(`${ROMI_API}/scans/${picView}`))?.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [picView]);

  if (error.length > 0) return <Error error={error} />;
  if (!board || onRequest) return <Loading />;
  if (board.scans.length === 0) return <div>Empty</div>;

  return (
    <div className="Layout">
      <Navbar zone parentIds={{ farmId: board.farm }} address={board?.farmData?.address} />
      <Container>
        <Grid>
          <Card title="Picture View">
            {breakpoint === 'sm' ? (
              <PictureViewMobile
                imgData={pic.analyses.find(({ short_name }) => short_name === 'stitching')}
                plantData={pic.analyses.find(({ short_name }) => short_name === 'plant_analysis')}
                scanId={pic?.id}
              />
            ) : (
              <PictureView
                imgData={pic.analyses.find(({ short_name }) => short_name === 'stitching')}
                plantData={pic.analyses.find(({ short_name }) => short_name === 'plant_analysis')}
                scanId={pic?.id}
              />
            )}
          </Card>
          <Card title="Note">
            <Notes ids={board.notes.map(({ id }) => id)} />
          </Card>
          <NotesProvider>
            <Card title="Timeline">
              {breakpoint === 'sm' ? (
                <TimelineMobile scans={board.scans} />
              ) : (
                <>
                  {/* <BubbleNotes /> */}
                  <Timeline scans={board.scans} />
                </>
              )}
            </Card>
          </NotesProvider>
          {breakpoint !== 'sm' && <Card title="" />}
          <Card title="Analytics" style={{ gridColumn: '1 / 3' }}>
            <Analytics
              range={1}
              config={[
                {
                  label: 'Temperature (°C)',
                  id: 'temp',
                  apiId: board.datastreams?.find(f => f.observable.toLowerCase().includes('air temperature'))?.id,
                  color: '#C7B95B',
                },
                {
                  label: 'Soil humidity (%)',
                  id: 'soil',
                  apiId: board.datastreams?.find(f => f.observable.toLowerCase().includes('soil humidity'))?.id,
                  color: '#23AFF9',
                },
                {
                  label: 'Sunlight (umole/m²/s)',
                  id: 'sun',
                  apiId: board.datastreams?.find(f => f.observable.toLowerCase().includes('sunlight'))?.id,
                  color: '#01AA55',
                },
              ]}
            />
          </Card>
        </Grid>
      </Container>
    </div>
  );
};

Crop.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Crop;
