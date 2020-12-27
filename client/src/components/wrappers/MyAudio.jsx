import React from 'react';
import MyButton from './MyButton';

const MyAudio = ({
  audioRef, src, onClick, buttonText,
}) => (
  <>
    <audio src={src} ref={audioRef} />
    <MyButton
      type="button"
      onClick={onClick}
      text={buttonText}
    />
  </>
);

export default MyAudio;
