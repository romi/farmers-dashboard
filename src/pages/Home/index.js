import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ROMI_API } from 'utils/constants';
import useRouter from 'utils/hooks/router';
import Loading from 'components/Loader';
import { Container, Flex, Title, Logo, Card, Description, CardContent, ImageContainer, Image } from './style';

const Home = () => {
  const [farms, setFarms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${ROMI_API}/farms`);

        setFarms(
          await Promise.all(
            data.map(async ({ id }) => {
              const {
                data: { name, description, photo },
              } = await axios.get(`${ROMI_API}/farms/${id}`);

              return {
                name,
                photo,
                description,
                farmId: id,
              };
            }),
          ),
        );
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      <Logo id="homepage-logo">
        <img alt="logo" src={`${process.env.PUBLIC_URL}/colored_logo_romi.png`} width="300rem" />
      </Logo>
      <Container className="Layout">
        <Flex>
          {farms.length > 0 ? (
            farms.map(({ name, description, photo, farmId }) => (
              <Card
                key={farmId}
                onClick={() => {
                  router.push(`/farm/${farmId}`);
                }}
              >
                <Title>{name}</Title>
                <CardContent>
                  <ImageContainer>
                    <Image alt={`${name}-pic`} src={`${ROMI_API}/images/${photo}`} />
                  </ImageContainer>
                  <Description>{description}</Description>
                </CardContent>
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
