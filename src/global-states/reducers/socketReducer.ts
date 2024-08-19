import { CustomSocket } from "@/config/socket";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISocketResource {
	socket: CustomSocket | null;
}

const initialState: ISocketResource = {
	socket: null,
};

export const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		socketConnect: (state) => {
			return state;
		},
		socketInitialize: (
			state,
			action: PayloadAction<{ socket: CustomSocket }>,
		) => {
			const socket = action.payload.socket;
			return {
				...state,
				socket: socket,
			};
		},
		emitEvent: (state, action: any) => {
			return {
				...state,
			};
		},

		socketDisconnectDispatch: (state) => {
			return state;
		},
		socketDisconnect: (state) => {
			const socket = state.socket;

			// socket?.disconnect()
			return {
				...state,
				socket: null,
			};
		},
	},
});

export const {
	socketInitialize,
	emitEvent,
	socketDisconnect,
	socketConnect,
	socketDisconnectDispatch,
} = socketSlice.actions;

export default socketSlice.reducer;
