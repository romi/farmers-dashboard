/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Timeline from '../../components/Timeline';
import Card from '../../components/Card';
import { BREAKPOINT, ROMI_API } from '../../utils/constants';
import Navbar from '../../components/Navbar';
import useBreakpoint from '../../utils/hooks/breakpoint';
import { Container, Grid } from './style';
import { PictureView } from '../../components/PictureView';

const Board = ({ match }) => {
  const [scans, setScans] = useState([]);
  const [onRequest, setOnRequest] = useState(true);
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
        setOnRequest(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [match.params.id]);

  if (onRequest) return <div>Loading...</div>

  return (
    <div className="Layout">
      <Navbar board />
      <Container>
        {scans?.short_name}
        <Grid>
          <Card title="Picture View">
            <PictureView
              farmId={scans.farm}
              zoneId={scans.zone}
              imgData={scans.analyses?.find(f => f.short_name === "stitching")}
              plantData={scans.analyses?.find(f => f.short_name === "plant_analysis")}
            />
          </Card>
          <Card title="Note" />
          <Card title="Timeline">
            <Timeline />
          </Card>
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
