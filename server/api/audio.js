const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { writeFile } = require('fs').promises;
const FormData = require('form-data');
const getAudio = require('../helpers/getAudio');

const router = Router();

router.use(fileUpload());

router.post('/', async (req, res) => {
  const audioBuffer = req.files && req.files.audio_data.data;
  if (audioBuffer) {
    try {
      const result = await writeFile('sounds/test2.wav', audioBuffer);
      const newBuffer = await getAudio('test2');
      res.status(201).json({ data: newBuffer });
    } catch (err) {
      console.log('there was an error: ', err);
    }
  }
});

router.post('/test', (req, res) => {
  const blob = req.body;
  console.log('blob: ', blob);
  res.json({ blob });
});

module.exports = router;
