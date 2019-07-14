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
import Navigation from './components/Navigation';

import { withAuthentication } from './components/Session';

const App = () => (
  <Router>
    <div className="top-bar"></div>
    <div className="menu-container">
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/Casefiles">Case Files</Nav.Link>
              <Nav.Link href="/export">Export Data</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <Nav.Item>
                <Nav.Link href="/Create"><Button variant="contained" className="new-casefile-button">New Case File</Button></Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
    <div>
      <Route exact path='/' component={() => {
        window.location.href = '/signin';
        return null;
      }}/>
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/create' component={Create} />
      <Route path='/show/:id' component={Show} />
      <Route path='/casefiles/' component={CaseFiles} />
      <Route path='/export' component={Export} />
    </div>
  </Router>
);

export default App;
// export default withAuthentication(App);
