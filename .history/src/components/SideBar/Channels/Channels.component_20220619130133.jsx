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
            (0)
        </Menu.Item>
        <Menu.Item>
            <span>
                <Icon name="add"/> ADD
            </span>
        </Menu.Item>
    </Menu.Menu>
}
//({props.channels.count})  (0)
export default connect()(Channels); //metto connect per avere accesso al redux store