import React from "react";



//creo il component register

const Login = () => {
    return (<Grid verticalAlign="middle" textAlign="center" className="grid-form">
<Grid.Column style={{maxWidth : '500px'}}>
    <Header icon as="h2">
        <Icon name="university"/>
        Register
    </Header>
    <Form onSubmit={onSubmit}>
        <Segment stacked>
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
        </Segment>
        <Button disabled={isLoading} loading={isLoading}>Login</Button>
    </Form>
    
    {errorState.length > 0 &&  // se errorstate è settato verrà visualizzata la sezione relativa ai messaggi d'errrore
        <Message error>
            <h3>Errors</h3>
            {formaterrors()}
        </Message>
        
    }
    

    <Message>
        Non sei già iscritto? <Link to="/register">Registrati </Link>
    </Message>
</Grid.Column>

</Grid>)
}

export default Login;