import React, {useState} from "react"; //useState serve a manternere lo stato fra i component
import { Grid, Form, Segment, Header, Icon, Button, Message } from "semantic-ui-react";
import "./Register.css"
import * as firebase from '../../../server/firebase';
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// per creare l'ui del form utilizzo il pacchetto semantic-ui-reactù
// npm install semantic-ui-react
// npm install semantic-ui-css
//grazie a questo pacchetto ho accesso a diversi component che non devo creare da zero, così posso creare il form più facilmente
// npm install react-router-dom 
//quest'altro pacchetto mi serve per abilitare il rputing nella web app, così posso far navigare l'user da un component all'altro 
// in manierea più fluida senza ricaricare davvero la pagina 



//creo il component register
console.log(firebase.database)

const Register = () => {

    //default user object

    let user={
        userName : '',
        email : '',
        password : '',
        confirmpassword : ''

    }

    //default error object
    let errors = [];

    //Riferimento alla collection degli utenti sul realtime database di firebase, se non è presente sul database verrà creata automaticamente

    //let userCollectionRef = firebase.database().ref('users');

    const [userState, setuserState] = useState(user);
    const [errorState, seterrorState] = useState(errors);
    //variabile per indicare che la pagina sta facendo il loading delle informazioni sul server
    const[isLoading, setIsLoading]= useState(false);

    //funzione handleInpt che riceve gli eventi degli oggetti
    const handleInput = (event) => {

        //event target
        let target= event.target;
        //update dello stato
        setuserState((currentState) => {
            let currentuser = { ...currentState }; //clono l'oggetto currentState
            currentuser[target.name] = target.value; //usen name o email o password
            return currentuser; //aggiorno il valore dell'oggetto user
        })


    }

    //validazione del form
    const checkForm = () =>
    {
        if(isFormEmpty()){
            seterrorState((error) => error.concat({message : "Riempi tutti i campi del form"}))
            return false;    
        }
        else if(!checkPassword())
        {
            
            return false;
        }
        return true;
    }

    //controllo se uno dei campi del form è vuoto
    const isFormEmpty = () => 
    {
        return !userState.userName.length ||
        !userState.email.length ||
        !userState.password.length ||
        !userState.confirmpassword.length;

    }

    // check della password
    const checkPassword = () => {
        if(userState.password.length<8){
            seterrorState((error) => error.concat({message : "La password deve contenere almeno 8 caratteri"}));
            return false;
        }
        else if(userState.password !== userState.confirmpassword )
        {
            seterrorState((error) => error.concat({message : "La due password non coincidono"}));
            return false;
        }
        return true;
    }

    //azione del form al submit
    const onSubmit = (event) => {

        seterrorState(() => []); //svuoto l'array degli errori ad ogni submit
        if(checkForm())
        {
            setIsLoading(true); //setto isLoading true per indicare che sta caricando e l'utente non può fare submit più volte
            //creo l'utente su firebase usando il metodo predefinito di firebase che ritorna una promise 
            createUserWithEmailAndPassword(firebase.auth,userState.email,userState.password)
            .then(createdUser => {
                setIsLoading(false); //setto isLoading false per indicare che è finito il caricamento
                updateuserDetails(createdUser);  //chiamo la funzione updateuserDetails per settare il displayName e l'url della foto prodilo utilizzando l' API gravatar
            }).catch((servererror) => {
                setIsLoading(false);
                seterrorState((error) => error.concat(servererror));
                //console.log(servererror.code);
                //console.log(servererror.message);
                
            })
        

        } 
    }


    //uso questa funzione per settare il display name e l'url della photo profilo utilizzando l'app gravatar
    const updateuserDetails = (createdUser) => {
        if (createdUser) {
                setIsLoading(true);
                updateProfile(createdUser.user, {
                    displayName: userState.userName,
                    photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`
                })//l'API ritorna una promise che gestisco così 
                .then(() => {
                    setIsLoading(false);
                    console.log(createdUser);
                    saveUserInDB(createdUser);
                })
                .catch((serverError) => {
                    setIsLoading(false);
                    seterrorState((error) => error.concat(serverError));
                })
        }
    }

    //funzione per salvare effettivamente le informazioni dell'utente sul database
    //salvo sul database solo l'uid, display name e l'url della foto 
    const saveUserInDB = (createdUser) => {
       /* setIsLoading(true);
        userCollectionRef.child(createdUser.user.uid).set({
            displayName: createdUser.user.displayName,
            photoURL: createdUser.user.photoURL
        })
        .then(() => {
            setIsLoading(false);
            console.log('utente salvato sul RT Database');
        })
        .catch(serverError => {
            setIsLoading(false);
            seterrorState((error) => error.concat(serverError));
        })*/
    }


    //funzione per la formattazione della visualizzazione degli errori
    const formaterrors = () =>
    {
        return errorState.map((error,index) => <p key={index}>{error.message}</p>)
    }
    
//uso il component grid di semantic-ui
return (<Grid verticalAlign="middle" textAlign="center" className="grid-form">
<Grid.Column style={{maxWidth : '500px'}}>
    <Header icon as="h2">
        <Icon name="university"/>
        Register
    </Header>
    <Form onSubmit={onSubmit}>
        <Segment stacked>
            <Form.Input
                name="userName"
                value={userState.userName}
                icon="user"   //presa da semantic ui, per vedere le altre icone disponibile leggere la documentation
                iconPosition="left"
                onChange={handleInput}
                type="text"
                placeholder="User Name"
            />
            <Form.Input
                name="email"
                value={userState.email}
                icon="mail"
                iconPosition="left"
                onChange={handleInput}
                type="email"
                placeholder="User Email"
            />
            <Form.Input
                name="password"
                value={userState.password}
                icon="lock"
                iconPosition="left"
                onChange={handleInput}
                type="password"
                placeholder="User Password"
            />
            <Form.Input
                name="confirmpassword"
                value={userState.confirmpassword}
                icon="lock"
                iconPosition="left"
                onChange={handleInput}
                type="password"
                placeholder="Confirm Password"
            />
        </Segment>
        <Button disabled={isLoading} loading={isLoading}>Submit</Button>
    </Form>
    
    {errorState.length > 0 &&  // se errorstate è settato verrà visualizzata la sezione relativa ai messaggi d'errrore
        <Message error>
            <h3>Errors</h3>
            {formaterrors()}
        </Message>
    }
</Grid.Column>

</Grid>)

}

export default Register;