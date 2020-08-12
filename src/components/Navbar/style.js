import styled from 'styled-components';
import { withTheme } from '../../utils/theme';

export const Container = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ width }) => width ?? 100}px;
  background-color: ${({ theme }) => theme.primary};
`);

export const NavbarLayout = withTheme(styled.div`
  height: 100%;
  display: grid;
  grid-gap: 25px;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.primary};
`);

export const Logo = withTheme(styled.div`
  margin: 10px;
  background-color: ${({ theme }) => theme.accent};
  display: grid;
  place-items: center;
  border-radius: 1em;
`);

export const NavigationContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > a {
    text-decoration: none;
  }
`;

export const BaseNavButton = withTheme(styled.div`
  position: relative;
  width: 80%;
  margin: 10px 0;
  padding: 8px 0;
  color: ${({ theme }) => theme.light};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
  ${({ disable }) =>
    disable
      ? `
    cursor: default;
    opacity: 0.75;
  `
      : ''}
  ${({ active, theme }) =>
    active
      ? `
    cursor: default;
    border: solid 2px ${theme.light};
    border-radius: 2em;
    & > span {
      height: 3px;
      width: 100%;
      background-color: ${theme.light};
      position: absolute;
      top: 50%;
      right: 0%;
      transform: translate(100%, -50%);
    }
  `
      : ''}
`);

export const Location = withTheme(styled.div`
  color: ${({ theme }) => theme.light};
  margin: 10px;
  padding: 5px;
  border: solid 2px ${({ theme }) => theme.accent};
  border-radius: 0.5em;
  & > p {
    margin: 2px;
  }
`);
