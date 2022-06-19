import {React, useState} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu, Modal, Form, Button, Segment } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref, push, update} from "firebase/database";

const Channels = (props) => {

    const [modalOpenState, setModalOpenState]= useState(false);
    const [channelAddState, setchannelAddState]= useState({name: '', description: ''});

    const channelsRef= ref(firebase.db, 'channels/')
    //console.log(channelAddState);
    //console.log(channelsRef);
   
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
        const newChannelKey = push(child(channelsRef)).key;

        // Get the unique key generated by push()
        //const key = newChannelRef.key;


        const channel = {
            id:key,
            name : channelAddState.name,
            description : channelAddState.description,
            created_by : {
                name: props.user.displayName,
                avatar: props.user.phoyoURL
            }
        }


        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/channels/' + newChannelKey] = channel;
        update(channelsRef, updates).then(() =>
        {
            setchannelAddState({name: '', description: ''}) // pulizia dei dati
            console.log('saved');
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
                <span onClick={openModal}>
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
                <Button onClick={onSubmit}>
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