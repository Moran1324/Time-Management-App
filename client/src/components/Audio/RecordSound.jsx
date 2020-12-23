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
  const [recording, setRecording] = useState(null);

  const {
    audio, isRecording, start, stop, audioFile, audioStream, audioBlob, getAudioFromBuffer,
  } = useRecorder();

  useEffect(() => {
    if (audio && !isRecording) {
      const getData = async () => {
        try {
          const { text } = await getTranscript(audio);
          setTranscript(text);
        } catch (err) {
          console.log('transcript error: ', err);
        }
        try {
          const res = await testAudio();
          // const result = res.data;
          // const buffer = Buffer.from(result);
          // const blob = new Blob(buffer, { type: 'audio/wav' });
          // const url = window.URL.createObjectURL(blob);
          // const tempAudioFile = new Audio(url);
          // setRecording(tempAudioFile);

          // console.log('newAudioElement: ', tempAudioFile);
          // console.log('newAudioBlob: ', blob);
          console.log('res: ', res);
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

  const playRecording = () => {
    if (recording) {
      recording.play();
    }
  };

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
      {recording ? (
        <MyButton
          type="button"
          onClick={playRecording}
          text="Play Recording"
        />
      ) : null}
      <audio src="http://localhost:3001/api/audio/test2" controls autoPlay />

    </div>
  );
}
