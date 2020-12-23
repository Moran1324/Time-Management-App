/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const speech = require('@google-cloud/speech');

const { FILENAME, GOOGLE_PROJECT_ID } = process.env;

const client = new speech.SpeechClient(GOOGLE_PROJECT_ID, FILENAME);

const LANGUAGES = {
  hebrew: { name: 'Hebrew (Israel)', code: 'iw-IL' },
  english: { name: 'English (United States)', code: 'en-US' },
};

module.exports = async (audioBuffer, language) => {
  let currentLanguage = language;
  if (!language || language === 'null') currentLanguage = 'hebrew';
  const audio = {
    content: audioBuffer.toString('base64'),
  };
  const config = {
    languageCode: LANGUAGES[currentLanguage].code,

  };
  const request = {
    audio,
    config,
  };

  try {
    const [response] = await client.recognize(request);
    console.log(JSON.stringify(response, null, 2));
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');
    return transcription;
  } catch (err) {
    console.log('request err', err);
    return null;
  }
};
