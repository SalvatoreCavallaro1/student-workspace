import React from 'react';
import { Segment, Header, Input } from 'semantic-ui-react';

const MessageHeader = () =>{
    //HEADER 1 CHANNEL TITLE E NUMERO UTENTI
    //HEADER 2 PER CERCARE MESSAGGI NELLA CHAT
    return <Segment clearing>
        <Header floated='left' fluid="true" as="h2">
        </Header>

        <Header>
        </Header> 
    </Segment>
}

export default MessageHeader;