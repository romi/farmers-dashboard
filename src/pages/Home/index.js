import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ROMI_API } from 'utils/constants';
import useRouter from 'utils/hooks/router';
import Loading from 'components/Loader';
import { Container, Flex, Title, Logo, Card, Description } from './style';

const Home = () => {
  const [farms, setFarms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${ROMI_API}/farms`);

      setFarms(
        await Promise.all(
          data.map(async ({ id }) => {
            const {
              data: { name, description },
            } = await axios.get(`${ROMI_API}/farms/${id}`);

            return {
              name,
              description,
              farmId: id,
            };
          }),
        ),
      );
    })();
  }, []);

  return (
    <>
      <Logo id="homepage-logo">
        <img alt="logo" src="/logo_romi.png" width="300rem" />
      </Logo>
      <Container className="Layout">
        <Flex>
          {farms.length > 0 ? (
            farms.map(({ name, description, farmId }) => (
              <Card
                key={farmId}
                onClick={() => {
                  router.push(`/farm/${farmId}`);
                }}
              >
                <Title>{name}</Title>
                <Description>{description}</Description>
              </Card>
            ))
          ) : (
            <Loading />
          )}
        </Flex>
      </Container>
    </>
  );
};

export default Home;
