import React from "react";
import { format } from "timeago.js";

import { 
    Message as MessageText,
    Time as TimeText,
    MessageContainer
} from "./message.styles";

const Message = ({ sender, message, time, userId }) => {
    const fromUser = sender === userId;
    return (
        <MessageContainer fromUser={fromUser} nestedScrollEnabled={true}>
            <MessageText selectable={true}>{message}</MessageText>
            <TimeText fromUser={fromUser}>{format(time)}</TimeText>
        </MessageContainer>
    );
};

export default Message;