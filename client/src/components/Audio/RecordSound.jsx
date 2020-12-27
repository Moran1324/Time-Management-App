import React, { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
// import io from 'socket.io-client';
import useRecorder from '../../hooks/useRecorder';
import { getTranscript, postAudio, testAudio } from '../../api/network';
import AudioAnalyser from './AudioAnalyzer';
import MyButton from '../wrappers/MyButton';
import MyAudio from '../wrappers/MyAudio';

export default function RecordsSound() {
  const [transcript, setTranscript] = useState(null);
  const [fileName, setFileName] = useState(null);
  // add a language state

  const audioRef = useRef();

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

  const playAudio = () => {
    if (audioFile) {
      audioFile.play();
    }
  };

  const playAudioElement = () => {
    if (fileName) {
      audioRef.current.play();
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
        <MyAudio
          src={`http://localhost:3001/api/v1/audio/${fileName}`}
          audioRef={audioRef}
          onClick={playAudioElement}
          buttonText="Play Audio Element"
        />
      ) : null}

    </div>
  );
}
