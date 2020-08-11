import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Flex } from './style';
import { ROMI_API } from '../../utils/constants';

const Farm = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${ROMI_API}/farms`);
      setFarms(data);
    })();
  }, []);

  return (
    <Container className="Layout">
      <Flex>
        {farms.length > 0 ? (
          farms.map(({ id, name, short_name: shortName }) => (
            <div key={id}>
              {name} :&ensp;<a href={`/plot/${id}`}>{shortName}</a>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Flex>
    </Container>
  );
};

export default Farm;
