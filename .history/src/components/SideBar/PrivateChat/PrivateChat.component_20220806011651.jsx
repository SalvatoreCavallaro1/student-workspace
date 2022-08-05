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
                user.isPrivatechat=true;
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
                                onClick={() => props.selectChannel(user)}
                                active={props.channel && user.id === props.channel.id}
                                >
                                </Menu.Item>
                    })                        
        
        }
    
        
    }

    /*const onSubmit = () => {
        if (!checkIfFormValid()) {
            return;
            //da settare gli errori come fatto per i form di login e registrazione
        }



        

        //const key = channelsRef.push().key; 

       
        //generò un riferimento alla location,aggiungo i dati con la funzione push() e generò e ottengo una key unica
        const newChannelKey = push(child(ref(firebase.db), 'channels')).key;

        


        const channel = {
            id:newChannelKey,
            name : channelAddState.name,
            description : channelAddState.description,
            years : channelAddState.years,
            corso : channelAddState.corso,
            created_by : {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }

        setIsLoading(true);
        // Scrivo i dati del nuovo canale sul realtime database.
        const updates = {};
        updates['channels/' + newChannelKey] = channel;
        update(ref(firebase.db), updates)
        .then(() =>
        {
            setchannelAddState({name: '', description: ''}) // pulizia dei dati
            //console.log('saved');
            setIsLoading(false);
            closeModal();
        })
        .catch ((error) => {
            console.log(error);
        })

    }


    
    const handleInput = (event) => {
        let target =event.target //cioè l'elemento con cui l'utente sta interagendo
        setchannelAddState((currentState) => {
            let updatedState ={...currentState}  //usando questo thread operator vado a creare un clone di currentState 
            updatedState[target.name] = target.value;
            return updatedState;
        })
    }

    */

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