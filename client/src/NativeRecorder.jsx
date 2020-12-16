import React, { useState, useEffect } from 'react';
import { getTranscript } from './api/network';

export default function NativeRecorder() {
  const [audio, setAudio] = useState({});
  const [myMediaRecorder, setMyMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  // useEffect(() => {
  //   if (audio.length < 1) {
  //     const getData = async () => {
  //       console.log('useEffect')
  //       // const base64audio = audio.toString('base64')
  //       const { text } = await getTranscript(audio)
  //       text && console.log('text: ', text)
  //     }
  //     getData()
  //   } else return
  // }, [audio])

  const handleAudio = () => {
    if (isRecording) return;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setIsRecording(true);
        console.log('rec started');

        const audioChunks = [];
        mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const recordAudio = () => {
          // console.log('audio', audioChunks)
          // const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
          // console.log('blob', audioBlob)
          // console.log('audioBlob: ', audioBlob)
            const fileName = new Date().toISOString();
            const formData = new FormData();
            formData.append('audio_data', audioChunks[0], fileName);
            console.log('formData: ', formData.toString());
            // setAudio(formData)
            // try {
            //   const { text } = await getTranscript(audio)
            //   text && console.log('text: ', text)
            // } catch (err) {
            //   console.log(err.message)
            // }
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/transcript', true);
            xhr.send(formData);
            xhr.onload = function (e) {
              console.log('transcript', e.target);
            };
          };
          recordAudio();
        });
        setMyMediaRecorder(mediaRecorder);
      });
  };

  const handleStop = () => {
    if (!isRecording) return;
    myMediaRecorder.stop();
    console.log('rec ended');
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={handleAudio}>Start</button>
      <button onClick={handleStop}>Stop</button>
      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p>transcription: {transcript}</p> */}
    </div>
  );
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
