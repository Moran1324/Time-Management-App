import React from 'react';

const MyButton = (props) => (
  <button {...props}>
    {props.text}
  </button>
);

export default MyButton;
