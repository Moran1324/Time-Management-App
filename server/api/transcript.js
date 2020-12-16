/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const { Router } = require('express');
const speech = require('@google-cloud/speech');
// const { readFile } = require('fs').promises;
const multer = require('multer');

const upload = multer();

const router = Router();

const { FILENAME, GOOGLE_PROJECT_ID } = process.env;

const client = new speech.SpeechClient(GOOGLE_PROJECT_ID, FILENAME);

const quickStart = async (audioBytes) => {
  // console.log('api', process.env.GOOGLE_APPLICATION_CREDENTIALS);
  // const fileName = './tests/mocks/audioMock2.mp3';

  // const file = await readFile(fileName);

  console.log('audioBytes: ', audioBytes);

  // audioBytes = audioBytes.toString('base64');

  const audio = {
    content: audioBytes.toString('base64'),
    // content: audioBytes.toString('base64'),
  };
  const config = {
    // encoding: 'LINEAR16',
    // sampleRateHerz: 16000,
    // languageCode: 'iw-IL',
    languageCode: 'en-US',

  };
  const request = {
    audio,
    config,
  };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');
    console.log(`transcription: ${transcription}`);
    return transcription;
  } catch (err) {
    console.log('request err', err);
    return null;
  }
};

router.post('/', upload.any(), async (req, res) => {
  // const audio = req.body.audioFile && req.body.audioFile;
  const audio = req.files[0] && req.files[0].buffer;
  // console.log('req', req);
  if (audio) {
    console.log('got audio', audio);
    try {
      const transcript = await quickStart(audio);
      res.json({ text: transcript });
    } catch (err) {
      console.log('route error', err);
      res.json({ message: 'there was an error' });
    }
  }
});

router.options('/', (req, res) => {
  console.log(req.body && req.body);
  res.sendStatus(200);
});

module.exports = router;
