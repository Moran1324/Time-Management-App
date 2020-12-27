const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { writeFile } = require('fs').promises;
const path = require('path');

const router = Router();

router.use(fileUpload());

router.get('/:fileName', (req, res, next) => {
  const options = {
    root: path.join(__dirname, '/../../sounds'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  const fileName = `${req.params.fileName}.wav`;
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log(err);
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
      res.status(201).json({ message: 'created' });
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
