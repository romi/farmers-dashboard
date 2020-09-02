import styled from 'styled-components';
import { withTheme } from 'utils/theme';

export const Container = withTheme(styled.div`
  ${({ breakpoint }) =>
    breakpoint !== 'sm'
      ? `
    height: 250px;
    overflow-y: auto;
  `
      : ''};
  display: flex;
  flex-direction: column;
  align-items: stretch;
`);

export const Text = styled.p`
  margin-top: 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Author = styled.span`
  &:before {
    content: '-';
  }
`;
