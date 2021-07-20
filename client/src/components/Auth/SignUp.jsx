/* eslint-disable consistent-return */
import './SignUp.css';
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useForm from '../../hooks/useMyForm';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const history = useHistory();

  const { signup } = useAuth();

  const { formData, handleInputChange, errors } = useForm();

  const [isMaxFloat, setMaxFloat] = useState(true);
  const [isFloating, setFloating] = useState(false);

  // useEffect(() => {
  //   const floatInterval = setInterval(() => {
  //     setMaxFloat((lastFloatHeight) => !lastFloatHeight);
  //   }, 350);
  //   setFloating(true);
  //   // const floatInterval = setInterval(() => {})

  //   return () => {
  //     clearInterval(floatInterval);
  //   };
  // }, [isMaxFloat, isFloating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete formData.confirmPassword;
    if (errors.length > 0) return;
    const success = await signup(formData);
    if (success) history.push('/login');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInputChange('firstName')}
                value={formData?.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formData?.lastName}
                onChange={handleInputChange('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData?.email}
                onChange={handleInputChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData?.password}
                onChange={handleInputChange('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmePassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-confirm-password"
                value={formData?.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <Paper elevation={isMaxFloat ? 24 : 10} style={{ padding: '1rem', textAlign: 'center' }}>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
