import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

import Loader from "../loader/loader.component";

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
    console.log(people);
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}><Text>{id}</Text></View>
    );
};

export default InterestProfileCard;