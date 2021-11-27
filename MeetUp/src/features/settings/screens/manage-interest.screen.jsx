import React from "react";
import { ScrollView } from "react-native";

const dummyInterests = [
    "apple",
    "ball",
    "cat",
    "dog",
    "egg",
    "frog",
    "goat",
    "Meet up is good",
    "apple",
    "ball",
    "cat",
    "dog",
    "egg",
    "frog",
    "goat",
    "Meet up is good"
];

import InterestCard from "../components/interest-card.component";
import Spacer from "../../../components/spacer/spacer.component";

const ManageInterest = ({ interests = dummyInterests}) => {
    console.log(interests);
    return (
        <ScrollView>
            {interests.map(val => <InterestCard val={val} />)}
            <Spacer size="large" />
        </ScrollView>
    );
};

export default ManageInterest;