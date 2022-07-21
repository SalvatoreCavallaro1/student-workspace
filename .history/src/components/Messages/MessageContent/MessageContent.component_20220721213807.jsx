import React from 'react';
import { Comment, Image, Icon } from 'semantic-ui-react';
import TimeAgo from 'javascript-time-ago';
import it from "javascript-time-ago/locale/it"
import en from "javascript-time-ago/locale/en"
import "./MessageContent.css";


TimeAgo.addLocale(it);
TimeAgo.addLocale(en);

TimeAgo.setDefaultLocale('it');

const timeAgo= new TimeAgo();

const MessageContent = (props) =>{
    console.log(props.message.attachment);
    return <Comment>
    <Comment.Avatar src={props.message.user.avatar}/>
    <Comment.Content className={props.ownMessages ? "ownMessages": null}>
        <Comment.Author>{props.message.user.name}</Comment.Author>
        <Comment.Metadata>{timeAgo.format(props.message.timestamp)}</Comment.Metadata>
        {props.message.attachment && props.message.extension!="pdf"  ? <Image src={props.message.attachment}/> :
            <Comment.Text>{props.message.content}</Comment.Text>
            
        }
       
    </Comment.Content>
    </Comment>
}

export default MessageContent;