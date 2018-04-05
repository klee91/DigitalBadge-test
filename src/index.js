import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    //container for every other route component
    <Router>
        <App />
    </Router>
, document.getElementById('root'));
registerServiceWorker();
