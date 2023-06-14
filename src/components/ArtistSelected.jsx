import React, { useState } from 'react';
import ArtistInput from './ArtistInput';
import ArtistRecommend from './ArtistRecommend';
import Card from './UI/Card';

export default function ArtistSelected({spotifyToken}) {
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
            'Bearer ' + spotifyToken,
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
      <ArtistInput selectedArtist={selectedArtistHandler} spotifyToken={spotifyToken} />
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