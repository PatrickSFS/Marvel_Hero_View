import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import {Container, Form, Input, Button, List, ListItem, CharacterThumbnail, SearchIcon, Main} from './Home.styled'
import Footer from '../Footer';

const publicKey = 'd723882c93ea079496dfb631b7ebda81';
const privateKey = '6ab6d502842f519c3cd7dc9212f7c1042c4ffce1';
const time = Number(new Date());
const hash = md5(time + privateKey + publicKey);


const Home = () => {
  
  const [characterName, setCharacterName] = useState('');
  const [characters, setCharacters] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${characterName}&ts=${time}&apikey=${publicKey}&hash=${hash}`);

      setCharacters(response.data.data.results); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <Main>
    <Form onSubmit={handleSubmit}>
      <p>Marvel Hero</p>
      <Input
        type="text"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
        placeholder="Pesquisar por nome"
      />
      <Button type ='submit'>
        <SearchIcon />
      </Button>
    </Form> 
    <Container>
        <List>
          {characters.map((character) => (
            <ListItem key={character.id}>
            
            {character.thumbnail && (
              <div>
                <Link to={`/description/${character.id}`}>
                  <CharacterThumbnail
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                </Link>
              </div>
              )}
              <h2>{character.name}</h2>
              </ListItem>
          ))}
        </List>
    </Container>
    <Footer />
  </Main>
  );
};

export default Home;
