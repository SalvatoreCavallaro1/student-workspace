import {React, useEffect,useState} from "react";
import * as firebase from '../../../server/firebase';
import {ref, onChildAdded,onValue, onChildRemoved,child,set,onDisconnect,remove,getDatabase,serverTimestamp} from "firebase/database";
import Label from "semantic-ui-react/dist/commonjs/elements/Label";

export const Notification = (props) => {

    const messagesRef = ref(firebase.db,"messages");
    const usersRef = ref(firebase.db,"users");
    const [channelsVisitedState, setChannelsVisitedState] = useState({}); //avrò qui le informazioni su tutti i canali e su l'ultima volta he ho visitato il canale
    const [messagesTimeStampState, setMessagesTimeStampState] = useState({});
    useEffect(()=> {

        if(props.user){
            const dbRef = ref(getDatabase());
            onValue(child(child(dbRef, `users/${props.user.uid}`),"lastvisited"), (snap) => {
                setChannelsVisitedState(snap.val());
            })
            onValue(messagesRef, (snap) => {
                let messages = snap.val();
                
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
                        // se esiste uso lo spread operator altrimenti creo un nuovo array
                        messagesTimeStamp[channelId] = [...messagesTimeStamp[channelId] || []];
                        // quindi se c'è già un valore relativo al timestamp uso lo spread operator e creo un clone altrimenti creo un nuovo array vuoto
                        // aggiungo quindi il nuovo valore all'array
                        messagesTimeStamp[channelId].push(messages[channelId][item].timestamp); //item corrisponde all'id del messaggio [idcnale][idmessaggio].timestampRelativoAlMessaggio

                    })
                })
                setMessagesTimeStampState(messagesTimeStamp);// qui avrò i il canale con tutti i timestamp dei messaggi
            })
        }

    }, [props.user]);

    const calculateNotificationCount = (channelId) => {

        if (channelsVisitedState && messagesTimeStampState && props.channel && props.channel.id !== channelId) { //se l'utente in quel momento è sullo stesso canale dove arrivano nuovi messaggi non mostro la notifica

            let lastVisited = channelsVisitedState[channelId]; //ultima volta che l'utente ha visitato il canale per il canalke identificato da channelId

            let channelMessagesTimeStamp = messagesTimeStampState[channelId]; // lista dei timestamp dei messaggi per il canale identificato da channelId

            if (channelMessagesTimeStamp) { //se il timestamp  è presente vado a filtrare tutti i messaggi arrivati dopo che l'utente ha visitato per l'ultima volta il canale
                // se lastVisited è undefined significa che l'utente non ha mai visitato quel particolare canale
                let notificationCount = channelMessagesTimeStamp.filter(timestamp => !lastVisited || lastVisited < timestamp).length;
                // se il count delle notifiche è 0 ritorno null altrimenti mostro la otifica tramite il component label di semantic ui 
                return notificationCount === 0 ? null : <Label color="red">{notificationCount}</Label>
            }
        }
        // se il timestamp non è presente ritorno null in ogni caso
        return null;
    }
    return <> {props.displayName}{calculateNotificationCount(props.notificationChannelId)} </>;
}