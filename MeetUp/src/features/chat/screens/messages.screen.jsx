import React from "react";

const MessagesScreen = ({ navigation, route }) => {
    const { person, convoId, userId} = route.params;
    navigation.setOptions({title: person.username});
    return (
        <>

        </>
    );
};

export default MessagesScreen;