import React from "react";

import SafeArea from "../../../components/utility/safe-area.component";
import termsAndConditions from "../../../utils/terms-and-conditions";
import privacyPolicy from "../../../utils/privacy-and-policy";
import Text from "../../../components/typography/text.component";
import Spacer from "../../../components/spacer/spacer.component";
import { Title } from "../components/account.styles";
import { 
    ConditionsContainer,
    ScrollContainer
} from "./conditions.styles";

const ConditionsScreen = () => {
    return (
        <SafeArea>
            <ConditionsContainer>
                <Title>Meet Up</Title>
                <Text>Terms and Conditions</Text>
                <Spacer size="medium" />
                <ScrollContainer>
                    <Text variant="hint">{termsAndConditions}</Text>
                </ScrollContainer>
                <Spacer size="large"/>
                <Text>Privacy and Policy</Text>
                <Spacer size="medium" />
                <ScrollContainer>
                    <Text variant="hint">{privacyPolicy}</Text>
                </ScrollContainer>
            </ConditionsContainer>
        </SafeArea>
    );
};

export default ConditionsScreen;