import styled from 'styled-components';
import { withTheme } from 'utils/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 2rem;
  height: 100%;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Title = withTheme(styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
`);

export const Description = withTheme(styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.dark};
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`);

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = withTheme(styled.div`
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 1rem;
  margin: 2rem;
  padding: 1rem;
  cursor: pointer;
`);

export const PlotTitle = withTheme(styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`);
