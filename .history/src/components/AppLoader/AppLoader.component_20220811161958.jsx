import React from "react";
import "./AppLoader.css";
import { Dimmer } from 'semantic-ui-react';

export const AppLoader = (props) => {

    return (<Dimmer active={props.loading}>

    </Dimmer>)
}