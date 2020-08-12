import React from 'react';
import Break from 'react-break/src/react-break';
import { BREAKPOINT } from '../../utils/constants';

const Navbar = () => {
  return (
    <>
      <Break breakpoints={BREAKPOINT} query={{ method: 'is', breakpoint: 'small' }}>
        <div>small</div>
      </Break>
      <Break breakpoints={BREAKPOINT} query={{ method: 'is', breakpoint: 'medium' }}>
        <div>medium</div>
      </Break>
      <Break breakpoints={BREAKPOINT} query={{ method: 'is', breakpoint: 'large' }}>
        <div>large</div>
      </Break>
    </>
  );
};

export default Navbar;
