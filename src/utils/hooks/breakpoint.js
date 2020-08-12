import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const getDeviceConfig = ({ sm = 0, md = 500, lg = 800 }, width) => {
  if (width > lg) return 'lg';
  if (width > md) return 'md';
  if (width > sm) return 'sm';
  return 'xs';
};

const useBreakpoint = (options = {}) => {
  const [breakpoint, setBreakpoint] = useState(() => getDeviceConfig(options, window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBreakpoint(getDeviceConfig(options, window.innerWidth));
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return breakpoint;
};

export default useBreakpoint;
