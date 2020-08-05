import styled from 'styled-components';
import { withTheme } from '../../utils/theme';

export const Container = styled.div`
  padding: 5rem 2rem;
`;

export const PlotItem = styled.div`
  height: 5rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  margin: 2rem 4rem;
  background: url('http://placekitten.com/1200/200');

  width: calc(50% - 4rem);
  @media (max-width: 800px) {
    width: 80%;
  }
  @media (max-width: 400px) {
    width: 90%;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

export const PlotContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const ItemTitle = withTheme(styled.div`
  margin: 1rem;
  color: ${({ theme: { primary } }) => primary};
`);
