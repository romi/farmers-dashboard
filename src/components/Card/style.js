import styled from 'styled-components';
import { withTheme } from 'utils/theme';

const Container = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: white;
  border-radius: 0.5rem;
  ${({ breakpoint }) =>
    breakpoint === 'sm'
      ? `
    margin: 10px;
  `
      : ''}

  ${({ border, theme }) =>
    border &&
    `
    border: solid 1px ${theme.accent}; 
    margin: 0 10px;
    margin-bottom: 15px; 
  `}
`);

export const Content = styled.div`
  margin: 15px;
  flex-grow: 1;
`;

export default Container;
