import React from 'react';
import { Segment, Input } from 'semantic-ui-react';

const MessageInput = () =>{

    const createActionButtons = () => {
        return <>
            <Button icon="send" />
            <Button icon="upload" />
        </>
    }

    return <Segment>
        <Input
        name="message"
        value="test message"
        label= {}
        />
    </Segment>
}

export default MessageInput;