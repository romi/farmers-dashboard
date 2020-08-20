import styled from 'styled-components';

export const Center = styled.div`
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
  position: absolute;
  transform-origin: top left;
  transform: rotate(270deg) translate(-100%, 0);
`;