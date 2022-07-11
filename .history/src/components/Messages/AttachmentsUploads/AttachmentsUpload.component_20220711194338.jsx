import React from "react";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import { useState } from "react";

const AttachmentsUpload =(props) => {

    const [fileState,setFilesState]=useState(null);
    const onFileAdded = (event) => {
        const file=e.target.files[0];
        if(file){
            setFilesState(file);
        }
    }


    //dal parent componet ricevo le props per la chiusura e l'apertura se props.open è true la modal viene aperta
    return( <Modal open={props.open} onClose={props.onClose}>
        <Modal.Header>
            <Input
            type="file"
            name="file"
            onChange={onFileAdded}
            />
        </Modal.Header>
        <Modal.Actions>
            <Button>
                <Icon name="checkmark" /> Aggiungi
            </Button>
            <Button>
            <Icon name="remove" /> Cancella
            </Button>
        </Modal.Actions>

    </Modal>  )
}