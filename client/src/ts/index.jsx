import React, { useState } from 'react';
import { getTranscript } from '../api/network'
import AudioAnalyzer from './AudioAnalyzer';

const Home = () => {
  const [audio, setAudio] = useState(null);

  const getMicrophone = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((mediaStream) => setAudio(mediaStream));
  };
  const stopMicrophone = async () => {
    audio.getTracks().forEach((track) => track.stop());
    console.log('stream: ', audio.getAudioTracks())
    // let base64String = btoa(String.fromCharCode(...new Uint8Array(audio.getAudioTracks)));

    // const data = await getTranscript(base64String)
    // console.log('data: ', data)
    setAudio(null);
  };
  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  return (
    <div className="container">

      <main>

        <div className="App">
          <div className="controls">
            <button onClick={toggleMicrophone} type="button">
              {audio ? `Stop microphone` : `Get microphone input`}
            </button>
          </div>
          {audio ? <AudioAnalyzer mediaStream={audio} /> : ``}
        </div>
      </main>
    </div>
  );
};

export default Home;
