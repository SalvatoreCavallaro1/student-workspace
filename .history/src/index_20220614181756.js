import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//aggiungo il routing all'applicazione
import { BrowserRouter as  Router,Switch,Route } from 'react-router-dom';


//lo importiamo qui perchè, attraverso l'applicazione ogni volta che userò il react component
//semantic ui non dovrò reimportare manualmente il file css dato che è già importato qui il css sarrà
//applicato su tutta l'applicazione 
import "semantic-ui-css/semantic.min.css";

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
);
// <App /> chiama App.js
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
