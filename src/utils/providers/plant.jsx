import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useRouter from 'utils/hooks/router';

export const PlantContext = createContext({
  plant: {
    line: {
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
    },
  },
  setPlant: () => {},
});

const PlantProvider = ({ children }) => {
  const router = useRouter();
  const [plant, setPlant] = useState({
    line: {
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
    },
  });

  useEffect(() => {
    if (router.pathname.includes('crop')) {
      setPlant({
        line: {
          x0: 0,
          y0: 0,
          x1: 0,
          y1: 0,
        },
      });
    }
  }, [router.pathname]);

  return <PlantContext.Provider value={{ plant, setPlant }}>{children}</PlantContext.Provider>;
};

PlantProvider.propTypes = {
  children: PropTypes.node,
};

PlantProvider.defaultProps = {
  children: <div />,
};

export default PlantProvider;
