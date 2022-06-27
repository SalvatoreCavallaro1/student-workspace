import React , {useEffect}from 'react';
import MessageHeader from './MessageHeader/Message.Header.component';
import MessageContent from './MessageContent/MessageContent.component';
import MessageInput from './MessageInput/MessageInput.component';
import * as firebase from '../../../server/firebase';
import {ref,onChildAdded} from "firebase/database";
import { connect } from 'react-redux';
const Messages = () =>{


    useEffect(()=> {

        onChildAdded(ref(firebase.db, 'messages/'+props.channel.id), (snapshot) => {
            //console.log(snapshot.val());
            

          });
    })

    return <div><MessageHeader/>
    <MessageInput/></div>
}

const mapStateToProps =(state) => {
    return {
        channel : state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(Messages);