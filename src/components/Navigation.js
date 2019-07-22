import React from 'react';
import Button from '@material-ui/core/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { AuthUserContext } from './Session';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser && <NavigationAuth authUser={authUser} />}
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/Casefiles">Case Files</Nav.Link>
        <Nav.Link href="/export">Export Data</Nav.Link>
        <Nav.Link href="/usermanage">User Manage</Nav.Link>
      </Nav>
      <Nav className="justify-content-end">
        <Nav.Item>
          <Nav.Link href="/Create"><Button variant="contained" className="new-casefile-button">New Case File</Button></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/signout">
            <Button
              variant="contained"
              className="new-casefile-button"
            >
              SignOut
            </Button>
          </Nav.Link>
        </Nav.Item>
      </Nav>

    </Navbar.Collapse>
    {/* {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )} */}
      <li>
        {authUser.name}
      </li>
  </Navbar>
);

// const NavigationNonAuth = () => (
//   <ul>
//     <li>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//     </li>
//   </ul>
// );

export default Navigation;
