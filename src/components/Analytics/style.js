import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Extend = styled.div`
  flex-grow: 1;
`;

export const Select = styled.select`
  height: 30px;
  width: 100px;
  background-color: white;
  border: 1px solid green;
  &:focus {
    border: 0 !important;
  }
`;
