import React from "react";
import { Input, Modal } from "semantic-ui-react";
import { useState } from "react";

const AttachmentsUpload =(props) => {

    const [fileState,seFileState]=useState(null);


    //dal parent componet ricevo le props per la chiusura e l'apertura se props.open è true la modal viene aperta
    return( <Modal open={props.open} onClose={props.onClose}>
        <Modal.Header>
            <Input
            type="file"
            name="file"
            />
        </Modal.Header>

    </Modal>  )
}