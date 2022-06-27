import React from 'react';
import { Comment } from 'semantic-ui-react';
import TimeAgo from 'javascript-time-ago';
import it from "javascript-time-ago/locale/it"

const MessageContent = (props) =>{
    return <Comment>
    <Comment.Avatar src={props.message.user.avatar}/>
    <Comment.Content>
        <Comment.Author>{props.message.user.name}</Comment.Author>
        <Comment.Metadata>{props.message.timestamp}</Comment.Metadata>
        <Comment.Text>{props.message.content}</Comment.Text>
    </Comment.Content>
    </Comment>
}

export default MessageContent;