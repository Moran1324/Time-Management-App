/* eslint-disable no-param-reassign */
import React, { useState, useReducer } from 'react';
import validator, { isEmail, isAlpha } from 'validator';

export const FORM_ACTIONS = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
  rememberMe: 'rememberMe',
};

const ERRORS = {
  firstName: 'First name can contain only letters',
  lastName: 'Last name can contain only letters',
  email: 'Email is not valid',
  password: 'Password must contain at least 8 characters',
  confirmPassword: 'Passwords do not match!',
};

function formReducer(currentFormData, action) {
  if (action.data) {
    return {
      ...currentFormData,
      [action.type]: action.data,
    };
  }
  delete currentFormData[action.type];
  return { ...currentFormData };
}

function useMyForm() {
  // const [formInfo, setFormInfo] = useState({});
  const [formData, dispatch] = useReducer(formReducer, {});
  const [errors, setErrors] = useState([]);

  const handleInputChange = (type) => (e) => {
    const { value, checked } = e.target;
    const data = value || checked;

    const removeCurrentError = (errorType) => {
      if (errors.includes(ERRORS[errorType])) {
        setErrors((prevErrors) => {
          prevErrors.splice(prevErrors.indexOf(ERRORS[errorType]), 1);
          return prevErrors;
        });
      }
    };
    removeCurrentError(type);
    // validation switch case
    switch (type) {
      case FORM_ACTIONS.firstName:
        if (data && !isAlpha(data)) {
          setErrors((prevErrors) => [...prevErrors, ERRORS.firstName]);
        }
        break;
      case FORM_ACTIONS.lastName:
        if (data && !isAlpha(data)) {
          setErrors((prevErrors) => [...prevErrors, ERRORS.lastName]);
        }
        break;
      case FORM_ACTIONS.email:
        if (data && !isEmail(data)) {
          setErrors((prevErrors) => [...prevErrors, ERRORS.email]);
        }
        break;
      case FORM_ACTIONS.password:
        if (data && data.length <= 8) {
          setErrors((prevErrors) => [...prevErrors, ERRORS.password]);
        }
        break;
      case FORM_ACTIONS.confirmPassword:
        if (data && data !== formData.password) {
          setErrors((prevErrors) => [...prevErrors, ERRORS.confirmPassword]);
        }
        break;
      case FORM_ACTIONS.rememberMe:
        // validation
        break;
      default:
        setErrors((prevErrors) => ([...prevErrors, { general: 'no valid value' }]));
    }

    dispatch({ type, data });
  };

  return { formData, handleInputChange, errors };
}

export default useMyForm;
