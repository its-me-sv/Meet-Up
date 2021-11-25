import React, { useRef } from "react";
import { Pressable } from "react-native";

import {
    AccountContainer,
    AccountForm,
    AuthButton,
    Title,
    AuthInput,
    FooterContainer
} from "../components/account.styles";
import Spacer from "../../../components/spacer/spacer.component";
import Text from "../../../components/typography/text.component";

const RegisterScreen = ({ navigation }) => {
    const username = useRef("");
    const email = useRef("");
    const password = useRef("");
    const onLogin = () => {
        console.log({
            username: username.current.state.value,
            email: email.current.state.value,
            password: password.current.state.value
        });
    };
    return (
        <>
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
                        secureTextEntry
                        ref={password}
                        outlineColor="grey"
                        activeOutlineColor="black"
                        selectionColor="#0095f6"
                    />
                    <Spacer size="large" />
                    <AuthButton
                        mode="contained"
                        onPress={onLogin}
                    >Create</AuthButton>
                    <Spacer size="large" />
                    <Text>Already a member ?</Text>
                    <AuthButton
                        onPress={() => navigation.navigate("Login")} 
                    >Login to account</AuthButton>
                </AccountForm>
            </AccountContainer>
            <Pressable onPress={() => navigation.navigate("Conditions")}>
                <FooterContainer onPress={() => navigation.navigate("Condition")}>
                    <Text variant="caption">Terms and Conditions</Text>
                    <Text variant="caption">Privacy and Policy</Text>
                </FooterContainer>
            </Pressable>
        </>
    );
};

export default RegisterScreen;