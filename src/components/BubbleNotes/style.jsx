import styled from 'styled-components';
import Bubble from 'components/Bubble';

export const BaseBubbleNote = styled(Bubble)`
  background-color: ${({ isActive }) => (isActive ? '#696969' : '#d3d3d3d3')};
  padding: 0 1rem;
`;

export const Placement = styled.div`
  display: flex;
  justify-content: end;
`;
