import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BREAKPOINT } from 'utils/constants';
import useBreakpoint from 'utils/hooks/breakpoint';
import { Container, Location, Logo, NavbarLayout, BaseNavButton, NavigationContent } from './style';

const Navbar = ({ farm, zone, plant, parentIds, address }) => {
  const [open, setOpen] = useState(false);
  const breakpoint = useBreakpoint(BREAKPOINT);
  // eslint-disable-next-line no-nested-ternary
  const navTagId = `navbar${farm ? '-farm' : zone ? '-crop' : plant ? '-plant' : ''}`;

  const getWidth = () => {
    if (breakpoint === 'sm') return 50;
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
      <Link to="/" id="nav-to-home">
        <Logo>
          <img alt="logo" src="/logo_romi.png" width="100%" />
        </Logo>
      </Link>
      <NavigationContent>
        {zone || plant ? (
          <Link to={parentIds.farmId ? `/farm/${parentIds.farmId}` : '/404'} id="nav-to-farm">
            <NavButton>FARM</NavButton>
          </Link>
        ) : (
          <NavButton active={farm} disable={!farm}>
            FARM
          </NavButton>
        )}
        {plant ? (
          <Link to={parentIds.zoneId ? `/crop/${parentIds.zoneId}` : '/404'} id="nav-to-crop">
            <NavButton>CROP</NavButton>
          </Link>
        ) : (
          <NavButton active={zone} disable={!zone}>
            CROP
          </NavButton>
        )}
        <NavButton active={plant} disable={!plant}>
          PLANT
        </NavButton>
      </NavigationContent>
      <Location>
        {address.split(',').map(e => (
          <p>{e.trim()}</p>
        ))}
      </Location>
    </NavbarLayout>
  );

  return (
    <Container width={getWidth()} id={navTagId}>
      {breakpoint === 'sm' ? (
        <>
          <MenuIcon style={{ marginTop: '10px' }} fontSize="large" onClick={() => setOpen(true)} />
          <SwipeableDrawer open={open} onClose={() => setOpen(false)} onOpen={() => {}}>
            <BaseNavbar />
          </SwipeableDrawer>
        </>
      ) : (
        <BaseNavbar />
      )}
    </Container>
  );
};

Navbar.propTypes = {
  farm: PropTypes.bool,
  zone: PropTypes.bool,
  plant: PropTypes.bool,
  parentIds: PropTypes.shape({ farmId: PropTypes.string, zoneId: PropTypes.string }),
  address: PropTypes.string,
};
Navbar.defaultProps = {
  farm: false,
  zone: false,
  plant: false,
  parentIds: {
    farmId: null,
    zoneId: null,
  },
  address: '6 Rue Amyot, 75005, PARIS',
};

export default Navbar;
