import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { SignUpLink } from './SignUp';
import { withFirebase } from './Firebase';

const SignInPage = () => (
  <div className="container">
    <Card>
      <CardContent>
        <h1>SignIn</h1>
        <SignInForm />
        <SignUpLink />
      </CardContent>
    </Card>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="container">
        <FormGroup>
          <form onSubmit={this.onSubmit}>
            <Grid container>
              <Grid item xs={12} style={{ textAlign: "center" }} >
                <TextField
                  name="email"
                  onChange={this.onChange}
                  variant="outlined"
                  margin="normal"
                  style={{ width: "50%" }}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <TextField
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  style={{ width: "50%" }}
                  type="password"
                  variant="outlined"
                  placeholder="Password"
                />
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
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                {error && <p>{error.message}</p>}
              </Grid>
            </Grid>
          </form>
        </FormGroup>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };
