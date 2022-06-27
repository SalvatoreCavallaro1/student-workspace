import React , {useEffect,useState}from 'react';
import MessageHeader from './MessageHeader/Message.Header.component';
import MessageContent from './MessageContent/MessageContent.component';
import MessageInput from './MessageInput/MessageInput.component';
import * as firebase from '../../server/firebase';
import {ref,onChildAdded} from "firebase/database";
import { connect } from 'react-redux';
import { Segment, Comment } from 'semantic-ui-react';
import "./Messages.css";
const Messages = (props) =>{

    const [messagesState, setMessagesState]= useState([]); // per mantenere la lista dei messaggi

    useEffect(()=> {
        if(props.channel)
        {
        onChildAdded(ref(firebase.db, 'messages/'+props.channel.id), (snapshot) => {
            setMessagesState((currentState) => {
                let updatedState = [...currentState];
                updatedState.push(snapshot.val());
                return updatedState;
            })    

        });
        // return()=> message.child(props.channel.id).off(); //stacco l'event listener
    }
    }, [props.channel])


    const displayMessages = () => {
        if(messagesState.length>0){
            return messagesState.map((message) => { // estraggo i messaggi e li mando al component MessageContent
                return <MessageContent key={message.timestamp} message={message}/>
            })
        }
    }


    return <div><MessageHeader/>
    <Segment className='messageContent'>
        <Comment.Group>
          {displayMessages()}  
        </Comment.Group>
    </Segment>
    <MessageInput/></div>
}

const mapStateToProps =(state) => {
    return {
        channel : state.channel.currentChannel
    }
}
/// restituiamo nel informazioni del canale come props al component Messages
export default connect(mapStateToProps)(Messages);