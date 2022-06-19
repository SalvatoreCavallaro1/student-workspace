import {React} from 'react';
import "./Channels.css";
import { connect } from 'react-redux';

const Channels = () => {
    return <div>Channel Component</div>
}

export default connect()(Channels); //metto connect per avere accesso al redux store