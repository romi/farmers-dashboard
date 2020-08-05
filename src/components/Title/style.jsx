import styled from 'styled-components';

import { withTheme } from '../../utils/theme';

export const Container = styled.div`
  margin-top: 1rem;
  margin-left: 4rem;
`;

export const Title = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  color: #656565;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const Underline = withTheme(styled.div`
  background-color: ${({ theme: { primary } }) => primary};
  height: 3px;
  width: 2rem;
`);
