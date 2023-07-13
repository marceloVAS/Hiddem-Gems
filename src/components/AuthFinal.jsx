import React, { useState, useEffect } from 'react';
import ArtistSelected from './ArtistSelected';

const clientId = "1563dad1ac504112ac2fa6dfe7117aeb"; // Replace with your client ID

//redirects user to spotify auth page, generates code verifiers
const codeConditional = async () => {
  redirectToAuthCodeFlow(clientId);
  // TODO: Redirect to Spotify authorization page
  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    // params.append("redirect_uri", "http://localhost:5173");
    params.append("redirect_uri", "https://hiddengems.marcelovas.com");
    params.append("scope", "");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
//uses code from spotify auth page to generate token and put token on local storage
const getAccessToken = async (clientId, code) => {
  const verifier = localStorage.getItem("verifier");

  //Set local storage value with a time to live
  const setWithExpiry = (key, value,ttl) =>{
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  // params.append("redirect_uri", "http://localhost:5173");
  params.append("redirect_uri", "https://hiddengems.marcelovas.com");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });
  
  if (!result.ok) {
    // Handle error here
    console.error("Error occurred:", result.statusText);
    const errorResponse = await result.json();
    console.error("Error response:", errorResponse);
    return;
  }
  const { access_token } = await result.json();
  console.log('params ' + params);
  console.log('API URL ' + result);
  console.log('token2 ' + access_token);
  /* localStorage.setItem("token", access_token); */
  setWithExpiry("token", access_token, 3600000);
  return access_token;
}

export default function AuthFinal() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log('code ' + code);
  const [token, setToken] = useState('');

  //Get local storage data and if its expired remove it from local storage, otherwise return it.
  const getWithExpiry = (key) =>{
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log('token1 ' + token);
    if (!token) {
      getAccessToken(clientId, code)
        .then(() => {
          setToken(getWithExpiry("token"));
        });
    } else { }
  }, []);

  return (
    <div className='col-lg-12'>
      {token ? (
        <ArtistSelected spotifyToken={token}/>
      ) : (
        <div className='container d-flex justify-content-center'>
          <div className='col-lg-9 col-sm-12'>
            <div className='row d-flex justify-content-center'>
              <h4 className='text-center'>Hidden Gems won't keep any personal data from your account.</h4>
              <div className='card info'>
                <p>Since Hidden Gems uses Spotify to recommend songs, you have to be logged into an account to have access to Spotify's archive.</p>
                <button className='neo-btn' onClick={codeConditional}>Login with Spotify</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}