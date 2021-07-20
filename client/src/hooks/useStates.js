import React, { useReducer } from 'react';

function setStates(states, updatedStates) {
  Object.keys(updatedStates).forEach((key) => {
    states[key] = updatedStates[key];
  });
  return states;
}

function useStates(initialValue = {}) {
  return (useReducer(setStates, initialValue));
}

export default useStates;
