import {React, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Icon, Menu} from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref, push, update, child, onChildAdded,getDatabase,get} from "firebase/database";
import { setChannel } from '../../../store/actioncreator';

const PrivateChat = (props) => {
    
    const adminMail="admin@gmail.com";
    var newArray=[];
    const [userState, setUserState]= useState([]);
   

    
   // const [modalOpenState, setModalOpenState]= useState(false);
   // const [channelAddState, setchannelAddState]= useState({name: '', description: ''});
    //const [isLoading, setIsLoading]= useState(false); //stato per gestire l'icona di caricamento
    //stato per mantenere tutti i canali presenti
    const [usersState, setUsersState]= useState([]);
   // const [ChannelsStateFilt, setChannelsStateFilt]= useState([]);

    const usersRef= ref(firebase.db, 'users');
    //console.log();
    

    
    


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



    /*const SetTheUser = () => {
        if(props.user)
            {   
                
                //console.log(props.user.uid);
                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${props.user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    //console.log(snapshot.val());  
                    setUserState((currentState) => {
                        let updatedState = [...currentState];
                        updatedState.push(snapshot.val());
                       // console.log(updatedState);
                        return updatedState;
                    })
                  
                } else {
                    console.log("No data available");
                }
                }).catch((error) => {
                console.error(error);
                });
            } 

    }*/

     
   
    /*const openModal = () => {
        setModalOpenState(true);
    }
    const closeModal = () => {
        setModalOpenState(false);
    }*/

    /*const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description && channelAddState.years && channelAddState.corso;
    }*/

        
    /*const newArraylenght = () => {
         
         if(userState.length<1)
         {
             SetTheUser();
         }
        
         if (userState.length>1)
         {
             
          userState.pop();
             
         }
        
         if(ChannelsState.length > 0){                                  
 
            if(userState.length>=1 )
            {
                
                
                newArray = ChannelsState.filter((item) => item.corso === userState[0].corso && item.years === userState[0].years);
            
            }
        
            return newArray.map((channel) => {
                        
                            if(userState.length>=1 && channel.corso==userState[0].corso && channel.years==userState[0].years)
                            {
                                //console.log(channel);
                            }
            })
                                    
        }       
     
    }*/
    
        

    
    const displayUsers = () => {
       // SetTheUser();
       
     /*   if(userState.length<1)
        {
            SetTheUser();
        }
        //console.log(userState[0]);
       /* if(userState.length>=1)
        {
            //console.log(userState[0].corso);
           //console.log(userState[0].years);
        }*/
      /*  if (userState.length>1)
        {
            
         userState.pop();
            
        }*/
       

        //console.log(userState.length);
       // console.log(userState);
        
      
        
        //console.log(year);
             //console.log(Cuser);
            // console.log(userState[0].corso);
            // console.log(userState[0].years);
        if(userState.length > 0){                               

                    return userState.filter((user)=> user.id !== props.user.uid).map((user) => {  //filtro fra tutti gli utenti solo quelli loggati
                        return <Menu.Item
                                key={user.id}
                                name={user.name}
                                onClick={() => selectUser(user)}
                                active={props.channel && user.id === props.channel.id}
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
        props.selectChannel(user)
    }

    //genero dinamicamente un id che identifica il canale basandosi su l'utete loggato e l'utente con cui l'utente loggato sta chattando
    const generateChannelId = (userId) => {
        if(props.user.uid < userId){
            return props.user.uid + userId;
        }
        else userId + props.user.uid;
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


    //{SetTheUser()}
   /* if(props.user)
    {
        if (props.user.email===adminMail)
        { //({ChannelsState.length})
            return <Menu.Menu>
               
                <Menu.Item>
                    <span>
                        <Icon name="exchange"/> Canali esistenti              
                    </span>
                    
                </Menu.Item>
                
                {displayUsers()}
                
            </Menu.Menu>
            
        


        }
        else 
        {

           // newArraylenght(); ({newArray.length})
            return <><Menu.Menu>    
                <Menu.Item>
                    <span>
                        <Icon name="exchange"/> Canali              
                    </span>
                    
                </Menu.Item>    
                {displayUsers()}   
                </Menu.Menu>
        </>

        }
    }*/

   


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