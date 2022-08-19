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
                /*ogni volta che avrò un value change in messages riceverò uno snapshot.
                all'interno di messages ogni gruppo di messaggi relativi a un canale è identificato 
                da un id relativo a quello del canale e a sua volta ogni messaggio è identificato da un id */ 
                // prelevo l'id del canale perchè dato che in ogni snapshot le keys saranno proprio quelle dei canali
                let channelsId = Object.keys(messages);  //otterrò la lista dei canali
                // quindi andrò a fare un loop su questa lista per accedere ai messaggi di ogni canale
                let messagesTimeStamp = {}; // oggetto dove andrò a immagazzinare i timestamp di ogni messaggio
                channelsId.forEach((channelId) => {
                    let channelMessageKeys = Object.keys(messages[channelId]); //vado a prelevare le keys dei messaggi per un particolare canale 
                    // analizzo i messaggi partendo dalla loro chiave identificativa
                    channelMessageKeys.reduce((agg, item) => {
                        //controllo se esiste già quel messagio nella lista dei messaggi 
                        messagesTimeStamp[channelId] = [...messagesTimeStamp[channelId] || []];
                        messagesTimeStamp[channelId].push(messages[channelId][item].timestamp);
                    })
                })
                setMessagesTimeStampState(messagesTimeStamp);
            })
        }

    }, [props.user])

}