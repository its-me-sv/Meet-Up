import React from "react";
import { View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Text from "../../../components/typography/text.component";

const InterestCard = ({val}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                // justifyContent: "space-around",
                alignItems: "center",
                padding: 14,
                // borderColor: "#8f8f91",
                // borderWidth: 1,
                margin: 18,
                marginBottom: 0,
                borderRadius: 3,
                elevation: 2
            }}
        >
            <Text>{val}</Text>
            <Entypo 
                name="cross"
                size={24}
                color="red"
                style={{
                    marginLeft: "auto"
                }}
            />
        </View>
    );
}

export default InterestCard