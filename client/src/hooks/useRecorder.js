/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { useState } from 'react';
import Recorder from '../helpers/Recorder';

export default function useRecorder() {
  const [record, setRecord] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleExport = (buffer) => {
    // create FormData with Buffer
    const filename = new Date().toISOString();
    const formData = new FormData();
    formData.append('audio_data', buffer, filename);
    setAudio(formData);
  };

  const startRecording = () => {
    let rec = null;
    const constraints = { audio: true, video: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setAudio(null);
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

  const StopRecording = async () => {
    record.stop();
    // playSoundOut();
    audioStream.getAudioTracks()[0].stop();
    record.exportWAV(handleExport);
    setIsRecording(false);
  };

  return {
    audio, isRecording, start: startRecording, stop: StopRecording,
  };
}
