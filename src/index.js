import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import CaseFiles from './components/CaseFiles';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

ReactDOM.render(
  <Router>
      <div className="top-bar"></div>
      <div className="menu-container">
        <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Dashboard</Nav.Link>
              <Nav.Link href="/Casefiles">Case Files</Nav.Link>
              <Nav.Link href="">Export Data</Nav.Link>
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
        <Route exact path='/' component={App} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
        <Route path='/casefiles/' component={CaseFiles} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
