const { readFile } = require('fs').promises;

module.exports = async (fileName) => {
  try {
    const buffer = await readFile(`sounds/${fileName}.wav`);
    // const filename = new Date().toISOString();
    // const formData = new FormData();
    // formData.append('audio_data', buffer, filename);
    // const result = new Uint8Array(buffer);
    // console.log('after read buffer: ', buffer);
    return buffer;
  } catch (err) {
    console.log('error: ', err);
    return null;
  }
};
