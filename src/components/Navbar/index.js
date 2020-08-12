import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BREAKPOINT } from '../../utils/constants';
import useBreakpoint from '../../utils/hooks/breakpoint';
import { Container, Location, Logo, NavbarLayout, BaseNavButton, NavigationContent } from './style';

const Navbar = ({ plot, board, plant }) => {
  const [open, setOpen] = useState(false);
  const breakpoint = useBreakpoint(BREAKPOINT);

  const getWidth = () => {
    if (breakpoint === 'sm') return 60;
    if (breakpoint === 'md') return 150;
    return 200;
  };

  const NavButton = ({ children, ...props }) => (
    <BaseNavButton {...props}>
      {children}
      <span />
    </BaseNavButton>
  );
  NavButton.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const BaseNavbar = () => (
    <NavbarLayout>
      <Logo>
        <img alt="logo" src="/logo_romi.png" width="100%" />
      </Logo>
      <NavigationContent>
        {board || plant ? (
          <Link to={`/plot/${'123456789'}`}>
            <NavButton>PLOT</NavButton>
          </Link>
        ) : (
          <NavButton active={plot}>PLOT</NavButton>
        )}
        {plant ? (
          <Link to={`/plot/${'123456789'}`}>
            <NavButton>BOARD</NavButton>
          </Link>
        ) : (
          <NavButton active={board} disable={plot}>
            BOARD
          </NavButton>
        )}
        <NavButton active={plant} disable={plot || board}>
          PLANT
        </NavButton>
      </NavigationContent>
      <Location>
        <p>6 Rue Amyot</p>
        <p>75005</p>
        <p>PARIS</p>
      </Location>
    </NavbarLayout>
  );

  return (
    <Container width={getWidth()}>
      {breakpoint === 'sm' ? (
        <>
          <div onClick={() => setOpen(true)}>X</div>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <BaseNavbar />
          </Drawer>
        </>
      ) : (
        <BaseNavbar />
      )}
    </Container>
  );
};
Navbar.propTypes = {
  plot: PropTypes.bool,
  board: PropTypes.bool,
  plant: PropTypes.bool,
};
Navbar.defaultProps = {
  plot: false,
  board: false,
  plant: false,
};

export default Navbar;
