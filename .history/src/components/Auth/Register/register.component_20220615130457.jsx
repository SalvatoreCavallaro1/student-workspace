import React, {useState} from "react"; //useState serve a manternere lo stato fra i component
import { Grid, Form, Segment, Header, Icon, Button } from "semantic-ui-react";

// per creare l'ui del form utilizzo il pacchetto semantic-ui-reactù
// npm install semantic-ui-react
// npm install semantic-ui-css
//grazie a questo pacchetto ho accesso a diversi component che non devo creare da zero, così posso creare il form più facilmente
// npm install react-router-dom 
//quest'altro pacchetto mi serve per abilitare il rputing nella web app, così posso far navigare l'user da un component all'altro 
// in manierea più fluida senza ricaricare davvero la pagina 



//creo il component register

const Register = () => {

    //default use object

    let user={
        userName : '',
        email : '',
        password : '',
        confirmpassword : ''

    }

    const [userState, setuserState]= useState(user);

    //funzione handleInpt che riceve gli eventi degli oggetti
    const handleInput=(event)=> {

        //event target
        let target= event.target;
        //update dello stato
        setuserState((currentState) => {
            let currentuser = {...currentState}; //clono l'oggetto currentState
            currentuser[target.name] = target.value; //usen name o email o password
            return currentuser; //aggiorno il valore dell'oggetto user
        })


    }
    
//uso il component grid di semantic-ui
return (<Grid verticalAlign="middle" textAlign="center">
<Grid.Column style={{maxWidth : '500px'}}>
    <Header icon as="h2">
        <Icon name="university"/>
        Register
    </Header>
    <Form>
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
        <Button>Submit</Button>
    </Form>
</Grid.Column>

</Grid>)

}

export default Register;