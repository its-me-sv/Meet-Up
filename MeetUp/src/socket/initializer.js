import { io } from "socket.io-client";

const socketUrl = __DEV__ ? "http://192.168.29.97:5002" : "";

const socket = io(socketUrl);

export default socket;