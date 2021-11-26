import React, { useRef, useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
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
    userReset,
    fetchUserStart
} from "../../../redux/user/user.actions";

const AccountScreen = ({ 
    navigation, resetUser, loginUser, pending, error
}) => {
    const emailUsername = useRef("");
    const password = useRef("");
    const [visible, setVisible] = useState(false);
    useEffect(resetUser, []);
    const onLogin = () => {
        const body = {};
        body["password"] = password.current.state.value;
        const credential = emailUsername.current.state.value;
        if (credential.includes('@'))
            body["email"] = credential;
        else
            body["username"] = credential;
        loginUser(body);
    };
    return (
        <Scroller>
            <AccountContainer>
                <Title>Meet Up</Title>
                <AccountForm>
                    <AuthInput
                        mode="outlined"
                        label="Email / Username"
                        placeholder="Email / username"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        ref={emailUsername}
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
                        onPress={onLogin}
                        loading={pending}
                        disabled={pending}
                    >Login</AuthButton>
                    <Spacer size="large" />
                    <Text>Not a member ?</Text>
                    <AuthButton
                        onPress={() => navigation.navigate("Register")}
                        tiny={true} 
                    >Create account</AuthButton>
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

const mapStateToProps = state => ({
    user: state.user.user,
    error: state.user.error,
    pending: state.user.isPending,
    error: state.user.error
});

const mapDispatchToProps = dispatch => ({
    resetUser: () => dispatch(userReset()),
    loginUser: data => dispatch(fetchUserStart(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountScreen);