import React , {useEffect,useState}from 'react';
import MessageHeader from './MessageHeader/Message.Header.component';
import MessageContent from './MessageContent/MessageContent.component';
import MessageInput from './MessageInput/MessageInput.component';
import * as firebase from '../../../server/firebase';
import {ref,onChildAdded} from "firebase/database";
import { connect } from 'react-redux';
const Messages = (props) =>{

    const [messagesState, setMessagesState]= useState([]); // per mantenere la lista dei messaggi

    useEffect(()=> {
        onChildAdded(ref(firebase.db, 'messages/'+props.channel.id), (snapshot) => {
            setMessagesState((currentState) => {
                let updatedState = [...currentState];
                updatedState.push(snapshot.val());
                return updatedState;
            })    

        });
    })


    const displayMessages = () => {
        if(messagesState.length>0){
            return messagesState.map((message) => { // estraggo i messaggi e li mando al component MessageContent
                return <MessageContent key={message.timestamp} message={message}/>
            })
        }
    }


    return <div><MessageHeader/>
    <MessageInput/></div>
}

const mapStateToProps =(state) => {
    return {
        channel : state.channel.currentChannel
    }
}
/// restituiamo nel informazioni del canale come props al component Messages
export default connect(mapStateToProps)(Messages);