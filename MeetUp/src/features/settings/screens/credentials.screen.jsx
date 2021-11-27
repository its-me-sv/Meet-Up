import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";

import { 
    AuthInput,
    AuthButton
} from "../../account/components/account.styles";
import Spacer from "../../../components/spacer/spacer.component";
import { AccountForm } from "../../account/components/account.styles";
import { changeCredentials } from "../../../redux/user/user.actions";
import Text from "../../../components/typography/text.component";

const CredentialsScreen = ({ user, updateUser, pending, error }) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const isDisabled = () => {
        const passwordVaried = password.length > 0;
        const usernameVaried = username !== user.username && username.length > 0;
        const emailVaried = email !== user.email && email.length > 0;
        if (passwordVaried || usernameVaried || emailVaried)
            return false;
        return true;
    };
    useEffect(() => {
        setDisabled(isDisabled());
    }, [username, email, password]);
    const onUpdate = async () => {
        const body = {};
        body["userId"] = user._id;
        if (email !== user.email)
            body["email"] = email;
        if (username !== user.username)
            body["username"] = username;
        if (password.length > 0)
            body["password"] = password;
        let result = await updateUser(body);
        setDisabled(result);
        setPassword("");
    };
    return (
        <ScrollView>
            <Spacer size="large" />
            <Spacer size="large" />
            <AccountForm>
                <AuthInput
                    mode="outlined"
                    label="Username"
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
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
                    value={email}
                    onChangeText={setEmail}
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
                    value={password}
                    onChangeText={setPassword}
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
                    color="#39914a"
                    disabled={disabled}
                    onPress={onUpdate}
                    loading={pending}
                >Update</AuthButton>
            </AccountForm>
        </ScrollView>
    );
};

const mapStateToProps = state => ({
    user: state.user.user,
    pending: state.user.isPending,
    error: state.user.error
});

const mapDispatchToProps = dispatch => ({
    updateUser: body => dispatch(changeCredentials(body))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CredentialsScreen);