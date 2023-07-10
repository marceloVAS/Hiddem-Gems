import React, { useState } from 'react';
import './UI/ArtistInput.css';

export default function ArtistInput(props) {
  const [artistInput, setArtistInput] = useState('');
  const artistInputChangeHandler = (event) => {
    setArtistInput(event.target.value);
  };

  const fetchData = async () => {
    const response = await fetch(
      'https://api.spotify.com/v1/search?q=' +
        artistInput +
        '&type=artist&limit=1',
      {
        headers: {
          Authorization:
            'Bearer ' + props.spotifyToken,
        },
      }
    );
    const data = await response.json();
    
    //Collecting Artist Name, Image and ID
    const artistName = data.artists.items[0].name;
    const artistImage = data.artists.items[0].images[0].url;
    const artistId = data.artists.items[0].id;
    //Collecting Artist Genres and reducing the number of genres inside the array to the max number accepted by spotify API
    const artistGenre = data.artists.items[0].genres;
    while (artistGenre.length > 4) {
      artistGenre.pop();
    }

    props.selectedArtist(artistName, artistImage, artistGenre, artistId);
    console.log(artistGenre);
    console.log(artistId);
  };

  const artistSubmitHandler = (event) => {
    event.preventDefault();
    console.log(artistInput + ' submit value');
    fetchData();
  };

  return (
    <form onSubmit={artistSubmitHandler}>
      <label>Think of an artist you love and insert their name on the search bar!</label>
      <input type="text" onChange={artistInputChangeHandler} />
      <button className={`neo-btn py-1 ${artistInput ? '' : 'disabled'}`}>Search</button>
    </form>
  );
}