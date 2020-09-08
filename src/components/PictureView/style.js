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
`;

export const Thumbnail = styled(Image)`
  border-radius: 1rem;
  width: 80px;
  height: 80px;
`;

export const ThumbnailInView = styled(Image)`
  z-index: 1;
  position: absolute;
  border-radius: 0.5rem;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
