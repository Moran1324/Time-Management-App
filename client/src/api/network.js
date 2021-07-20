import user from './api-user';

export const postAudio = (audioBlob) => user('/audio', { body: audioBlob, method: 'POST' }, true);

export const testAudio = () => user('/audio/test');

export const getTranscript = (audioFile, language = 'hebrew') => user(`/transcript?language=${language}`, { body: audioFile, method: 'POST' }, true);

export const registerUser = (userObj) => user('/auth/register', { body: userObj });

export const loginUser = (credentials) => user('/auth/login', { body: credentials });

export const logoutUser = (refreshToken) => user('/auth/logout', { body: { token: refreshToken } });

export const authenticateUser = (refreshToken) => user('/auth/token', { body: { token: refreshToken } });

export default user;
