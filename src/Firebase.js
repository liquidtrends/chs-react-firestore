import * as firebase from 'firebase';
import firestore from 'firebase/firestore';



const config = {
    apiKey: "AIzaSyB9VdzLJH6jIKG49eJcaC-CyaHs4K5JAxk",
    authDomain: "chs01-e6f8f.firebaseapp.com",
    databaseURL: "https://chs01-e6f8f.firebaseio.com",
    projectId: "chs01-e6f8f",
    storageBucket: "chs01-e6f8f.appspot.com",
    messagingSenderId: "1024731643977",
};
firebase.initializeApp(config);



export default firebase;
