import {React, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Icon, Menu} from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref, onChildAdded,} from "firebase/database";
import { setChannel } from '../../../store/actioncreator';

const PrivateChat = (props) => {
    
   
    const [userState, setUserState]= useState([]);
   

    
   
    //stato per mantenere tutti i canali presenti
    const [usersState, setUsersState]= useState([]);
  

    const usersRef= ref(firebase.db, 'users');
    const connectedRef= ref (firebase.db, '.info/connected') //riferimento all'utente connesso, in questo percroso firebase conserva i dati relativi agli utenti online
    //se l'utente è connesso sarà settato il valore su true
    

    
    


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
               
            


            

        

    },[]) //la lista delle dependency la setto ome un oggetto vuoto in modo che il codice venga eseguito soltanto una volta

    
    const displayUsers = () => {
      
        if(userState.length > 0){                               
           console.log(connectedRef);
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