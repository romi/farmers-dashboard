import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Flex, Title, Logo, Card, Description, PlotTitle } from './style';
import { ROMI_API } from '../../utils/constants';
import Bubble from '../../components/Bubble';
import useRouter from '../../utils/hooks/router';

const Farm = () => {
  const [farms, setFarms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${ROMI_API}/farms`);

      setFarms(
        await Promise.all(
          data.map(async ({ id }) => {
            const {
              data: { zones, name, description },
            } = await axios.get(`${ROMI_API}/farms/${id}`);

            return {
              name,
              description,
              farmId: id,
              zones,
            };
          }),
        ),
      );
    })();
  }, []);

  return (
    <>
      <Logo>
        <img alt="logo" src="/logo_romi.png" width="300rem" />
      </Logo>
      <Container className="Layout">
        <Flex>
          {farms.length > 0 ? (
            farms.map(({ name, description, farmId, zones }) => (
              <Card key={farmId}>
                <Title>{name}</Title>
                <Description>{description}</Description>
                <PlotTitle>Plots:&ensp;</PlotTitle>
                {zones.map(({ id, short_name: shortName }, index) => (
                  <span key={id}>
                    <Bubble
                      onClick={() => {
                        router.push(`/plot/${id}`);
                      }}
                    >
                      {shortName}
                    </Bubble>
                    {index !== zones.length - 1 && ','}
                  </span>
                ))}
              </Card>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default Farm;
