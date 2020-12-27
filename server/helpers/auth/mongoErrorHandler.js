module.exports = (err) => {
  // user model errors
  console.log(err.message, err.code);
  const errors = {};

  // validation errors
  if (err.message.toLowerCase().includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties: { path, message } }) => {
      if (path === 'email') errors[path] = message;
      if (path === 'password') errors[path] = message;
    });
  }

  // duplicate email error
  if (err.code === 11000) errors.email = 'email already registered';

  console.log('errors: ', errors);
  return errors;
};
