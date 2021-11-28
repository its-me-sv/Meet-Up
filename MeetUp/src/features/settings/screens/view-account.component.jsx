import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { Avatar, Divider, Chip } from "react-native-paper";
import { format } from "timeago.js";
import axios from "axios";

import Spacer from "../../../components/spacer/spacer.component";

const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const baseUrl = "http://192.168.29.97:5001";

const colors = [
    '#16a085',
    '#27ae60',
    '#f39c12',
    '#e74c3c',
    '#FB6964',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
    '#ff3333'
];

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

const ViewAccount = ({ user }) => {
    const { profilePicture, _id } = user;
    const [friends, setFriends] = useState([]);
    const imageUrl = profilePicture.length ? baseUrl + profilePicture : defaultUrl;
    useEffect(() => {
        axios.get(`http://192.168.29.97:5000/user/friends/${_id}`)
        .then(({data}) => setFriends(data))
        .catch(console.log);
    }, []);
    return (
        <ScrollView>
            <View style={{
                flex: 1,
                flexDirection: "column",
                margin: 21
            }}>
                <View style={{
                    flexDirection: "row",
                    marginBottom: 14
                }}>
                    <Spacer size="large" />
                    <Spacer size="small" />
                    <Avatar.Image
                        size={120}
                        source={{ uri: imageUrl + `?${new Date()}` }}
                    />
                    <View style={{
                        flexDirection: "column",
                        marginLeft: 14
                    }}>
                        <Text
                            style={{
                                fontSize: 28,
                                color: "#343131"
                            }}
                        >{user.username}</Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#343131"
                            }}
                        >{user.email}</Text>
                    </View>
                </View>
                <Divider />
                <Spacer size="medium" />
                <View style={{
                    flexDirection: "row"
                }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#343131"
                            }}
                        >Joined</Text>
                        <Text style={{
                            color: "black",
                            fontSize: 16
                        }}>{formatTime(user.createdAt)}</Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 16,
                            color: "#343131",
                            marginTop: "auto",
                            marginLeft: "auto"
                        }}
                    >{format(user.createdAt)}</Text>
                </View>
                <Spacer size="medium" />
                <Divider />
                <Spacer size="medium" />
                <View>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#343131"
                        }}
                    >Interests</Text>
                    <Spacer />
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}>
                        {[...user.interests].map(({_id, name}, idx) => (
                            <Chip 
                                key={_id} 
                                mode="outlined"
                                style={{
                                    marginRight: 7,
                                    marginTop: 4, 
                                    backgroundColor: colors[idx%colors.length], 
                                    padding: 2,
                                    elevation: 4
                                }}
                                textStyle={{
                                    color: "white"
                                }}
                            >{name}</Chip>
                        ))}
                    </View>
                </View>
                <Spacer size="medium" />
                <Divider />
                <Spacer size="medium" />
                <View>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#343131"
                        }}
                    >Friends</Text>
                    <Spacer size="medium" />
                    <ScrollView>
                    {
                        [...friends].map(({_id, username, profilePicture: pp}) => {
                            const friendPp = pp.length ? baseUrl + pp : defaultUrl;
                            return (
                                <View 
                                    key={_id}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 3,
                                        margin: 3,
                                        marginBottom: 3,
                                        borderRadius: 18,
                                        borderWidth: 1.2,
                                        borderColor: "#9898a1"
                                    }}
                                >
                                    <Spacer size="medium" position="left"/>
                                    <Avatar.Image
                                        size={49}
                                        source={{uri: friendPp + `?${new Date()}`}}
                                    />
                                    <Text style={{
                                        color: "#343131",
                                        fontSize: 19,
                                        marginLeft: 14
                                    }}>{username}</Text>
                                </View>
                            );
                        })
                    }
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

const mapStateToProps = ({user}) => ({
    user: user.user
});

export default connect(
    mapStateToProps
)(ViewAccount);