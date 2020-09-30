import styled from 'styled-components';
import { withTheme } from 'utils/theme';

export default withTheme(styled.button`
  border-radius: 1rem;
  border: 2px solid ${({ theme, active }) => (active ? theme.primary : 'transparent')};
  padding: 3px 15px;
  color: white;
  outline: none;
  ${({ theme, active }) =>
    active
      ? `
    background-color: ${theme.darkGrey};
  `
      : `
    background-color: ${theme.lightGrey};
    &:hover {
      background-color: ${theme.darkGrey};
    }
  `}
`);
