import React, {useState} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref} from "firebase/database";
import { connect } from 'react-redux';

const MessageInput = () =>{


    const messageRef = ref(firebase.db, 'messages');
    const [messageState, setMessageState]= useState("");
    const onSubmit = () => {

    }

    const onMessageChange = (event) => {
        const target= event.target;
        setMessageState(target.value);
    }
    const createActionButtons = () => {
        return <>
            <Button icon="send" onClick={onSubmit}/>
            <Button icon="upload" />
        </>
    }

    return <Segment>
        <Input
        onChange={onMessageChange}
        fluid={true}
        name="message"
        value={messageState}
        label= {createActionButtons()}
        labelPosition="right"
        />
    </Segment>
}

//ci servono le informazioni dell'utente correntemente loggato
const mapStateToProps =(state) => {
    return {
        user : state.user.currentUser
    }
}

export default connect(mapStateToProps)(MessageInput);