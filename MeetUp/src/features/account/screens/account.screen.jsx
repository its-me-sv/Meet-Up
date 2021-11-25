import React, { useRef } from "react";

import {
    AccountContainer,
    AccountForm,
    AuthButton,
    Title,
    AuthInput,
} from "../components/account.styles";
import Spacer from "../../../components/spacer/spacer.component";
import Text from "../../../components/typography/text.component";

const AccountScreen = ({ navigation }) => {
    const email = useRef("");
    const password = useRef("");
    const onLogin = () => {
        console.log({
            email: email.current.state.value,
            password: password.current.state.value
        });
    };
    return (
        <AccountContainer>
            <Title>Meet Up</Title>
            <AccountForm>
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
                >Login</AuthButton>
                <Spacer size="large" />
                <Text>Not a member ?</Text>
                <AuthButton
                    onPress={() => navigation.navigate("Register")} 
                >Create account</AuthButton>
            </AccountForm>
        </AccountContainer>
    );
};

export default AccountScreen;