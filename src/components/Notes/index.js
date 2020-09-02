import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Card from 'components/Card';
import Loading from 'components/Loader';
import { ROMI_API } from 'utils/constants';
import { theme } from 'utils/theme';
import { Author, Container, Footer, Text } from './style';

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const Notes = ({ ids }) => {
  const [notes, setNotes] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const datas = (await axios.all(ids.map(id => axios.get(`${ROMI_API}/notes/${id}`)))).map(({ data }) => data);
        setNotes(datas);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [ids]);

  if (!notes) return <Loading />;

  return (
    <Container>
      {notes.map(({ text, date, author: { short_name } }) => (
        <Card style={{ border: `solid 1px ${theme.accent}`, margin: '0 10px', marginBottom: '15px' }}>
          <div>
            <Text>{text}</Text>
            <Footer>
              <Author>{capitalize(short_name)}</Author>
              <span>{new Date(date).toISOString().split('T')[0].split('-').reverse().join('/')}</span>
            </Footer>
          </div>
        </Card>
      ))}
    </Container>
  );
};
Notes.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Notes;
