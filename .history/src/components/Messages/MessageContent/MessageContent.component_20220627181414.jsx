import React from 'react';
import { Comment } from 'semantic-ui-react';
import TimeAgo from 'javascript-time-ago';
import it from "javascript-time-ago/locale/it"
import en from "javascript-time-ago/locale/en"


TimeAgo.addLocale(it);
TimeAgo.addLocale(en);

TimeAgo.setDefaultLocale('it');

const timeAgo= new TimeAgo();

const MessageContent = (props) =>{
    return <Comment>
    <Comment.Avatar src={props.message.user.avatar}/>
    <Comment.Content>
        <Comment.Author>{props.message.user.name}</Comment.Author>
        <Comment.Metadata>{timeAgo.format(props.message.timestamp)}</Comment.Metadata>
        <Comment.Text>{props.message.content}</Comment.Text>
    </Comment.Content>
    </Comment>
}

export default MessageContent;