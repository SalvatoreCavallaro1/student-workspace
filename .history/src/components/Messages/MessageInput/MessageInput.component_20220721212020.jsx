import React, {useState} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref,push,set,child,serverTimestamp} from "firebase/database";
import {ref as refStorage, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { connect } from 'react-redux';
import {AttachmentsUpload} from "../AttachmentsUploads/AttachmentsUpload.component"
import { v4 as uuidv4 } from 'uuid'; //serve a generare un uuid random 

const MessageInput = (props) =>{

    var ext="";
    //const messageRef = ref(firebase.db, 'messages/');
    //const storage = getStorage();
    //const StorageRef = refStorage(storage);
    const StorageRef = refStorage(firebase.storage);
    const [messageState, setMessageState]= useState("");
    //const [extensionState, setExtState]= useState("");
    const [fileDialogState, setFileDialogState]= useState(false);

    //creo una funzione per creare il messaggio in formato json
    const createMessageInfo = (downloadURL,exten) => {
        console.log(ext[1]);
        return {
            user : {
                avatar : props.user.photoURL,
                name : props.user.displayName,
                id : props.user.uid
            },
            content : messageState,
            attachment: downloadURL || "",
            extension : exten || "",
            //timestamp : firebase.db.ServerValue.TIMESTAMP
            timestamp : serverTimestamp(firebase.db)


        }
    }

    const sendMessage = (downloadURL) => {
        if(messageState || downloadURL) //controllo se l'utente ha inserito dei dati
        {
            const newkey=push(child(ref(firebase.db, 'messages/'),props.channel.id)).key;
            console.log(newkey);
            set(ref(firebase.db, 'messages/'+props.channel.id+'/'+newkey),createMessageInfo(downloadURL)).then(()=> setMessageState("")).catch((error) => console.log(error))
        }

    }

    const onMessageChange = (event) => {
        const target= event.target;
        setMessageState(target.value);
    }
    const createActionButtons = () => {
        return <>
            <Button icon="send" onClick={()=>{sendMessage()}}/>
            <Button icon="upload" onClick={()=> setFileDialogState(true)}/>
        </>
    }

    /*const fileExtension =()=> {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    }*/
    const uploadAttachments = (file,contentType) => {

         ext = /^.+\.([^.]+)$/.exec(file.name); //prendo l'estensione del file che ho caricato 
        //setExtState(ext[1]);
        console.log(ext[1]);
        //console.log(extensionState);
        //console.log(ext[1]);
        

        //console.log(file);
  
        if(ext[1]==="pdf")
        {
                // Creo i metadati del file
            /** @type {any} */
            const metadata = {
                contentType: 'application/pdf'
            };
            
            // Carico il file e i metadati nell'oggetto 'images/mountains.jpg'.
            const storageRef = refStorage(firebase.storage, 'pdf/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            
            // event listener per i cambiamenti di stato, gli errori e il completamento del caricamento.
            uploadTask.on('state_changed',
                (snapshot) => {
                // Ottengo l'avanzamento dell'attività, compreso il numero di byte caricati e il numero totale di byte da caricare
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
                //  full list of error:
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                    // L'utente non ha l'autorizzazione ad accedere all'oggetto
                    break;
                    case 'storage/canceled':
                    // User canceled the upload
                    break;
            
                    // ...
            
                    case 'storage/unknown':
                    // Si è verificato un errore sconosciuto, ispezionare error.serverResponse
                    break;
                }
                }, 
                () => {
                // Il caricamento è stato completato con successo, oro posso ottenere l'URL di download
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(ext[1]);
                    sendMessage(downloadURL,ext[1]);
                    console.log('File available at', downloadURL);
                });
                }
            );
        }
        else if(ext[1]==="jpeg" || ext[1]==="jpg")
        {
                // Creo i metadati del file
            /** @type {any} */
            const metadata = {
                contentType: 'image/jpeg'
            };
            
            // Carico il file e i metadati nell'oggetto 'images/mountains.jpg'.
            const storageRef = refStorage(firebase.storage, 'images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            
            // event listener per i cambiamenti di stato, gli errori e il completamento del caricamento.
            uploadTask.on('state_changed',
                (snapshot) => {
                // Ottengo l'avanzamento dell'attività, compreso il numero di byte caricati e il numero totale di byte da caricare
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
                //  full list of error:
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                    // L'utente non ha l'autorizzazione ad accedere all'oggetto
                    break;
                    case 'storage/canceled':
                    // User canceled the upload
                    break;
            
                    // ...
            
                    case 'storage/unknown':
                    // Si è verificato un errore sconosciuto, ispezionare error.serverResponse
                    break;
                }
                }, 
                () => {
                // Il caricamento è stato completato con successo, oro posso ottenere l'URL di download
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    sendMessage(downloadURL,ext[1]);
                    console.log('File available at', downloadURL);
                });
                }
            );
        }
        else 
        {
                // Creo i metadati del file
            /** @type {any} */
            const metadata = {
                contentType: 'image/png'
            };
            
            // Carico il file e i metadati nell'oggetto 'images/mountains.jpg'.
            const storageRef = refStorage(firebase.storage, 'images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            
            // event listener per i cambiamenti di stato, gli errori e il completamento del caricamento.
            uploadTask.on('state_changed',
                (snapshot) => {
                // Ottengo l'avanzamento dell'attività, compreso il numero di byte caricati e il numero totale di byte da caricare
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
                //  full list of error:
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                    // L'utente non ha l'autorizzazione ad accedere all'oggetto
                    break;
                    case 'storage/canceled':
                    // User canceled the upload
                    break;
            
                    // ...
            
                    case 'storage/unknown':
                    // Si è verificato un errore sconosciuto, ispezionare error.serverResponse
                    break;
                }
                }, 
                () => {
                // Il caricamento è stato completato con successo, oro posso ottenere l'URL di download
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    sendMessage(downloadURL,ext[1]);
                    console.log('File available at', downloadURL);
                });
                }
            );
        }
        
        



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