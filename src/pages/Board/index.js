import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from './style';
import Card from '../../components/Card';

// eslint-disable-next-line no-unused-vars
const Board = ({ match }) => {
  return (
    <div className="Layout">
      <Container>
        <Grid>
          <Card title="Picture View" style={{ gridRow: '1 / 5', gridColumn: '1 / 7' }} />
          <Card title="Note" style={{ gridRow: '1 / 5', gridColumn: '7' }} />
          <Card title="Timeline" style={{ gridRow: '5 / 8', gridColumn: '1 / 7' }} />
          <Card title="" style={{ gridRow: '5 / 8', gridColumn: '7' }} />
          <Card title="Analytics" style={{ gridRow: '8 / 12', gridColumn: '1 / 7' }} />
          <Card title="Report" style={{ gridRow: '8 / 12', gridColumn: '7' }} />
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
