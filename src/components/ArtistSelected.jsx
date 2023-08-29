import React, { useState } from 'react';
import ArtistInput from './ArtistInput';
import ArtistRecommend from './ArtistRecommend';
import Card from './UI/Card';
import icon from './UI/img/Spotify_Icon_RGB_Black.png'
import './UI/ArtistSelected.css';

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
    <div className='row main-content d-flex justify-content-center'>
      <div className='col-lg-5'>
        <div className='row'>
          <ArtistInput selectedArtist={selectedArtistHandler} spotifyToken={spotifyToken} />
          {artist ? (
            <>
              <Card className="searched col-lg-6 col-sm-12" onClick={artistClickHandler}>
                <img src={artistImg} />
                <div>
                  <h5 className='primary-name'>{artist}</h5>
                  <p className='secondary-name'>Artist</p>
                  <div className='d-flex justify-content-end pt-2'>
                    <img className='icon' src={icon}></img>
                  </div>  
                </div>
              </Card>
              <div className='col-lg-6 col-sm-12 mt-3'>If this is the artist you were thinking of, click on them to generate some suggestions.</div>
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