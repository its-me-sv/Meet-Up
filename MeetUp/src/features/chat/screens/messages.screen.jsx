import React, { useState, useEffect } from "react";
import { ScrollView, TextInput, View } from "react-native";
import axios from "axios";
import styled from "styled-components/native";
import {Feather} from "@expo/vector-icons";

import Loader from "../../../components/loader/loader.component";
import Message from "../components/message.component";
import Spacer from "../../../components/spacer/spacer.component";

const MessageSender = styled(TextInput)`
    z-index: 999;
    border-radius: 21px;
    font-size: 18px;
    width: 80%;
    background-color: #ffffff;
    padding: 7px;
    border-color: #575656;
    border-width: 2px;
    width: 84%;
    align-self: center;
    max-height: 168px;
`;

const FooterMessageInput = styled(View)`
    flex-direction: row;
    align-items: center;
    margin: 7px;
`;

const MessagesScreen = ({ navigation, route }) => {
    const { person, convoId, userId} = route.params;
    navigation.setOptions({ title: person.username });
    const [messages, setMessages] = useState(null);
    useEffect(() => {
        axios.get(`http://192.168.29.97:5000/message/${convoId}`)
        .then(({ data }) => setMessages(data))
        .catch(console.log);
    }, []);
    if (messages === null) return <Loader />;
    return (
        <>
            <ScrollView nestedScrollEnabled={true}>
                {
                    messages.map(({_id, sender, text, createdAt}) => (
                        <Message 
                            key={_id}
                            sender={sender}
                            message={text}
                            time={createdAt}
                            userId={userId}
                        />
                    ))
                }
            </ScrollView>
            <FooterMessageInput>
                <MessageSender
                    placeholder="Message..."
                    multiline={true}
                />
                <Spacer position="left"/>
                <Feather 
                    name="send"
                    size={42}
                    color="#575656"
                />
            </FooterMessageInput>
        </>
    );
};

export default MessagesScreen;