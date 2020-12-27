const { Router } = require('express');
const fileUpload = require('express-fileupload');
const speech2Text = require('../../helpers/speech2Text');

// const upload = multer();

const router = Router();

router.post('/', fileUpload(), async (req, res) => {
  const audio = req.files && req.files.audio_data.data;
  let language;
  if (typeof req.query.language === 'string') {
    language = req.query.language;
  }
  if (audio) {
    // console.log('got audio', audio);
    try {
      const transcript = await speech2Text(audio, language);
      res.json({ text: transcript });
    } catch (err) {
      console.log('route error', err);
      res.json({ message: 'there was an error' });
    }
  }
});

module.exports = router;
