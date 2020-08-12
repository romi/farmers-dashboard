import styled from 'styled-components';

import { withTheme } from '../../utils/theme';

export const Container = styled.div`
  margin-left: 15px;
`;

export const Title = styled.p`
  user-select: none;
  text-transform: uppercase;
  font-weight: bold;
  color: #656565;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const Underline = withTheme(styled.div`
  background-color: ${({ theme: { primary } }) => primary};
  height: 4px;
  width: 3rem;
  border-radius: 0.5rem;
`);
