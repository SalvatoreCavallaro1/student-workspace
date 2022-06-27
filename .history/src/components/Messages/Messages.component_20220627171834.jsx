import React from 'react';
import MessageHeader from './MessageHeader/Message.Header.component';
import MessageContent from './MessageContent/MessageContent.component';
import MessageInput from './MessageInput/MessageInput.component';
import * as firebase from '../../../server/firebase';
import {ref} from "firebase/database";
const Messages = () =>{
    return <div><MessageHeader/>
    <MessageInput/></div>
}

export default Messages;