import styled from 'styled-components';
import { withTheme } from 'utils/theme';

export const Centered = styled.div`
  display: grid;
  place-items: center;
`;

export const SquareCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: row;
`;

export const SquareCard = withTheme(styled.div`
  border: solid 1px ${({ theme }) => theme.accent};
  border-radius: 0.5rem;
  width: 20%;
  padding: 0.4rem 0.2rem;
  margin: 0.1rem;
`);

export const MonthSpan = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 1rem;
`;
