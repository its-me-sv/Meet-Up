import React, { useRef, useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { connect } from "react-redux";

import {
    Scroller,
    AccountContainer,
    AccountForm,
    AuthButton,
    Title,
    AuthInput,
    PressableFooter
} from "../components/account.styles";
import Spacer from "../../../components/spacer/spacer.component";
import Text from "../../../components/typography/text.component";
import { 
    fetchUserSuccess,
    fetchUserFailure,
    userReset,
    fetchUserPending
} from "../../../redux/user/user.actions";

const RegisterScreen = ({ 
    navigation, setUser, setFailure, error, pending, resetUser, setStart 
}) => {
    const username = useRef("");
    const email = useRef("");
    const password = useRef("");
    const [visible, setVisible] = useState(false);
    useEffect(resetUser, []);
    const onCreate = () => {
        setStart();
        let newUsername = username.current.state.value;
        let newEmail = email.current.state.value;
        let newPassword = password.current.state.value;
        axios.post("http://192.168.29.97:5000/auth/register", {
            username: newUsername,
            email: newEmail,
            password: newPassword
        }).then(({data}) => setUser(data)).catch(() => {
            setFailure("Username or email already in use");
        });
    };
    return (
        <Scroller>
            <AccountContainer>
                <Title>Meet Up</Title>
                <AccountForm>
                    <AuthInput
                        mode="outlined"
                        label="Username"
                        placeholder="Username"
                        autoCapitalize="none"
                        ref={username}
                        selectionColor="blue"
                        outlineColor="grey"
                        activeOutlineColor="black"
                        selectionColor="#0095f6"
                    />
                    <Spacer size="large" />
                    <AuthInput
                        mode="outlined"
                        label="Email"
                        placeholder="Email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        ref={email}
                        selectionColor="blue"
                        outlineColor="grey"
                        activeOutlineColor="black"
                        selectionColor="#0095f6"
                    />
                    <Spacer size="large" />
                    <AuthInput
                        mode="outlined"
                        label="Password"
                        placeholder="Password"
                        textContentType="password"
                        autoCapitalize="none"
                        secureTextEntry={!visible}
                        ref={password}
                        outlineColor="grey"
                        activeOutlineColor="black"
                        selectionColor="#0095f6"
                        right={
                            <TextInput.Icon
                                onPress={() => setVisible(!visible)}
                                name={!visible ? "eye-off" : "eye"}
                            />
                        }
                    />
                    <Spacer size="large" />
                    {error && (
                        <>
                            <Text variant="error">{error}</Text>
                            <Spacer size="large" />
                        </>
                    )}
                    <AuthButton
                        mode="contained"
                        onPress={onCreate}
                        loading={pending}
                        disabled={pending}
                        color="#2c2929"
                    >Create</AuthButton>
                    <Spacer size="large" />
                    <Text>Already a member ?</Text>
                    <AuthButton
                        onPress={() => navigation.navigate("Login")}
                        tiny={true} 
                        color="#946ae0"
                    >Login to account</AuthButton>
                </AccountForm>
            </AccountContainer>
            <PressableFooter 
                onPress={() => navigation.navigate("Conditions")}
            >
                <Text variant="caption">Terms and Conditions</Text>
                <Text variant="caption">Privacy and Policy</Text>
            </PressableFooter>
        </Scroller>
    );
};

const mapStateToProps = ({user}) => ({
    error: user.error,
    pending: user.isPending
});

const mapDispatchToProps = dispatch => ({
    setUser: data => dispatch(fetchUserSuccess(data)),
    setFailure: err => dispatch(fetchUserFailure(err)),
    resetUser: () => dispatch(userReset()),
    setStart: () => dispatch(fetchUserPending())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterScreen);