import React, {useState} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref,push,set,child,serverTimestamp} from "firebase/database";
import {ref as refStorage, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { connect } from 'react-redux';
import {AttachmentsUpload} from "../AttachmentsUploads/AttachmentsUpload.component"
import { v4 as uuidv4 } from 'uuid'; //serve a generare un uuid random 

const MessageInput = (props) =>{


    //const messageRef = ref(firebase.db, 'messages/');
    //const storage = getStorage();
    //const StorageRef = refStorage(storage);
    const StorageRef = refStorage(firebase.storage);
    const [messageState, setMessageState]= useState("");
    const [fileDialogState, setFileDialogState]= useState(false);

    //creo una funzione per creare il messaggio in formato json
    const createMessageInfo = (downloadURL) => {
        return {
            user : {
                avatar : props.user.photoURL,
                name : props.user.displayName,
                id : props.user.uid
            },
            content : messageState,
            attachment: downloadURL || "",
            //timestamp : firebase.db.ServerValue.TIMESTAMP
            timestamp : serverTimestamp(firebase.db)


        }
    }

    const sendMessage = () => {
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
            <Button icon="send" onClick={sendMessage}/>
            <Button icon="upload" onClick={()=> setFileDialogState(true)}/>
        </>
    }

    const uploadAttachments = (file,contentType) => {

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg'
        };
        
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = refStorage(firebase.storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }
            }, 
            (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
                case 'storage/canceled':
                // User canceled the upload
                break;
        
                // ...
        
                case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            }, 
            () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
            }
        );
        



        /*
        const ImagesRef = refStorage(firebase.storage, `${uuidv4()}.jpg`);
        const filePath = refStorage(firebase.storage, `chat/images/${uuidv4()}.jpg`);
        // While the file names are the same, the references point to different files
        ImagesRef.name === filePath.name;           // true
        ImagesRef.fullPath === filePath.fullPath;   // false */
       
       
       // const filePath = `chat/images/${uuidv4()}.jpg`; //genero il nome in maniera random con la funzione uuid così se gli utenti caricano immagini o file con lo stesso nome non vengono sovrascritti
        
        
        
        /*StorageRef.child(filePath).put(file,{contentType: contentType})
        .then((data)=> console.log(data))
        .catch((error)=>console.log(error));*/

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