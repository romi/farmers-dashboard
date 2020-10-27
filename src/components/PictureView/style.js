import styled from 'styled-components';

export const Center = styled.div`
  flex-grow: 1;
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

export const ButtonList = styled.div`
  width: 150px;
  padding: 20% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const ImgContainer = styled.div`
  display: flex;
  max-height: 300px;
  overflow: scroll;
  position: relative;
`;

export const Image = styled.img`
  position: relative;
  height: 250px;
  width: 1000px;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const Thumbnail = styled(Image)`
  border-radius: 1rem;
  width: 80px;
  height: 80px;
  display: ${({ show }) => (show ? 'unset' : 'hidden')};
`;

export const ThumbnailTooltip = styled(Image)`
  border-radius: 1rem;
  width: 160px;
  height: 160px;
  display: ${({ show }) => (show ? 'unset' : 'hidden')};
`;

export const ThumbnailInView = styled(Image)`
  z-index: ${({ debug }) => (debug ? '10' : '1')};
  position: absolute;
  border-radius: 0.5rem;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 2px solid #fff;
`;

export const ThumbnailInViewDiv = styled.div`
  border: 2px solid #fff;
  border-style: dashed;
  z-index: ${({ debug }) => (debug ? '10' : '1')};
  position: absolute;
  border-radius: 0.5rem;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const DebugInputs = styled.div`
  z-index: ${({ debug }) => (debug ? '10' : '1')};
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  color: white;
`;
