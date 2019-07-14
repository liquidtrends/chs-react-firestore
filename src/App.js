import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';
import CaseFiles from './components/CaseFiles';
import Create from './components/Create';
import Dashboard from  './components/Dashboard';
import Edit from './components/Edit';
import Export from './components/ExportData';
import Show from './components/Show';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import Navigation from './components/Navigation';
import UserManager from './components/UserManager';

import { withAuthentication } from './components/Session';

const App = () => (
  <Router>
    <div className="top-bar"></div>
    <div className="menu-container">
      <Container>
        <Navigation />
      </Container>
    </div>
    <div>
      <Route exact path='/' component={() => {
        window.location.href = '/signin';
        return null;
      }}/>
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/signout' component={SignOut} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/usermanage' component={UserManager} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/create' component={Create} />
      <Route path='/show/:id' component={Show} />
      <Route path='/casefiles/' component={CaseFiles} />
      <Route path='/export' component={Export} />
    </div>
  </Router>
);

// export default App;
export default withAuthentication(App);
