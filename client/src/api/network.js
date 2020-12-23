import user from './api-user';

export const postAudio = (audioBlob) => user('/audio', { body: audioBlob, method: 'POST' }, true);

export const testAudio = (base64Blob) => user('/audio/test', { body: base64Blob, method: 'POST' });

export const getTranscript = (audioFile) => user('/transcript', { body: audioFile, method: 'POST' }, true);

export default user;
