import React from 'react';
import './App.css';
import Recorder from './Recorder';
import Home from './ts/index';
import ReactRecorder from './ReactRecorder';
import NativeRecorder from './NativeRecorder';
import RecordSound from './components/RecordSound';

function App() {
  return (
    <div className="App">
      <Recorder />
      <h1>separate</h1>
      <Home />
      <h1>separate</h1>
      <ReactRecorder />
      <h1>separate</h1>
      <NativeRecorder />
      <h1>separate below is true one</h1>
      <RecordSound />
    </div>
  );
}

export default App;
