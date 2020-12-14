import React, { useState, useEffect } from 'react'
import { getTranscript } from './api/network'

export default function NativeRecorder() {

  const [audio, setAudio] = useState({})
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    if (audio) {
      const getData = async () => {
        // const base64audio = audio.toString('base64')
        const { text } = await getTranscript(audio)
        text && console.log('text: ', text)
      }
      getData()
    } else return
  }, [audio])

  const handleAudio = () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
  
      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });
  
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, {type: 'audio'});
        console.log('blob', audioBlob)
        setAudio(audioBlob)
      });
  
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    });
  }

  return (
    <div>
      <button onClick={handleAudio}>Start</button>
      {/* <button onClick={handleAudio.stop()}>Stop</button> */}
      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p>transcription: {transcript}</p> */}
    </div>
  )
}

/*
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks);
    });

    setTimeout(() => {
      mediaRecorder.stop();
    }, 3000);
  });
*/
