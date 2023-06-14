import React, { useState } from 'react';
import ArtistSelected from './ArtistSelected';

export default function AuthFinal() {
    const clientId = "1563dad1ac504112ac2fa6dfe7117aeb"; // Replace with your client ID
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.log(code);
    const [token, setToken] = useState('');

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
            params.append("redirect_uri", "http://localhost:5173");
            params.append("scope", "user-read-private user-read-email");
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
    
    // TODO: Get access token for code
    const getAccessToken = async (clientId,code) =>{
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:5173");
        params.append("code_verifier", verifier);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const { access_token } = await result.json();
        console.log('token ' + access_token);
        console.log(result);
        return access_token;
    }
    console.log(token);
    return (
        <div>
            {code ? (
                
                // <ArtistSelected />
                getAccessToken(clientId, code)
            ) : (
                codeConditional()
            )}

        </div>
    );

}

