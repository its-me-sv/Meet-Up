import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";

import SearchBar from "../components/search.component";
import Loader from "../../../components/loader/loader.component";
import NoResultScreen from "../../../components/no-result-screen/no-result-screen.component"
import { fetchConversations } from "../../../redux/conversation/conversation.actions";
import Conversations from "../components/conversations.component";

const ChatMenu = ({ userId, fetchConvo, loading, conversations }) => {
    const isFocused = useIsFocused();
    useEffect(() => {
        fetchConvo(userId)
    }, [isFocused]);
    return (
        <>
            <SearchBar />
            {
                loading 
                ? <Loader />
                : !conversations.length
                ? <NoResultScreen />
                : <Conversations convos={conversations} />
            }
        </>
    );
};

const mapStateToProps = ({ user, convo }) => ({
    userId: user.user._id,
    loading: convo.isPending,
    conversations: convo.conversations
});

const mapDispatchToProps = dispatch => ({
    fetchConvo: id => dispatch(fetchConversations(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatMenu);