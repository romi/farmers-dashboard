import styled from 'styled-components';
import { withTheme } from 'utils/theme';

export default withTheme(styled.button`
  cursor: pointer;
  border-radius: 1rem;
  border: 1px solid transparent;
  color: white;
  background-color: #d3d3d3d3;

  &:hover {
    background-color: #696969;
  }
  &:active {
    background-color: #2a2a2a;
  }
`);
