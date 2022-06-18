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
import store from './store/store';
import { combinedReducers } from './store/reducer';
import { setUser } from './store/actioncreator';
//import { createStore } from 'redux';
//import { configureStore } from '@reduxjs/toolkit';




//lo importiamo qui perchè, attraverso l'applicazione ogni volta che userò il react component
//semantic ui non dovrò reimportare manualmente il file css dato che è già importato qui il css sarrà
//applicato su tutta l'applicazione 
import "semantic-ui-css/semantic.min.css";


/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render*/

//const store= createStore(() => {})

const Index = (props) => {
  //uso useEffect per eseguire il questo pezzo di codice una sola volta
  useEffect (() => {
    onAuthStateChanged(firebase.auth, (user) =>
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
//per collegarlo al redux store
const mapStateToProps = (state) => {
  return {
    currentUser : state.user.currentUser
  } //così qualunque value avrò nel redux store per current user will be ascend to this property
}

const mapDispatchToProps = (dispatch) => {

}  //con actioncreator  we can dispatch it so our reducer will be listening to whatever our dispach is returning 
//quindi faremo il dispatch di questo oggetto:

/*return {
        type: SET_USER,
        payload: {
            currentUser : user
        }
    }*/
    // then our reducer will listen and  update the state

const IndexWithRouter = withRouter(connect()(Index));

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
