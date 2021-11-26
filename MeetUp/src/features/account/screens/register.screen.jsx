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

const RegisterScreen = ({ navigation }) => {
    const username = useRef("");
    const email = useRef("");
    const password = useRef("");
    const [visible, setVisible] = useState(false);
    const onLogin = () => {
        console.log({
            username: username.current.state.value,
            email: email.current.state.value,
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
                    <AuthButton
                        mode="contained"
                        onPress={onLogin}
                    >Create</AuthButton>
                    <Spacer size="large" />
                    <Text>Already a member ?</Text>
                    <AuthButton
                        onPress={() => navigation.navigate("Login")}
                        tiny={true} 
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

export default RegisterScreen;