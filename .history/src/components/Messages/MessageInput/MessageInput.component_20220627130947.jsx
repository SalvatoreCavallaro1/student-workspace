import React, {useState} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref} from "firebase/database";
import { connect } from 'react-redux';

const MessageInput = (props) =>{


    const messageRef = ref(firebase.db, 'messages');
    const [messageState, setMessageState]= useState("");

    //creo una funzione per creare il messaggio in formato json
    const createMessageInfo = () => {
        return {
            user : {
                avatar : props.user.photoURL,
                name : props.user.displayName,
                id : props.user.uid
            },
            content : messageState,
            timestamp : firebase.db.ServerValue.TIMESTAMP


        }
    }

    const onSubmit = () => {
        if(messageState) //controllo se l'utente ha inserito dei dati
        {
            
            
            set(createMessageInfo((push(child(ref(firebase.db, 'messages/'+ props.channel.id)))))) 
            .then(()=> console.log('sent'))
            .catch((error) => console.log(error))
            
            /*messageRef.child(props.channel.id)
            .push()
            .set(createMessageInfo())
            .then(()=> console.log('sent'))
            .catch((error) => console.log(error))*/

        }

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
        user : state.user.currentUser,
        channel : state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(MessageInput);