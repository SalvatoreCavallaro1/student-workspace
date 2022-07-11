import React from "react";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import { useState } from "react";
import mime from "mime-types"

export const AttachmentsUpload =(props) => {

    const [fileState,setFilesState]=useState(null);
    const acceptedTypes = ["image/png","image/jpeg"]
    const onFileAdded = (event) => {
        const file=e.target.files[0];
        if(file){
            setFilesState(file);
        }
    }

    const submit =()=> {
        // per validare i file uso npm install mime-type 
        if(fileState && acceptedTypes(mime.lookup(fileState.name)))  
        //passando il nome del file alla funzione lookup di mime mi verrà restutita l'estensione del file, 
        //posso così controllare se l'etensione + inclusa all'interno del vettore delle estensioni supportate
        {
            // dal parent utilizzo il metodo upload image
            props.uploadAttachments(file,mime.lookup(fileState.name)); //passo così il file e l'estensione
            props.onClose();
            setFilesState(null);
        }
    }

    //dal parent componet ricevo le props per la chiusura e l'apertura se props.open è true la modal viene aperta

    //label="File type (png, jpeg)"
    return( <Modal open={props.open} onClose={props.onClose}>
        <Modal.Header>
            <Input
            type="file"
            name="file"
            onChange={onFileAdded}           
            />
        </Modal.Header>
        <Modal.Actions>
            <Button onClick={submit}>
                <Icon name="checkmark" /> Aggiungi
            </Button>
            <Button onClick={props.onClose}>
            <Icon name="remove" /> Cancella
            </Button>
        </Modal.Actions>

    </Modal>  )
}