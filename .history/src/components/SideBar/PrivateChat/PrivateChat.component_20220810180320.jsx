import {React, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Icon, Menu} from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref, onChildAdded,onValue, onChildRemoved,child} from "firebase/database";
import { setChannel } from '../../../store/actioncreator';

const PrivateChat = (props) => {
    
   
    const [userState, setUserState]= useState([]);

    const [connectedUserState, setConnectedUsersState]=useState([]);

    //stato per mantenere tutti i canali presenti
    const [usersState, setUsersState]= useState([]);
  
    const usersRef= ref(firebase.db, 'users');
    const connectedRef= ref (firebase.db, '.info/connected') //riferimento all'utente connesso, in questo percroso firebase conserva i dati relativi agli utenti online
    //se l'utente è connesso sarà settato il valore su true
    
    const statusRef = ref(firebase.db, 'status');

    //useEffect serve a eseguire questo pezzo di codice quando il codice viene renderizzato
    useEffect(() => {

        onChildAdded(usersRef, (snapshot) => {
            //console.log(snapshot.val());
            setUserState((currentState) => {
                let updatedState = [...currentState];

                let user=snapshot.val();
                user.name=user.displayName;
                user.id=snapshot.key;
                user.isPrivateChat = true;
                updatedState.push(user);  
                return updatedState;
            })

            });
            

         

    },[]) //la lista delle dependency la lascio vuota così il codice viene eseguito soltanto una volta 




    useEffect(() => {
        onValue(connectedRef, (snap) => {
            if(props.user && snap.val()){
                // se l'utente è loggato e quindi è online, uso lo status ref per salvare le informazioni dell'utente
                const userStatusRef = child(statusRef, props.user.uid);
                
                
                //const userStatusRef = push(child(ref(firebase.db), 'channels')).key;


                //const userStatusRef= statusRef.child(props.user.uid); //ORIGINAL


                set(userStatusRef,true);

                //userStatusRef.set(true); ORIGINAL
                // ogni volta che  l'utente viene loggato le informazioni vengono aggiunte allo userstatus ref e ogni volta che l'utente si disconnette
                //rimuovo le informazioni relative all'utente che si è disconnesso
                userStatusRef.onDisconnect().remove();
            }

        })


          /* connectedRef.on("value",snap => {
                if(props.user && snap.val()){
                    // se l'utente è loggato e quindi è online, uso lo status ref per salvare le informazioni dell'utente
                    const userStatusRef= statusRef.child(props.user.uid);
                    userStatusRef.set(true);
                    // ogni volta che  l'utente viene loggato le informazioni vengono aggiunte allo userstatus ref e ogni volta che l'utente si disconnette
                    //rimuovo le informazioni relative all'utente che si è disconnesso
                    userStatusRef.onDisconnect().remove();
                }
            })

            return ()=> {connectedRef.off();}*/
    },[props.user]) //la lista delle su user così ogni volta che l'utente cambia questo codice viene eseguito


    // ogni volta che un particolare client si connette a firebase i dati vengono scrtti in statusRef 
    //quindi ogni volta che un child viene aggiunto a statusRef significa che un utente si è collegato 
    useEffect(() => {

        onChildAdded(statusRef, (snap) => {
            setConnectedUsersState((currentState) => {
                let updatedState =[...currentState];
                updatedState.push(snap.key);
                return updatedState;
            })
        })

        //dobbiamo anche controllare quando l'utente si disconnette

        onChildRemoved(statusRef, (snap) => {
            setConnectedUsersState((currentState) => {
                let updatedState =[...currentState];
                //trovo l'indice dell'utente che si è disconnesso
                let index= updatedState.indexOf(snap.key);
                updatedState.splice(index,1); //rimuovo con la funzione splice l'utente disconnesso di cui ho trovato l'indice
                return updatedState;
            })
        })



    },userState); // ogni volta che userState cambia questo pezzo di codice viene eseguito
    
    const displayUsers = () => {
      
        if(userState.length > 0){                               
          // console.log(connectedRef);
                    return userState.filter((user)=> user.id !== props.user.uid).map((user) => {  //filtro fra tutti gli utenti solo quelli loggati
                        return <Menu.Item
                                key={user.id}
                                name={user.name}
                                onClick={() => selectUser(user)}
                                active={props.channel && generateChannelId(user.id) === props.channel.id}
                                >
                                {"@" + user.name}
                                </Menu.Item>
                    })                        
        
        }
    
        
    }

    const selectUser = (user) => {
        // clono l'oggeto user esistente su una variabile temporanea
        let userTemp = {...user};
        userTemp.id=generateChannelId(user.id);
        props.selectChannel(userTemp)
    }

    //genero dinamicamente un id che identifica il canale basandosi su l'utete loggato e l'utente con cui l'utente loggato sta chattando
    const generateChannelId = (userId) => {
        if(props.user.uid < userId){
            return props.user.uid + userId;
        }
        else {
            return userId + props.user.uid
        };
    }
    // così facendo se l'utente loggato è l'utente a e chatta con l'utente b e se lutente loggato è l'utente b e chatta con l'utente a 
    // l'id del canale sartà uguale in entrambi i casi


    return <Menu.Menu style={{marginTop: '35px'}}>
               
        <Menu.Item style={{fontSize: '17px'}}>
            <span>
                <Icon name="mail"/> Chat             
            </span>
            ({userState.length - 1})
        </Menu.Item>

        {displayUsers()}

        </Menu.Menu>


   


}



// prendo da redux store le inforazioni dell'utente loggato per inserire le informazioni di chi ha creato il canale
const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectChannel: (channel) => dispatch(setChannel(channel))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PrivateChat); //metto connect per avere accesso al redux store