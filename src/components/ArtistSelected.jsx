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
        '&limit=4&max_popularity=30',
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
    <div className='row d-flex justify-content-center'>
      <div className='col-lg-4'>
        <div className='row'>
          <ArtistInput selectedArtist={selectedArtistHandler} spotifyToken={spotifyToken} />
          {artist ? (
            <>
              <Card className="searched col" onClick={artistClickHandler}>
                <img src={artistImg} />
                <div>
                <h5 className='track-name'>{artist}</h5>
                  <p className='artist-name'>Artist</p>
                </div>
              </Card>
              <div className='col mt-3'>If this is the artist you were thinking of, click on them to generate some suggestions.</div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className='col-lg-5'>
        {tracks ? (
          <div className='row'>
            {tracks.map((artist) => (
              <ArtistRecommend recommendations={artist} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}