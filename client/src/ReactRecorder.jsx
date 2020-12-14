import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const handleStart = () => SpeechRecognition.startListening({
    continuous: true,
    language: 'he'
  })
  
  const handleStop = async () => {
    await SpeechRecognition.stopListening()
    const data = await SpeechRecognition.getRecognition()
    console.log('recognition: ', data)
  }

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>transcription: {transcript}</p>
    </div>
  )
}
export default Dictaphone