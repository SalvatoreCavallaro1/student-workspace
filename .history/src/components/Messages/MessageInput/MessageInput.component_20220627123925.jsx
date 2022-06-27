import React, {useState} from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref} from "firebase/database";

const MessageInput = () =>{


    const messageRef = ref(firebase.db, 'messages');
    const [messageState, setMessageState]= useState("");
    const onSubmit = () => {

    }
    const createActionButtons = () => {
        return <>
            <Button icon="send" />
            <Button icon="upload" />
        </>
    }

    return <Segment>
        <Input
        fluid="true"
        name="message"
        value={messageState}
        label= {createActionButtons()}
        labelPosition="right"
        />
    </Segment>
}

export default MessageInput;