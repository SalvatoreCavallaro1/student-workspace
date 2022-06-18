import React, {useEffect} from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//aggiungo il routing all'applicazione
import { BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
//importo i components
import Register from './components/Auth/Register/Register.component';
import Login from './components/Auth/Login/Login.component';
import * as firebase from './server/firebase';



//lo importiamo qui perchè, attraverso l'applicazione ogni volta che userò il react component
//semantic ui non dovrò reimportare manualmente il file css dato che è già importato qui il css sarrà
//applicato su tutta l'applicazione 
import "semantic-ui-css/semantic.min.css";


/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render*/

const Index = (props) => {
  //uso useEffect per eseguire il questo pezzo di codice una sola volta
  useEffect (() => {
    firebase.auth().onAuthStateChanged((user) =>
    {
      if(user){
        //se  è già loggato faccio un ridirect sul componet App
        props.history.push("/");
      }else {
        // se l'utente non è loggato lo mando alla pagina di login
        props.history.push("/login");
      }

    })

},[]); 
  return(
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={App} />
    </Switch>

  )
}

// il router da accesso ad alcune delle proprietà relative al routing
//come ht (history) object  trami cui posso reindirizzare l'utente ai vari componenti
// o reinderizzare l'utente alla pagina precedente
const IndexWithRouter = withRouter(Index);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <IndexWithRouter/>
    </Router> 
  </React.StrictMode>,
  document.getElementById('root')
);


// <App /> chiama App.js
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
