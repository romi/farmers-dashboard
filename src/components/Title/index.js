import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import { Container, Title, TitleContainer, Underline } from './style';
import Info from '../Info';

const TitleComponent = ({ title, tooltip }) => (
  <Container>
    <TitleContainer>
      <Title>{title}</Title>
      {tooltip !== '' && (
        <>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a data-tip data-for={`${title}-${tooltip}`}>
            <Info size={17} />
          </a>
          <ReactTooltip id={`${title}-${tooltip}`} place="right" type="dark" effect="solid">
            <span>{tooltip}</span>
          </ReactTooltip>
        </>
      )}
    </TitleContainer>
    <Underline />
  </Container>
);

TitleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
};
TitleComponent.defaultProps = {
  tooltip: '',
};

export default TitleComponent;
