import {React, useEffect,useState} from "react";
import * as firebase from '../../../server/firebase';
import {ref, onChildAdded,onValue, onChildRemoved,child,set,onDisconnect,remove,getDatabase,serverTimestamp} from "firebase/database";

export const Notification = (props) => {

    const messagesRef = ref(firebase.db,"messages");
    const usersRef = ref(firebase.db,"users");
    const [channelsVisitedState, setChannelsVisitedState] = useState({});

    useEffect(()=> {

        if(props.user){
            const dbRef = ref(getDatabase());
            onValue(child(child(dbRef, `users/${props.user.uid}`),"lastvisited"), (snap) => {



            })
        }

    }, [props.user])

}