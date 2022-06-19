import React from "react";
import { Menu } from "semantic-ui-react"; //elemento menu di semantic ui react da cui creo la sidebar
import "./SideBar.css"
import UserInfo from "./UserInfo/UserInfo.component"
import Channels from "./Channels/Channels.component"

export const SideBar = () => {

    return (
        <Menu vertical fixed="left" borderless size="large" className="side_bar">
            <UserInfo/>
        </Menu>

    )

}