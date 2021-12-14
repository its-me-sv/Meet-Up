import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import axios from "axios";

import Loader from "../../../components/loader/loader.component";
import Message from "../components/message.component";

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
    );
};

export default MessagesScreen;