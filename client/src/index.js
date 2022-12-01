import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Website from './Website';
import {BrowserRouter as Router, HashRouter}  from "react-router-dom";
import ScrollToTop from './Components/ScrollToTop';

ReactDOM.render(<HashRouter><ScrollToTop/><Website/></HashRouter>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
