import React, { useState, useEffect } from 'react';

export default function AuthTest() {
  const redirect_uri = 'https://react-5jk6aq.stackblitz.io/callback';
  //TEST
  /*const fetchTest = async () => {
    const response = await fetch(
      'https://accounts.spotify.com/authorize?response_type=code&client_id=1563dad1ac504112ac2fa6dfe7117aeb',
      {
        headers: {
          Authorization:
            'Bearer BQCe-i_ZRQCZJW1FUzl8T5A1NSDqDl40rVGixIe6cI0B_sib5oFJJ1-C-0QsAiAb4VqwNTvYjCWOQExzAw2coQ8zzcZuI1LkrubqQ061qO9aUxP9Nq_dZE1JjBGS6ZsijnR1wJGYaD3updY0NCcFvtcqvxxPfscgz0kPjKuVJ98YnaXPUQ',
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };*/
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer BQCe-i_ZRQCZJW1FUzl8T5A1NSDqDl40rVGixIe6cI0B_sib5oFJJ1-C-0QsAiAb4VqwNTvYjCWOQExzAw2coQ8zzcZuI1LkrubqQ061qO9aUxP9Nq_dZE1JjBGS6ZsijnR1wJGYaD3updY0NCcFvtcqvxxPfscgz0kPjKuVJ98YnaXPUQ'
  );
  myHeaders.append(
    'Cookie',
    '__Host-device_id=AQBfoXBturQ7vYzhJoz9iUU3NHzPc9ZqpDBBTlCPGoxJFMFcEiZXDQJVmNBuDgUO8ZLntKF5GSiEO8qPjsxPdOQUG5rs45v3krM; __Host-sp_csrf_sid=7c02433bb40bc8951e56f8ae5a51d93fe960b3f86bd5f120099145aca8f58c75; __Secure-TPASESSION=AQDkIdqdEHMDGmQ1281uYYKUWVAQg9nmRMKJTExspjcqckyZaWm6loAUwLyYr97c9S6NbBbYgCKGkOV/FQIoLvFAZ080pXnjd8g=; inapptestgroup=; sp_sso_csrf_token=013acda71925d3dad48b0b776137c108e55056cdab31363832353433353232303736; sp_tr=false'
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://accounts.spotify.com/authorize?response_type=code&client_id=1563dad1ac504112ac2fa6dfe7117aeb',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
}