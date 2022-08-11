import {React, useEffect,useState} from "react";
import * as firebase from '../../../server/firebase';

export const Notification = (props) => {

    const messagesRef = ref(firebase.db,"messages");
    const usersRef = ref(firebase.db,"users");

}