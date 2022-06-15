import React from 'react';
import ReactDOM from 'react-dom/client';
//import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//aggiungo il routing all'applicazione
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Route, Switch } from "react-router";
//importo i components
import Register from './components/Auth/Register/Register.component';
import Login from './components/Auth/Login/Login.component';



//lo importiamo qui perchè, attraverso l'applicazione ogni volta che userò il react component
//semantic ui non dovrò reimportare manualmente il file css dato che è già importato qui il css sarrà
//applicato su tutta l'applicazione 
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(

  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/Login" component={Login}/>
        <Route path="/Register" component={Register}/>
        <Route path="/" component={App}/>
      </Switch>

    </Router>

    <App />  
  </React.StrictMode>

);

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/" component={App}/>
      </Switch>

    </Router>

    <App />  
  </React.StrictMode>
);*/


// <App /> chiama App.js
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
