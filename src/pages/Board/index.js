/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Timeline from '../../components/Timeline';
import Notes from '../../components/Notes';
import Card from '../../components/Card';
import { BREAKPOINT, ROMI_API } from '../../utils/constants';
import Navbar from '../../components/Navbar';
import useBreakpoint from '../../utils/hooks/breakpoint';
import { Container, Grid } from './style';
import { PictureView } from '../../components/PictureView';
import NotesProvider from '../../utils/providers/notes';

const Board = ({ match }) => {
  const [onRequest, setOnRequest] = useState(true);
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
        setOnRequest(false);
      } catch (err) {
        setOnRequest(false);
        console.error(err);
      }
    })();
  }, [match.params.id]);

  if (onRequest) return <div>Loading...</div>;
  if (!board) return <div>Loading</div>;
  if (board.scans.length === 0) return <div>Empty</div>;

  return (
    <div className="Layout">
      <Navbar board />
      <Container>
        {board.short_name}
        <Grid>
          <Card title="Picture View">
            <PictureView
              farmId={board.farm}
              zoneId={board.id}
              imgData={pic.analyses.find(f => f.short_name === 'stitching')}
              plantData={pic.analyses.find(f => f.short_name === 'plant_analysis')}
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
