import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Notes from './components/Notes';
import ProductivitySession from './components/ProductivitySession';
import TasksMenu from './components/TasksMenu';
import WeeklySchedule from './components/WeeklySchedule';

function App() {
  return (
    <Router>
      <Nav />
      <TasksMenu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/weekly-scedule">
          <WeeklySchedule />
        </Route>
        <Route exact path="/note">
          <Notes />
        </Route>
        <Route exact path="/productivity-session">
          <ProductivitySession />
        </Route>

        <Route>
          <div className="error-404">
            Error 404, Page Not Found
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
