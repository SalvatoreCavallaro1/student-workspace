import React , {useEffect}from 'react';
import MessageHeader from './MessageHeader/Message.Header.component';
import MessageContent from './MessageContent/MessageContent.component';
import MessageInput from './MessageInput/MessageInput.component';
import * as firebase from '../../../server/firebase';
import {ref} from "firebase/database";
const Messages = () =>{

    const messageRef = ref(firebase.db, 'messages/');

    useEffect(()=> {

        onChildAdded(channelsRef, (snapshot) => {
            //console.log(snapshot.val());
            

          });
    })

    return <div><MessageHeader/>
    <MessageInput/></div>
}

export default Messages;