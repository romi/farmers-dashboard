import styled from 'styled-components';

export const Container = styled.div`
  height: 90%;
  width: 100%;
  min-height: 250px;
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  position: relative;
  & > canvas {
    position: fixed;
    left: 0;
    top: 0;
    width: 25px;
    height: 250px;
  }
`;

export const CanvasArea = styled.div`
  height: 250px;
  width: ${({ pointNb }) => pointNb * 16}px;
  min-width: 100%;
`;

