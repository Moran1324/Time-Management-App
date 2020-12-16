import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useRecorder from '../hooks/useRecorder';
import getTranscript from '../api/network';
// import axios from "axios";
// import useSound from "use-sound";
// import SoundIn from "../sound-effect/sound-in.mp3";
// import SoundOut from "../sound-effect/sound-out.mp3";

const socket = io.connect('http://localhost:8081');

export default function RecordsSound() {
  const {
    audio, isRecording, start, stop,
  } = useRecorder();

  useEffect(() => {
    if (audio && !isRecording) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/transcript', true);
      xhr.send(audio);
      xhr.onload = function (e) {
        console.log('transcript', e.target);
      };
      // const getData = async () => {
      //   const {text} = await

      // }
      // getData()
    }
  }, [audio, isRecording]);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('data', data);
    });
  }, [socket]);

  const handleClick = () => {
    socket.emit('message', 'hello there');
  };

  return (
    <div>
      <button type="button" onClick={start} disabled={isRecording}>
        Start Recording
      </button>
      <button type="button" onClick={stop} disabled={!isRecording}>
        Stop Recording
      </button>
      <button type="button" onClick={handleClick}>
        Socket
      </button>
      {/* <div>{response}</div> */}
    </div>
  );
}
