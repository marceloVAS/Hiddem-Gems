import React, { useState } from 'react';

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
            'Bearer BQA1FD_OsQbP1e133GDM_PjuOhBhSZUNgPOPEb1IKcFjcq8-WgaKNQM77lKkYK3jPlWC6Ad8H2G0814mNcirE6LDClBwo8HhUKPwjY4nPkue_bW0GDjXQ893X7HqxKJbwiv6YfBNizwsFkOmFoT2hySeH_pBavgf0VGbX0hLyM03hVM78r_ofiBc92Al67S-PQfZkPnrmR4e1sdV8QoSulM7rnhvKSkixA_Jk3zl_oibx6QyyGNrbo7-vRBgfaeWzXDFkP31WYc',
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
      <input type="text" onChange={artistInputChangeHandler} />
    </form>
  );
}