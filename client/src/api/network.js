import user from './api-user';

export const postAudio = (audioBlob) => user('/audio', { body: audioBlob, method: 'POST' }, true);

export const testAudio = () => user('/audio/test');

export const getTranscript = (audioFile, language = 'hebrew') => user(`/transcript?language=${language}`, { body: audioFile, method: 'POST' }, true);

export default user;
