import React, { useEffect, useState, useMemo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import useForm, { ERRORS } from '../../hooks/useMyForm';
import useAuth from '../../hooks/useAuth';
import useStates from '../../hooks/useStates';

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

function Login() {
  const classes = useStyles();

  const history = useHistory();

  const { signin } = useAuth();

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
    if (errors.length > 0) return;
    const success = await signin(formData);
    if (success) history.push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
            <Grid item container xs={12} justify="center">
              <Grid item xs={6}>
                Remember Me?
                <Checkbox checked={formData?.rememberMe} onChange={handleInputChange('rememberMe')} />

              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs={12}>
              <Paper elevation={isMaxFloat ? 24 : 10} style={{ padding: '1rem', textAlign: 'center' }}>
                <Link to="/signup">
                  Don't have an account yet? Sign up!
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

export default Login;
