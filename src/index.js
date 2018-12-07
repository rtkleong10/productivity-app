import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import './resources/stylesheets/index.css';
import App from './App';

// Configure Firebase App
var config = {
	apiKey: "AIzaSyAQF-rTPPF46aNuqiWIR4c-xWdWI8zx8VA",
	authDomain: "productivity-app-f8175.firebaseapp.com",
	databaseURL: "https://productivity-app-f8175.firebaseio.com",
	projectId: "productivity-app-f8175",
	storageBucket: "productivity-app-f8175.appspot.com",
	messagingSenderId: "990382624221"
};

firebase.initializeApp(config);


// Render the App
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();