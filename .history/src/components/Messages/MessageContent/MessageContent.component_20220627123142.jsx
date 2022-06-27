import React from 'react';
import { Comment } from 'semantic-ui-react';

const MessageContent = (props) =>{
    return <Comment>
    <Comment.Avatar src={props.message.user.avatar}/>
    </Comment>
}

export default MessageContent;