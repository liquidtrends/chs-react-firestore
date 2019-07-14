import React from 'react';
import { withFirebase } from './Firebase';

const SignOutButton = ({ firebase }) => {
  firebase.doSignOut();
  window.location.href="/signin";
  localStorage.removeItem('authUser');
  return null;
}

export default withFirebase(SignOutButton);
