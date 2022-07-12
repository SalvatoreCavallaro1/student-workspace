import React, {useState} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref,push,set,child,serverTimestamp} from "firebase/database";
import { connect } from 'react-redux';
import {AttachmentsUpload} from "../AttachmentsUploads/AttachmentsUpload.component"
import { v4 as uuidv4 } from 'uuid'; //serve a generare un uuid random 

const MessageInput = (props) =>{


    //const messageRef = ref(firebase.db, 'messages/');
    const StorageRef = ref(firebase.storage);
    const [messageState, setMessageState]= useState("");
    const [fileDialogState, setFileDialogState]= useState(false);

    //creo una funzione per creare il messaggio in formato json
    const createMessageInfo = () => {
        return {
            user : {
                avatar : props.user.photoURL,
                name : props.user.displayName,
                id : props.user.uid
            },
            content : messageState,
            //timestamp : firebase.db.ServerValue.TIMESTAMP
            timestamp : serverTimestamp(firebase.db)


        }
    }

    const onSubmit = () => {
        if(messageState) //controllo se l'utente ha inserito dei dati
        {
            const newkey=push(child(ref(firebase.db, 'messages/'),props.channel.id)).key;
            console.log(newkey);
            set(ref(firebase.db, 'messages/'+props.channel.id+'/'+newkey),createMessageInfo()).then(()=> setMessageState("")).catch((error) => console.log(error))
        }

    }

    const onMessageChange = (event) => {
        const target= event.target;
        setMessageState(target.value);
    }
    const createActionButtons = () => {
        return <>
            <Button icon="send" onClick={onSubmit}/>
            <Button icon="upload" onClick={()=> setFileDialogState(true)}/>
        </>
    }

    const uploadAttachments = (file,contentType) => {
        //const filePath = `chat/images/${uuidv4()}.jpg`; //genero il nome in maniera random con la funzione uuid così se gli utenti caricano immagini o file con lo stesso nome non vengono sovrascritti


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
        <AttachmentsUpload uploadAttachments={uploadAttachments} open={fileDialogState} onClose={() => setFileDialogState(false)}/>
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