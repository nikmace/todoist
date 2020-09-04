import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCp8qt5KI-AvllICKQMPvBl1MygIUDbFMw",
    authDomain: "todoist-app-f504c.firebaseapp.com",
    databaseURL: "https://todoist-app-f504c.firebaseio.com",
    projectId: "todoist-app-f504c",
    storageBucket: "todoist-app-f504c.appspot.com",
    messagingSenderId: "591287337674",
    appId: "1:591287337674:web:f0d2ac56cc9f8a5a09aa33"
});

export {firebaseConfig as firebase}; 