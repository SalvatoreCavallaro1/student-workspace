import React from "react";
import { Input, Modal } from "semantic-ui-react";

const AttachmentsUpload =(props) => {
    return( <Modal>
        <Modal.Header>
            <Input
            type="file"
            name="file"
            />
        </Modal.Header>

    </Modal>  )
}