import {React, useState, useEffect} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu, Modal, Form, Button, Segment } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref, push, update, child, onChildAdded} from "firebase/database";

const Channels = (props) => {

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
                
            })

          });
           
         // ogni volta che un figlio alla lista dei canali viene aggiunto o questo
        //pezzo di codice viene eseguito per la prima volta, quest'evento verrà triggerato
        //e restituisce un oggetto chiamato snapshot che sarà in grado di leggere i valori dal documento

    },[]) //la lista delle dependency la setto ome un oggetto vuoto in modo che il codice venga eseguito soltanto una volta

   
    const openModal = () => {
        setModalOpenState(true);
    }
    const closeModal = () => {
        setModalOpenState(false);
    }

    const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description;
    }
    const onSubmit = () => {
        if (!checkIfFormValid()) {
            return;
            //da settare gli errori come fatto per i form di login e registrazione
        }



        

        //const key = channelsRef.push().key; 

        // Generate a reference to a new location and add some data using push()
        //const newPostRef = push(channelsRef);
        const newChannelKey = push(child(ref(firebase.db), 'channels')).key;

        // Get the unique key generated by push()
        //const key = newChannelRef.key;


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

        /*channelsRef.child(key)
        .update(channel)
        .then(() =>
        {
            setchannelAddState({name: '', description: ''}) // pulizia dei dati
            console.log('saved');
        })
        .catch ((error) => {
            console.log(error);
        })*/
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
                (0)
            </Menu.Item>
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
//({props.channels.count})  (0)


// prendo da redux store le inforazioni dell'utente loggato per inserire le informazioni di chi ha creato il canale
const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Channels); //metto connect per avere accesso al redux store