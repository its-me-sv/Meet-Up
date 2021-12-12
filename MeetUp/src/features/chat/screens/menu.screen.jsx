import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text } from "react-native";
import { connect } from "react-redux";
import axios from "axios";

import SearchBar from "../components/search.component";
import Loader from "../../../components/loader/loader.component";
import NoResultScreen from "../../../components/no-result-screen/no-result-screen.component"

const ChatMenu = ({ userId }) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.29.97:5000/conversation/${userId}`)
        .then(({ data }) => {
            setConversations(data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        });
    }, [isFocused]);
    return (
        <>
            <SearchBar />
            {
                loading 
                ? <Loader />
                : !conversations.length
                ? <NoResultScreen />
                : <Text>hello</Text>
            }
        </>
    );
};

const mapStateToProps = ({ user }) => ({
    userId: user.user._id
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatMenu);