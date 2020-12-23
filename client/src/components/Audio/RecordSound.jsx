import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
// import io from 'socket.io-client';
import useRecorder from '../../hooks/useRecorder';
import { getTranscript, postAudio, testAudio } from '../../api/network';
import AudioAnalyser from './AudioAnalyzer';
import MyButton from '../wrappers/MyButton';

// const socket = io.connect('http://localhost:8081');

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export default function RecordsSound() {
  const [transcript, setTranscript] = useState(null);
  const [fileName, setFileName] = useState(null);
  // add a language state

  const {
    audio, isRecording, start, stop, audioFile, audioStream, audioBlob, getAudioFromBuffer,
  } = useRecorder();

  useEffect(() => {
    if (audio && !isRecording) {
      const getData = async () => {
        // get transcription
        try {
          const { text } = await getTranscript(audio);
          setTranscript(text);
        } catch (err) {
          console.log('transcript error: ', err);
        }
        // post audio and set audio src
        try {
          await postAudio(audio);
          setFileName('test2');
        } catch (err) {
          console.log('audio error: ', err);
        }
      };
      getData();
    }
  }, [audio, isRecording]);

  // useEffect(() => {
  //   socket.on('message', (data) => {
  //     console.log('data', data);
  //   });
  // }, [socket]);

  // const handleSocketClick = () => {
  //   socket.emit('message', 'hello there');
  // };

  const playAudio = () => {
    if (audioFile) {
      audioFile.play();
    }
  };

  const handleMobileStart = (e) => {
    e.stopPropagation();
    start();
  };

  const handleMobileStop = (e) => {
    e.stopPropagation();
    stop();
  };

  return (
    <div className="audio-recorder">
      {isMobile
        ? (
          <MyButton
            type="button"
            onTouchStartCapture={handleMobileStart}
            onTouchEndCapture={handleMobileStop}
            text={isRecording ? 'Stop Recording' : 'Start Recording'}
          />
        )
        : (
          <MyButton
            type="button"
            onClick={isRecording ? stop : start}
            text={isRecording ? 'Stop Recording' : 'Start Recording'}
          />
        )}
      <div className="audio-visualizer">
        <AudioAnalyser mediaStream={audioStream} height={150} width={300} />
      </div>
      <div className="audio-transcript">
        transcript:
        {transcript}
      </div>
      {audioFile ? (
        <MyButton
          type="button"
          onClick={playAudio}
          text="Play Audio"
        />
      ) : null}
      {fileName ? (
        <audio src={`http://localhost:3001/api/audio/${fileName}`} controls />
      ) : null}

    </div>
  );
}
