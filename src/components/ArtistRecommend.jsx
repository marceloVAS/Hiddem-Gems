import React from 'react';
import Card from './UI/Card';

export default function ArtistRecommend({ recommendations }) {
  console.log('recommend');
  console.log(recommendations);
  return (
    <a href={recommendations.external_urls.spotify}>
      <Card className="limit">
        <img
          src={recommendations.album.images[1].url}
          height="160"
          width="160"
        />
        <h3>{recommendations.name}</h3>
        <p>{recommendations.artists[0].name}</p>
      </Card>
    </a>
  );
}