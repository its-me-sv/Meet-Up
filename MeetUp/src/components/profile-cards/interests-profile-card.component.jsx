import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import { format } from "timeago.js";
import numberToText from 'number-to-text';

import Loader from "../loader/loader.component";
import {
    AccountContainer,
    JoinedContainer,
    TextVariant2,
    TextVariant3,
    RightEndText
} from "../../features/settings/screens/view-account.styles";
import Spacer from "../spacer/spacer.component";
import PersonCard from "../../features/settings/components/person-card.component";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const formatTime = date => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    return `${month} ${day}, ${year}`;
};

const InterestProfileCard = ({ route }) => {
    const { id } = route.params;
    const [interest, setInterest] = useState(null);
    const [people, setPeople] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        axios.get(`http://192.168.29.97:5000/interest/origin/${id}`)
        .then(({data}) => setInterest(data))
        .catch(console.log);
        axios.get(`http://192.168.29.97:5000/interest/people/${id}`)
        .then(({data}) => setPeople(data))
        .catch(console.log);
    }, [isFocused, id]);
    if (!interest) return <Loader />;
    return (
        <ScrollView>
            <AccountContainer>
                <Text style={{
                    alignSelf: "center", 
                    marginTop: 21, 
                    fontSize: 28,
                    color: "#373434"
                }}>{interest.name}</Text>
                <Spacer size="large"/>
                <Spacer size="large"/>
                <Divider />
                <Spacer size="medium" />
                <JoinedContainer>
                    <View>
                        <TextVariant2>Created</TextVariant2>
                        <TextVariant3>{formatTime(interest.createdAt)}</TextVariant3>
                    </View>
                    <RightEndText>{format(interest.createdAt)}</RightEndText>
                </JoinedContainer>
                <Spacer size="medium" />
                <Divider />
                <Spacer size="medium" />
                <JoinedContainer>
                    <View>
                        <TextVariant2>Followed by</TextVariant2>
                        <TextVariant3>{people.length}</TextVariant3>
                    </View>
                    <RightEndText>{numberToText.convertToText(people.length)} people</RightEndText>
                </JoinedContainer>
                <Spacer size="medium" />
                <Divider />
                <Spacer size="medium" />
                <View>
                    <TextVariant2>Followers</TextVariant2>
                    <Spacer size="medium" />
                    {!people.length && <TextVariant3 opaque={true}>No followers yet</TextVariant3>}
                    <ScrollView>
                    {
                        people.map(({_id, username, profilePicture: pp, email: friendEmail}) => {
                            return (
                                <PersonCard 
                                    key={_id}
                                    id={_id}
                                    picture={pp}
                                    username={username}
                                    email={friendEmail}
                                />
                            );
                        })
                    }
                    </ScrollView>
                </View>
            </AccountContainer>
        </ScrollView>
    );
};

export default InterestProfileCard;