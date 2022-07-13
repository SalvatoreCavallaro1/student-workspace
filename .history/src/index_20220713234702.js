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
import {onAuthStateChanged } from "firebase/auth";
import { Provider, connect } from 'react-redux';
//import store from './store/store';
import { combinedReducers } from './store/reducer';
import { setUser } from './store/actioncreator';
import { createStore } from 'redux';
//import { configureStore } from '@reduxjs/toolkit';




//lo importo qui perchè, attraverso l'applicazione ogni volta che userò il react component
//semantic ui non dovrò reimportare manualmente il file css dato che è già importato qui il css sarrà
//applicato su tutta l'applicazione 
import "semantic-ui-css/semantic.min.css";


/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render*/

const store = createStore(combinedReducers)

const Index = (props) => {
  //useEffect serve a eseguire questo pezzo di codice quando il codice viene renderizzato
  useEffect (() => {
    onAuthStateChanged(firebase.auth, (user) =>
    {
      if(user){
        props.setUser(user); 
        console.log(user.email);
        //se  è già loggato faccio un ridirect sul componet App
        props.history.push("/");
        
      }/*else if(user.email){

      }*/
      
      else {
        // se l'utente non è loggato lo mando alla pagina di login
        props.setUser(null); // se user non è loggato will nullify it
        props.history.push("/login");
      }

    })

},[]); //la lista delle dependency la setto ome un oggetto vuoto in modo che il codice venga eseguito soltanto una volta

// per vedere se lo store di redux viene aggiornato
//console.log(props.currentUser);


  return(
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={App} />
    </Switch>

  )
}

// il router da accesso ad alcune delle proprietà relative al routing
//come ht (history) object  tramite cui posso reindirizzare l'utente ai vari componenti
// o reinderizzare l'utente alla pagina precedente

const mapStateToProps = (state) => {
  return {
    currentUser : state.user.currentUser
  } //così qualunque value avrò nel redux store per current user ascenderà a questa proprietà
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser :(user) => {dispatch(setUser(user))}
  }
}   
  //con actioncreator possiamo farne il dispatch in modo che il reducer ascolti qualunque cosa il  dispach stia restituendo
//quindi faremo il dispatch di questo oggetto:

/*return {
        type: SET_USER,
        payload: {
            currentUser : user
        }
    }*/
    // quindi il reducer "ascolterà" e aggiornerà lo stato
    //quindi non appena viene fatto il dispatch, il reducer farà il catch e aggiornerà lo stato

    //per collegarlo al redux store devo passare mapStateProps e mapDispatchProps
    //così currentUser e seUser saranno disponibili come una prop nel component 
const IndexWithRouter = withRouter(connect(mapStateToProps,mapDispatchToProps)(Index));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <IndexWithRouter/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// <App /> chiama App.js
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
