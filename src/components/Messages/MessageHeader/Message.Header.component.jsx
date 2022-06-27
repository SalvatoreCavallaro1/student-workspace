import React from 'react';
import { Segment, Header, Input, Icon } from 'semantic-ui-react';

const MessageHeader = () =>{
    //HEADER 1 CHANNEL TITLE E NUMERO UTENTI
    //HEADER 2 PER CERCARE MESSAGGI NELLA CHAT
    return <Segment clearing>
        <Header floated='left' fluid="true" as="h2">
            <span>
                CANALE
                <Icon name='star outline'/>

                
            </span>
            <Header.Subheader> 3 Utenti</Header.Subheader>
        </Header>

        <Header floated='right'>
            <Input 
            name="search"
            icon="search"
            placeholder="cerca messaggio"
            size="mini"
            />
        </Header> 
    </Segment>
}

export default MessageHeader;