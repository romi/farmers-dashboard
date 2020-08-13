import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Flex } from './style';
import { ROMI_API } from '../../utils/constants';

const Farm = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${ROMI_API}/farms`);

      setFarms(
        await Promise.all(
          data.map(async ({ id }) => {
            const {
              data: { zones, name },
            } = await axios.get(`${ROMI_API}/farms/${id}`);

            return {
              name,
              farmId: id,
              zones,
            };
          }),
        ),
      );
    })();
  }, []);

  return (
    <Container className="Layout">
      <Flex>
        {farms.length > 0 ? (
          farms.map(({ name, farmId, zones }) => (
            <div key={farmId}>
              {name} [&ensp;
              {zones.map(({ id, short_name: shortName }) => (
                <a key={id} href={`/plot/${id}`}>
                  {shortName}
                </a>
              ))}
              &ensp;]
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
