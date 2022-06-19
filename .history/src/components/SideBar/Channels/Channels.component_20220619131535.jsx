import {React, useState} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu, Modal } from 'semantic-ui-react';

const Channels = (props) => {

    const [modalOpenState, setModalOpenState]= useState(false);
    const openModal = () => {
        setModalOpenState(true);
    }
    const closeModal = () => {
        setModalOpenState(false);
    }


    return <><Menu.Menu>
            <Menu.Item>
                <span>
                    <Icon name="exchange"/> Channels              
                </span>
                (0)
            </Menu.Item>
            <Menu.Item>
                <span>
                    <Icon name="add" onClick={openModal}/> ADD
                </span>
            </Menu.Item>
        </Menu.Menu>
        <Modal open={modalOpenState} onClose={closeModal}>
            <Modal.Header>

            </Modal.Header>
            <Modal.Content>
            <Form onSubmit={onSubmit}>
        <Segment stacked>
            <Form.Input
                name="email"
                value={userState.email}
                icon="mail"
                iconPosition="left"
                onChange={handleInput}
                type="email"
                placeholder="User Email"
            />
            <Form.Input
                name="password"
                value={userState.password}
                icon="lock"
                iconPosition="left"
                onChange={handleInput}
                type="password"
                placeholder="User Password"
            />
        </Segment>
        <Button disabled={isLoading} loading={isLoading}>Login</Button>
    </Form>
            </Modal.Content>
        </Modal>
    </>
}
//({props.channels.count})  (0)
export default connect()(Channels); //metto connect per avere accesso al redux store