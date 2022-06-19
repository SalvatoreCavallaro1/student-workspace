import {React, useState} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu, Modal, Form, Button, Segment } from 'semantic-ui-react';

const Channels = (props) => {

    const [modalOpenState, setModalOpenState]= useState(false);
    const [channelAddState, setchannelAddState]= useState({});
    const openModal = () => {
        setModalOpenState(true);
    }
    const closeModal = () => {
        setModalOpenState(false);
    }
    const onSubmit = () => {

    }
    const handleInput = (event) => {
        setchannelAddState((currentState) => {
            let state ={...currentState}
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
                            name="Name"
                            value={channelAddState.Name}
                            onChange={handleInput}
                            type="text"
                            placeholder="Inserisci il nome del canale"
                        />
                        <Form.Input
                            name="Description"
                            value={channelAddState.Description}
                            onChange={handleInput}
                            type="text"
                            placeholder="Inserisci la descrizione del canale"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button>
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
export default connect()(Channels); //metto connect per avere accesso al redux store