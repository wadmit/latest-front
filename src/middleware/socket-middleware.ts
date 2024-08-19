import { Middleware } from "@reduxjs/toolkit";
import { CustomSocket } from "@/config/socket";
import {
	socketDisconnect,
	socketInitialize,
} from "@/global-states/reducers/socketReducer";

export const socketMiddleware = (socket: CustomSocket): Middleware => {
	return (storeAPI) => (next) => (action: any) => {
		const { dispatch } = storeAPI;

		if (action.type === "socket/socketConnect") {
			socket.connect();
			dispatch(socketInitialize({ socket }));
			socket.on("connect", () => {
				console.log("SOCKET CONNECTED SUCCESSFULLY");
			});
			socket.on("disconnect", () => {
				console.log("SOCKET DISCONNECTED");
			});
		} else if (action.type === "socket/emitEvent") {
			socket.emit(action.payload.event_name, action.payload.data);
		} else if (action.type === "socket/socketDisconnectDispatch") {
			socket.disconnect();
			dispatch(socketDisconnect());
		}

		// Pass the action to the next middleware
		return next(action);
	};
};
