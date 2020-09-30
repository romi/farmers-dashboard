import styled from 'styled-components';
import { withTheme } from 'utils/theme';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

export const Card = withTheme(styled.div`
  padding: 5rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 1rem;
  background-color: white;
`);

export const Alert = withTheme(styled.h1`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.secondary};
`);

export const Text = withTheme(styled.p`
  font-weight: bold;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.darkGrey};
`);
