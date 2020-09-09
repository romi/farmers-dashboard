import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useRouter from 'utils/hooks/router';

const DEFAULT = {
  line: {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
  },
};

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

const getPlant = () => {
  try {
    return JSON.parse(localStorage.getItem('plant')) || DEFAULT;
  } catch (err) {
    return DEFAULT;
  }
};

const PlantProvider = ({ children }) => {
  const router = useRouter();
  const [plant, setPlant] = useState(getPlant());

  useEffect(() => {
    localStorage.setItem('plant', JSON.stringify(plant));
    if (router.pathname.includes('crop')) {
      setPlant(DEFAULT);
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
