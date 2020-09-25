import styled from 'styled-components';
import { withTheme } from 'utils/theme';

export const Centered = styled.div`
  display: grid;
  place-items: center;
`;

export const SquareCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: row;
`;

export const SquareCard = withTheme(styled.div`
  ${({ theme, selected }) =>
    selected
      ? `
        background-color: ${theme.primary};
        color: white;
        font-weight: bold;
        border: 1px solid transparent;
      `
      : `
        border: 1px solid ${theme.accent};
      `}

  border-radius: 0.5rem;
  width: 20%;
  padding: 0.4rem 0.2rem;
  margin: 0.1rem;
`);

export const MonthSpan = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 1rem;
`;

export const PVContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PVCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 0;
  border-top: 1px solid black;
`;

export const PVThumbnailContainer = styled.div`
  display: flex;
  width: 4rem;
  height: 4rem;
  margin-right: 0.5rem;
`;

export const PVThumbnail = styled.img`
  border-radius: 1rem;
`;

export const PVDataContainer = styled.div`
  display: flex;
`;

export const PVData = styled.div`
  margin-right: 0.4rem;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const PVButtonList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
