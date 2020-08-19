import styled from 'styled-components';
import { withTheme } from '../../utils/theme';

export const Center = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
`;

export const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
`;