import React, { useState, useEffect } from "react";
import { ScrollView, TextInput } from "react-native";
import axios from "axios";
import { Searchbar } from 'react-native-paper';
import styled from "styled-components/native";

import Loader from "../../../components/loader/loader.component";
import Message from "../components/message.component";

const MessageSender = styled(TextInput)`
    z-index: 999;
    bottom: 3px;
    border-radius: 21px;
    font-size: 18px;
    width: 80%;
    background-color: #ffffff;
    padding: 7px;
    border-color: #575656;
    border-width: 2px;
    margin: 3px;
    width: 98%;
    align-self: center;
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
            <ScrollView>
                {
                    [...messages, ...messages, ...messages].map(({_id, sender, text, createdAt}) => (
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
            <MessageSender
                placeholder="Message..."
            />
        </>
    );
};

export default MessagesScreen;