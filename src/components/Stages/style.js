import styled from 'styled-components';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 2rem;
`;

export const SmoothImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: ${({ first }) => (first ? '0' : '15px')};
  & > img {
    border-radius: 10%;
    min-width: 100px;
    max-width: 100px;
    min-height: 100px;
    max-height: 100px;
  }
`;

export const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const ImageList = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  padding-bottom: 5px;
`;
