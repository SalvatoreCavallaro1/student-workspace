import {React, useState} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu, Modal, Form, Button, Segment } from 'semantic-ui-react';
import * as firebase from '../../../server/firebase';
import {ref, set} from "firebase/database";

const Channels = (props) => {

    const [modalOpenState, setModalOpenState]= useState(false);
    const [channelAddState, setchannelAddState]= useState({name: '', description: ''});

    const channelsRef= ref(firebase.db, 'channels/')
    //console.log(channelAddState);
    const openModal = () => {
        setModalOpenState(true);
    }
    const closeModal = () => {
        setModalOpenState(false);
    }
    const onSubmit = () => {
        const key = channelsRef.push().key; //key unica per ogni canale

        const channel = {
            id:key,
            name : channelAddState.name,
            description : channelAddState.description,
            created_by : {
                name:
            }
        }

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