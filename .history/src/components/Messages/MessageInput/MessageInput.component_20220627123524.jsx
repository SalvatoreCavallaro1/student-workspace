import React from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';

const MessageInput = () =>{

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
        value="test message"
        label= {createActionButtons()}
        labelPosition="right"
        />
    </Segment>
}

export default MessageInput;