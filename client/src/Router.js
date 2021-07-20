import React, { useState, useEffect } from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Home from './components/Home';
import Nav from './components/Nav';
import Notes from './components/Notes';
import ProductivitySession from './components/ProductivitySession';
import TasksMenu from './components/TasksMenu';
import WeeklySchedule from './components/WeeklySchedule';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import DailyAgenda from './components/DailyAgenda';
import useAuth from './hooks/useAuth';

function AppRouter() {
  const { isLogged } = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogged === null) return;
    setLoading(false);
  }, [isLogged]);

  console.log('isLogged: ', isLogged);
  return isLoading
    ? (
      <Grid container justify="center" alignItems="center" style={{ width: '100vw', height: '50vh' }}>
        <Grid item xs={1}>
          <CircularProgress />
        </Grid>
      </Grid>
    )
    : (
      <Switch>
        {!isLogged
          ? (
            <>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </>
          )
          : (
            <>
              <Nav />
              <TasksMenu />
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/daily-agenda">
                <DailyAgenda />
              </Route>
              <Route exact path="/weekly-schedule">
                <WeeklySchedule />
              </Route>
              <Route exact path="/note">
                <Notes />
              </Route>
              <Route exact path="/productivity-session">
                <ProductivitySession />
              </Route>
              {/* <Route>
                <div className="error-404">
                  Error 404, Page Not Found
                </div>
                <Link to="/">Go back Home</Link>
              </Route> */}
            </>
          )}
      </Switch>
    );
}

export default AppRouter;
