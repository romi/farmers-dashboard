import styled from 'styled-components';
import { withTheme } from 'utils/theme';

export const Container = styled.div`
  flex-grow: 1;
  padding: 5rem 2rem;
`;

export const PlotItem = withTheme(styled.div`
  height: 15rem;
  width: calc(15rem * 1.77);
  border: 1px solid transparent;
  border-radius: 0.5rem;
  margin: 2rem;
  cursor: pointer;
  ${({ background }) =>
    background
      ? `
    background: url('${background}?size=large');
    background-repeat: no-repeat;
    background-size: cover;
  `
      : `background-color: #b5b6b6;`};

  ${({ breakpoint }) =>
    breakpoint === 'sm'
      ? `
        height: 5rem;
        width: calc(5rem * 1.77);
    `
      : ''}
`);

export const PlotContainer = styled.div`
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PlotWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ItemTitle = withTheme(styled.div`
  width: fit-content;
  height: fit-content;
  margin: 1rem;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  color: ${({ theme: { primary } }) => primary};
  background-color: #4a5369bb;
`);
