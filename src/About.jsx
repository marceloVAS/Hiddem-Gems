import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function About() {

    return (
      <>
        <Header />
        <div className='container d-flex justify-content-center'>
          <div className='card info'>
            <p>
              Hidden Gems is a work in progress built using React.js, Vite and Spotify API by Marcelo Sousa. It is a personal project to help people find musical hidden gems. 
                That could be by showing people less known artists that are similar to something they like or even less known songs from their favorite artists.
            </p>
            <br/>
            <p>
              I had this idea bouncing around my head for a while already and since I would love a tool like this I decided to finally build it. Since it is a work in progress and a personal project consider leaving some feedback if you find any issues or have some ideas, I'd love to hear them.
            </p>
            <br />
            <p>Hope you enjoy it and good digging :)</p>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    )
}