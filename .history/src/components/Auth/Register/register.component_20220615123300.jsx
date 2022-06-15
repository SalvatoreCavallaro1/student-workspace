import React from "react";
import { Grid, Form, Segment } from "semantic-ui-react";

// per creare l'ui del form utilizzo il pacchetto semantic-ui-reactù
// npm install semantic-ui-react
// npm install semantic-ui-css
//grazie a questo pacchetto ho accesso a diversi component che non devo creare da zero, così posso creare il form più facilmente
// npm install react-router-dom 
//quest'altro pacchetto mi serve per abilitare il rputing nella web app, così posso far navigare l'user da un component all'altro 
// in manierea più fluida senza ricaricare davvero la pagina 



//creo il component register

const Register = () => {

    //funzione handleInpt che riceve gli eventi degli oggetti
    const handleInput=(event)=> {

    }
    
//uso il component grid di semantic-ui
return (<Grid verticalAlign="middle" textAlign="center">
<Grid.Column>
    <Form>
        <Segment stacked>
            <Form.Input
                name="username"
                value=""
                icon="user"
                iconPosition="left"
                onChange={handleInput}
                type="text"
                placeholder="User Name"
            />
            <Form.Input
                name="email"
                value=""
                icon="mail"
                iconPosition="left"
                onChange={handleInput}
                type="text"
                placeholder="User Email"
            />
            <Form.Input
                name="password"
                value=""
                icon="lock"
                iconPosition="left"
                onChange={handleInput}
                type="text"
                placeholder="User Password"
            />
            <Form.Input
                name="passwordConfirm"
                value=""
                icon="lock"
                iconPosition="left"
                onChange={handleInput}
                type="text"
                placeholder="Confirm Password"
            />
        </Segment>
    </Form>
</Grid.Column>

</Grid>)

}

export default Register;