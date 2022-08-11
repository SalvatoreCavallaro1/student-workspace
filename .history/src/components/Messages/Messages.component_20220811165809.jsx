import React , {useEffect,useState,useRef}from 'react';
import MessageHeader from './MessageHeader/Message.Header.component';
import MessageContent from './MessageContent/MessageContent.component';
import MessageInput from './MessageInput/MessageInput.component';
import * as firebase from '../../server/firebase';
import {ref,onChildAdded, off,child,remove} from "firebase/database";
import { connect } from 'react-redux';
import { Segment, Comment } from 'semantic-ui-react';
import "./Messages.css";
const Messages = (props) =>{

    const [messagesState, setMessagesState]= useState([]); // per mantenere la lista dei messaggi
    const [searchTermState, setsearchTermState]= useState("");

   // uso la hook useRef
    let divRef = useRef();
    useEffect(()=> {
        if(props.channel)
        {
            setMessagesState([]); //ogni volta che cambio canale faccio il clean dei messaggi
            
           // console.log(ref(firebase.db, 'messages/'+props.channel.id));
            onChildAdded(ref(firebase.db, 'messages/'+props.channel.id), (snapshot) => {
                setMessagesState((currentState) => {
                    let updatedState = [...currentState];
                        updatedState.push(snapshot.val());  
                        // console.log(updatedState);
                        return updatedState;
                        //updatedState.push(snapshot.val());
                        //return updatedState;
                })
            });

            //return off(onChildAdded(ref(firebase.db, 'messages/'+props.channel.id)));
           // return()=> ref(firebase.db, 'messages/'+props.channel.id).child(props.channel.id).off(); //stacco l'event listener
            //return()=> off(child(props.channel.id)); //stacco l'event listener
            //return off(ref(firebase.db, 'messages/'+props.channel.id),onChildAdded);
            //off(onChildAdded(ref(firebase.db, 'messages/'+props.channel.id)));
        }
    }, [props.channel])


    useEffect (()=> {


        //uso la funzione scrollIntoView cioè se l'elemento in particolare non è nella view dell'utente scrolerà in automatico all'elemento i questione
        divRef.scrollIntoView({behavior : 'smooth'}); // imnposto il behavior smooth dello scroll per avere una transizione più smooth

    }, [messagesState])

    const displayMessages = () => {
        
        if(props.user)
        {
            let messagesToDisplay = searchTermState ? filterMessagebySearchTerm() : messagesState;

            if(messagesToDisplay.length>0){
            
            


                function filterArray(inputArr){
                    var found ={};
                    var out = inputArr.filter(function(element){
                        //console.log(element);
                        return found.hasOwnProperty(element.timestamp)? false : (found[element.timestamp]=true);
                    });
                //console.log(found);
                    return out;
                }
                
                const outputArray = filterArray(messagesToDisplay);
                //console.log("Array Originale",messagesState);
                //console.log("Arrai filtrato",outputArray);


                return outputArray.map((message) => { // estraggo i messaggi e li mando al component MessageContent
                    //controllo anche se i messaggi appertongono all'utente logggato per impostare il giusto css
                    return <MessageContent ownMessages={message.user.id === props.user.uid} key={message.timestamp} message={message}/>
                })

                
            }    
        }
    }


    const imageLoaded = () => {

        //con questa funzione faccio in modo che l'immagine sia anche nella user view
        divRef.scrollIntoView({behavior : 'smooth'});

    }
    const uniqueUsersCount = () => {

        // scorro tutti i messaggi del canale 
        const uniqueUsers = messagesState.reduce((accumulatore,message) =>{
            if(!accumulatore.includes(message.user.name)){
                accumulatore.push(message.user.name);
            }
            return accumulatore;
        },[]); // di default l'accumulatore è un array vuoto

        return uniqueUsers.length; // dal numero di uniqueUsers ricavo il numero di utenti attivi nel canale
    }

    //props.channel?.name aggiungo il null check con il punto inteorrogativo così prima che il component venga caricato non da errore

    const searchTermChange = (event) => {
        const target=event.target;
        setsearchTermState(target.value);
    }

    const filterMessagebySearchTerm = () => {
        const regex=new RegExp(searchTermState,"gi") // g--> global, i--> ignore case //cioè cercare l'intera stringa seza considerare maiuscole e minuscole
        const messages = messagesState.reduce((accumulatore,message) =>{
            if((message.content && message.content.match(regex)) || message.user.name.match(regex) ) // effettuo la ricerca sia per il contentuto dei messaggi sia per il nome utente
            {
                accumulatore.push(message);
            }
            return accumulatore;
        },[]);

        return messages;
    }


    // <div ref={currentElement => divRef = currentElement }></div> così facendo il divRef avrà accesso  a al con current element

    return <div className='messages'><MessageHeader isPrivateChat={props.channel?.isPrivateChat}  searchTermChange={searchTermChange} channelName={props.channel?.name} uniqueUsers={uniqueUsersCount()}/>  
    <Segment className='messageContent'>
        <Comment.Group>
          {displayMessages()}  
          <div ref={currentElement => divRef = currentElement }></div> 
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
/// restituisco le informazioni del canale come props al component Messages
export default connect(mapStateToProps)(Messages);