import {React, useEffect,useState} from "react";
import * as firebase from '../../../server/firebase';
import {ref, onChildAdded,onValue, onChildRemoved,child,set,onDisconnect,remove,getDatabase,serverTimestamp} from "firebase/database";

export const Notification = (props) => {

    const messagesRef = ref(firebase.db,"messages");
    const usersRef = ref(firebase.db,"users");
    const [channelsVisitedState, setChannelsVisitedState] = useState({}); //avrò qui le informazioni su tutti i canali e su l'ultima volta he ho visitato il canale

    useEffect(()=> {

        if(props.user){
            const dbRef = ref(getDatabase());
            onValue(child(child(dbRef, `users/${props.user.uid}`),"lastvisited"), (snap) => {
                setChannelsVisitedState(snap.val());
            })
            onValue(messagesRef, (snap) => {
                let messages = snap.val();
                //COMMENTARE TUTTO DAL MIN 8:55 DEL VIDEO IN POI
                let channelsId = Object.keys(messages);
                //let messagesTimeStamp = {};
                channelsId.forEach((channelId) => {
                    let channelMessageKeys = Object.keys(messages[channelId]);
                    channelMessageKeys.reduce((agg, item) => {
                        messagesTimeStamp[channelId] = [...messagesTimeStamp[channelId] || []];
                        messagesTimeStamp[channelId].push(messages[channelId][item].timestamp);
                    })
                })
                setMessagesTimeStampState(messagesTimeStamp);
            })
        }

    }, [props.user])

}