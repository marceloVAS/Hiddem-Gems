import React from 'react';
import Card from './UI/Card';

export default function ArtistRecommend({ recommendations }) {
  console.log('recommend');
  console.log(recommendations);
  return (
    <div className='col-lg-5 col-md-12'>
      <a className="card-link" href={recommendations.external_urls.spotify} target='_blank'>
        <Card className="recommended">
          <img src={recommendations.album.images[1].url} />
          <div>
            <h5 className='track-name'>{recommendations.name}</h5>
            <p className='artist-name'>{recommendations.artists[0].name}</p>
          </div>
        </Card>
      </a>
    </div>
  );
}