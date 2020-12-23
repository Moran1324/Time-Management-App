const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { writeFile } = require('fs').promises;
const path = require('path');
const getAudio = require('../helpers/getAudio');

const router = Router();

router.use(fileUpload());

router.get('/:fileName', (req, res, next) => {
  const options = {
    root: path.join(__dirname, '/../sounds'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  const fileName = `${req.params.fileName}.wav`;
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

router.post('/', async (req, res) => {
  const audioBuffer = req.files && req.files.audio_data.data;
  if (audioBuffer) {
    try {
      const result = await writeFile('sounds/test2.wav', audioBuffer);
      const newBuffer = await getAudio('test2');
      // res.status(201).json({ data: newBuffer });
      res.sendFile(`${__dirname}/../sounds/test2.wav`);
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
