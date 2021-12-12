import React from "react";
import styled from "styled-components/native";

import ConvoCard from "./cards.component";

const ConversationContainer = styled.View`
    margin: 14px;
    margin-top: 7px;
`;

const Conversations = ({ convos }) => {
    return (
        <ConversationContainer>
            {
                convos.map(({_id, members}) => 
                    <ConvoCard 
                        key={_id}
                        members={members}
                        convoId={_id}
                    />
                )
            }
        </ConversationContainer>
    );
};

export default Conversations;