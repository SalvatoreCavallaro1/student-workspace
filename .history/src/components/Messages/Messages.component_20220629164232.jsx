import React , {useEffect,useState}from 'react';
import MessageHeader from './MessageHeader/Message.Header.component';
import MessageContent from './MessageContent/MessageContent.component';
import MessageInput from './MessageInput/MessageInput.component';
import * as firebase from '../../server/firebase';
import {ref,onChildAdded, off} from "firebase/database";
import { connect } from 'react-redux';
import { Segment, Comment } from 'semantic-ui-react';
import "./Messages.css";
const Messages = (props) =>{

    const [messagesState, setMessagesState]= useState([]); // per mantenere la lista dei messaggi

    useEffect(()=> {
        if(props.channel)
        {
        setMessagesState([]);
        onChildAdded(ref(firebase.db, 'messages/'+props.channel.id), (snapshot) => {
            setMessagesState((currentState) => {
                let updatedState = [...currentState];
                console.log(snapshot.val());
                updatedState.push(snapshot.val());
                
                return updatedState;
            })    

        });
        // return()=> message.child(props.channel.id).off(); //stacco l'event listener
       
        return off(ref(firebase.db, 'messages/'+props.channel.id),onChildAdded);
        //off(onChildAdded(ref(firebase.db, 'messages/'+props.channel.id)));
    }
    }, [props.channel])


    const displayMessages = () => {
        if(messagesState.length>0){
            return messagesState.map((message) => { // estraggo i messaggi e li mando al component MessageContent
                //controllo anche se i messaggi appertongono all'utente logggato per impostare il giusto css
                return <MessageContent ownMessages={message.user.id === props.user.uid} key={message.timestamp} message={message}/>
            })
        }
    }


    return <div className='messages'><MessageHeader/>
    <Segment className='messageContent'>
        <Comment.Group>
          {displayMessages()}  
        </Comment.Group>
    </Segment>
    <MessageInput/></div>
}

const mapStateToProps =(state) => {
    return {
        channel : state.channel.currentChannel,
        user : state.user.currentUser
    }
}
/// restituiamo nel informazioni del canale come props al component Messages
export default connect(mapStateToProps)(Messages);