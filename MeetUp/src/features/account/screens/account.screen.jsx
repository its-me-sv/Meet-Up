import React, { useRef, useState } from "react";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native";

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

const AccountScreen = ({ navigation }) => {
    const emailUsername = useRef("");
    const password = useRef("");
    const [visible, setVisible] = useState(false);
    const onLogin = () => {
        console.log({
            emailUsername: emailUsername.current.state.value,
            password: password.current.state.value
        });
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
                    <AuthButton
                        mode="contained"
                        onPress={onLogin}
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

export default AccountScreen;