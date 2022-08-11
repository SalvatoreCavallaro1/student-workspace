import React from "react";
import * as firebase from '../../../server/firebase';

export const Notification = (props) => {

    const MessagesRef = ref(firebase.db,"messages");
    const UsersRef = ref(firebase.db,"users");

}