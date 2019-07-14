import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withFirebase } from './Firebase';
import firebase from '../Firebase';

const SignUpPage = () => (
  <div className="container">
    <Card>
      <CardContent>
        <h1>SignUp</h1>
        <SignUpForm />
      </CardContent>
    </Card>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.props.firebase.auth.onAuthStateChanged(function(user) {
          if (user) {
            localStorage.setItem('authUser', JSON.stringify(user));
          }
        });
        return this.props.firebase.firestores.collection('users').add({
          username,
          email,
          isAdmin
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        window.location.href = "/dashboard";
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="container">
        <FormGroup>
          <form onSubmit={this.onSubmit}>
            <Grid container>
              <Grid item xs={12} style={{ textAlign: "center" }} >
                <TextField
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  style={{ width: "50%" }}
                  type="text"
                  variant="outlined"
                  placeholder="Full Name"
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <TextField
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  style={{ width: "50%",
                  marginTop: "1rem"}}
                  type="text"
                  variant="outlined"
                  placeholder="Email Address"
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <TextField
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  style={{ width: "50%",
                  marginTop: "1rem"}}
                  type="password"
                  variant="outlined"
                  placeholder="Password"
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <TextField
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  style={{ width: "50%",
                  marginTop: "1rem"}}
                  variant="outlined"
                  placeholder="Confirm Password"
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <label>
                  Is Super Admin?:
                  <input
                    name="isAdmin"
                    type="checkbox"
                    checked={isAdmin}
                    onChange={this.onChangeCheckbox}
                  />
                </label>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  disabled={isInvalid}
                  style={{
                    width: "30%",
                    marginTop: "1rem"
                  }}
                  variant="outlined"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Grid>
              {error && <p>{error.message}</p>}
            </Grid>
          </form>
        </FormGroup>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={"/signup"}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
