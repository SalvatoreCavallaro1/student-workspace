import {React, useState} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu, Modal } from 'semantic-ui-react';

const Channels = (props) => {

    const [modalOpenState, setModalOpenState]= useState(false);

    return <Menu.Menu>
        <Menu.Item>
            <span>
                <Icon name="exchange"/> Channels              
            </span>
            (0)
        </Menu.Item>
        <Menu.Item>
            <span>
                <Icon name="add"/> ADD
            </span>
        </Menu.Item>
    </Menu.Menu>
    <Modal>

    </Modal>
}
//({props.channels.count})  (0)
export default connect()(Channels); //metto connect per avere accesso al redux store