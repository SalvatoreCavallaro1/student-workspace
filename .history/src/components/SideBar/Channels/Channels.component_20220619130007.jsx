import {React} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';

const Channels = (props) => {
    return <Menu.Menu>
        <Menu.Item>
            <span>
                <Icon name="exchange"/> Channels              
            </span>
            ({props.channels.count})
        </Menu.Item>
    </Menu.Menu>
}

export default connect()(Channels); //metto connect per avere accesso al redux store