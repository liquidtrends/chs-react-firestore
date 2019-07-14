import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyB9VdzLJH6jIKG49eJcaC-CyaHs4K5JAxk",
  authDomain: "chs01-e6f8f.firebaseapp.com",
  databaseURL: "https://chs01-e6f8f.firebaseio.com",
  projectId: "chs01-e6f8f",
  storageBucket: "chs01-e6f8f.appspot.com",
  messagingSenderId: "1024731643977",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.database();
    this.firestores = app.firestore();

    /* Social Sign In Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // this.user(authUser.uid)
        //   .once('value')
        //   .then(snapshot => {
        //     const dbUser = snapshot.val();

        //     // default empty roles
        //     if (!dbUser.roles) {
        //       dbUser.roles = {};
        //     }

        //     // merge auth and db user
        //     authUser = {
        //       uid: authUser.uid,
        //       email: authUser.email,
        //       emailVerified: authUser.emailVerified,
        //       providerData: authUser.providerData,
        //       ...dbUser,
        //     };

        //     next(authUser);
        //   });
        authUser = {
          uid: authUser.uid,
          email: authUser.email,
          emailVerified: authUser.emailVerified,
        };
        next(authUser);
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  // *** Message API ***
  message = uid => this.db.ref(`messages/${uid}`);
  messages = () => this.db.ref('messages');
}

export default Firebase;
