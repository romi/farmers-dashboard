import styled from 'styled-components';
import { withTheme } from '../../utils/theme';

export const Container = styled.div`
  flex-grow: 1;
  padding: 2rem 1rem;
  background-color: #e6e6e6;
`;

export const Grid = withTheme(styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 2fr 1fr 2fr;
  grid-template-columns: 5fr 2fr;
  overflow-y: scroll;
  grid-gap: 10px;
  ${({ breakpoint }) =>
    breakpoint === 'sm'
      ? `
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    & > div {
      min-height: 250px;
      margin: 10px;
    }
  `
      : ''}
`);
