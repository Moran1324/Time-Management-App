/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { useState } from 'react';
import Recorder from '../helpers/Recorder';

export default function useRecorder() {
  const [record, setRecord] = useState(null);
  // audio stream, also for visualize
  const [audioStream, setAudioStream] = useState(null);
  // audio formData for google STT
  const [audio, setAudio] = useState(null);
  // audio object to play in browser
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleTranscriptExport = (blob) => {
    // create FormData with Buffer
    const filename = new Date().toISOString();
    const formData = new FormData();
    formData.append('audio_data', blob, filename);
    setAudio(formData);
  };

  const handleAudioExport = (blob) => {
    const url = window.URL.createObjectURL(blob);
    const tempAudioFile = new Audio(url);
    setAudioFile(tempAudioFile);
  };

  const getAudioFromBuffer = (audioContext) => {
    const rec = new Recorder(audioContext, { numChannels: 1 });
    let tempAudio;
    rec.exportWAV((blob) => {
      const url = window.URL.createObjectURL(blob);
      tempAudio = new Audio(url);
    });
    return tempAudio;
  };

  const startRecording = () => {
    let rec = null;
    const constraints = { audio: true, video: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setAudio(null);
        setAudioFile(null);
        setIsRecording(true);
        const audioContext = new window.AudioContext();
        setAudioStream(stream);
        const input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        // playSoundIn();
        rec.record();
        setRecord(rec);
      })
      .catch((err) => {
        setIsRecording(false);
        console.log(err);
      });
  };

  const stopRecording = () => {
    record.stop();
    // playSoundOut();
    audioStream.getAudioTracks()[0].stop();

    record.exportWAV(handleTranscriptExport);
    record.exportWAV(handleAudioExport);
    setIsRecording(false);
  };

  return {
    audio,
    isRecording,
    start: startRecording,
    stop: stopRecording,
    audioFile,
    handleAudioExport,
    audioStream,
    getAudioFromBuffer,
  };
}
