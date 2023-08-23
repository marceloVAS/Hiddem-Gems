import React from 'react';
import Card from './UI/Card';

export default function ArtistRecommend({ recommendations }) {
  console.log('recommend');
  console.log(recommendations);
  return (
    <div className='col-lg-6 col-md-12'>
      <a className="card-link" href={recommendations.external_urls.spotify} target='_blank'>
        <Card className="recommended">
          <img src={recommendations.album.images[1].url} />
          <div>
            <h5 className='primary-name'>{recommendations.name}</h5>
            <p className='secondary-name'>{recommendations.artists[0].name}</p>
            <div className='d-flex align-items-center pt-3'>
              <img className='icon' src='src/components/UI/icon/Spotify_Icon_RGB_Black.png'></img>
              <h5 className='primary-name m-0 ms-2'>PLAY ON SPOTIFY</h5>
            </div>
          </div>
          
        </Card>
      </a>
    </div>
  );
}