import React, { useState } from 'react';
import ArtistInput from './ArtistInput';
import ArtistRecommend from './ArtistRecommend';
import AuthFinal from './AuthFinal';
import Card from './UI/Card';

export default function ArtistSelected() {
  //Artist values from the user input
  const [artist, setArtist] = useState('');
  const [artistImg, setArtistImg] = useState('');
  const [artistGenre, setArtistGenre] = useState();
  const [artistId, setArtistId] = useState('');

  //Artist values from recommended artists
  const [tracks, setTracks] = useState();

  const selectedArtistHandler = (
    artistNameCaptured,
    artistImageCaptured,
    artistGenreCaptured,
    artistIdCaptured
  ) => {
    setArtist(artistNameCaptured);
    setArtistImg(artistImageCaptured);
    setArtistGenre(artistGenreCaptured);
    setArtistId(artistIdCaptured);
  };

  const artistClickHandler = async () => {
    const response = await fetch(
      'https://api.spotify.com/v1/recommendations?seed_artists=' +
        artistId +
        '&seed_genres=' +
        artistGenre +
        '&limit=3&max_popularity=30',
      {
        headers: {
          Authorization:
            'Bearer BQA1FD_OsQbP1e133GDM_PjuOhBhSZUNgPOPEb1IKcFjcq8-WgaKNQM77lKkYK3jPlWC6Ad8H2G0814mNcirE6LDClBwo8HhUKPwjY4nPkue_bW0GDjXQ893X7HqxKJbwiv6YfBNizwsFkOmFoT2hySeH_pBavgf0VGbX0hLyM03hVM78r_ofiBc92Al67S-PQfZkPnrmR4e1sdV8QoSulM7rnhvKSkixA_Jk3zl_oibx6QyyGNrbo7-vRBgfaeWzXDFkP31WYc',
        },
      }
    );
    const data = await response.json();
    // console.log(data.tracks);
    console.log(response);
    setTracks(data.tracks);
  };

  return (
    <div>
      <AuthFinal/>
      <ArtistInput selectedArtist={selectedArtistHandler} />
      {artist ? (
        <Card className="limit" onClick={artistClickHandler}>
          <img src={artistImg} height="160" width="160" />
          <p>{artist}</p>
        </Card>
      ) : (
        <></>
      )}

      <br />
      {tracks ? (
        <div>
          {tracks.map((artist) => (
            <ArtistRecommend recommendations={artist} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}