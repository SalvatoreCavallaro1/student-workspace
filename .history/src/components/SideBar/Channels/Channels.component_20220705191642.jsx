import {React, useState, useEffect} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu, Modal, Form, Button, Segment } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref, push, update, child, onChildAdded,getDatabase,get} from "firebase/database";
import { setChannel } from '../../../store/actioncreator';

const Channels = (props) => {
    
    const [userState, setUserState]= useState([]);
    let TheUser=[];

    
    const [modalOpenState, setModalOpenState]= useState(false);
    const [channelAddState, setchannelAddState]= useState({name: '', description: ''});
    const [isLoading, setIsLoading]= useState(false); //stato per gestire l'icona di caricamento
    //stato per mantenere tutti i canali presenti
    const [ChannelsState, setChannelsState]= useState([]);


    const channelsRef= ref(firebase.db, 'channels');
    //console.log();
    

    // Attach an asynchronous callback to read the data at our posts reference
    


    //useEffect serve a eseguire questo pezzo di codice quando il codice viene renderizzato
    useEffect(() => {

        onChildAdded(channelsRef, (snapshot) => {
            //console.log(snapshot.val());
            setChannelsState((currentState) => {
                let updatedState = [...currentState];
                updatedState.push(snapshot.val());  
                return updatedState;
            })

            });
               
            // ogni volta che un figlio alla lista dei canali viene aggiunto o questo
            //pezzo di codice viene eseguito per la prima volta, quest'evento verrà triggerato
            //e restituisce un oggetto chiamato snapshot che sarà in grado di leggere i valori dal documento

            //return() => channelsRef.off(); //rimuovo l'event listener che è in ascolto quando viene aggiunto un nuovo canale 
            //una volta che questo component viene unmounted


            

        

    },[]) //la lista delle dependency la setto ome un oggetto vuoto in modo che il codice venga eseguito soltanto una volta


    // SELEZIONE PRIMO CANALE
    /*
    useEffect(() => {
        //imposto selezionato il primo canale di default
        if(ChannelsState.length > 0){
            console.log(ChannelsState);
            props.selectChannel(ChannelsState[0])
        }
    },[!props.channel ?ChannelsState : null]) // se non ho selezionato alcun canale avrò una dependency su updatedState se invece è già settato non avrò dependency
*/
    useEffect(()=>{
        if(props.user)
            {   //console.log(props.user.uid);
                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${props.user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    //console.log(snapshot.val());  
                   /* setUserState((currentState) => {
                        let updatedState = [...currentState];
                        updatedState.push(snapshot.val());
                        console.log(updatedState);
                        return updatedState;
                    })*/
                    TheUser.push(snapshot.val());
                    console.log(TheUser);
                    //console.log(userState[0].years);
                } else {
                    console.log("No data available");
                }
                }).catch((error) => {
                console.error(error);
                });
            } 

            

        
    },[props])


    /*const SetTheUser = () => {
        if(props.user)
            {   //console.log(props.user.uid);
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
   
    const openModal = () => {
        setModalOpenState(true);
    }
    const closeModal = () => {
        setModalOpenState(false);
    }

    const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description;
    }

    /*const CheckUser = () => {

        SetTheUser();
        if(userState.length>0){
            
            return userState.map((Cuser) => { // estraggo i messaggi e li mando al component MessageContent
               //controllo anche se i messaggi appertongono all'utente logggato per impostare il giusto css
              // return <MessageContent ownMessages={message.user.id === props.user.uid} key={message.timestamp} message={message}/>
              //console.log(Cuser);
              //return <Channels CourseChannels={Cuser.displayName === props.user.displayName} CuserCourse={Cuser.corso} CuserYear={Cuser.years}/>

              //const CuserCourse= Cuser.corso;
              //const CuserYear=Cuser.years;
              //console.log(CuserCourse);
              //console.log(CuserYear);
              return [Cuser.corso, Cuser.years];
           })
       }

       

    }*/


    //const Cuser=CheckUser();
        
        
    
        

    
    const displayChannels = () => {
        //
             
             //console.log(Cuser);
            // console.log(userState[0].corso);
            // console.log(userState[0].years);
        if(ChannelsState.length > 0){                                  
            
                       //console.log(userState);
                        return ChannelsState.map((channel) => {
                          
                            if(userState)
                            {    
                                
                                //console.log(Cuser[0].at(0));
                                //if(channel.corso==Cuser[0].at(0) && channel.years==Cuser[0].at(1)){
                                    //if(channel.corso==userState[0].corso && channel.years==userState[0].years){
                                return <Menu.Item
                                    key={channel.id}
                                    name={channel.name}
                                    onClick={() => props.selectChannel(channel)}
                                    active={props.channel && channel.id === props.channel.id}
                                >
                                </Menu.Item>
                               // }
                            }

                        })
        
        
        
        }
        
    }

    const onSubmit = () => {
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


    return <><Menu.Menu>
            <Menu.Item>
                <span>
                    <Icon name="exchange"/> Channels              
                </span>
                ({ChannelsState.length})
            </Menu.Item>
            {displayChannels()}
            <Menu.Item>
                <span className='clickable'   onClick={openModal}>
                    <Icon name="add"/> ADD
                </span>
            </Menu.Item>
        </Menu.Menu>
        <Modal open={modalOpenState} onClose={closeModal}>
            <Modal.Header>
                Create Channel
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="name"
                            value={channelAddState.name}
                            onChange={handleInput}
                            type="text"
                            placeholder="Inserisci il nome del canale"
                        />
                        <Form.Input
                            name="description"
                            value={channelAddState.description}
                            onChange={handleInput}
                            type="text"
                            placeholder="Inserisci la descrizione del canale"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button loading={isLoading} onClick={onSubmit}>
                    <Icon name="checkmark"/> Save
                </Button>
                <Button onClick={closeModal}>
                    <Icon name="remove"/> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    </>
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

export default connect(mapStateToProps,mapDispatchToProps)(Channels); //metto connect per avere accesso al redux store