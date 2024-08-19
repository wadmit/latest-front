// socket.js

import { io } from "socket.io-client";
import { Socket as SocketMainType } from "socket.io-client";

class Socket {
	socket: SocketMainType | null;
	constructor() {
		this.socket = null;
	}

	connect() {
		// this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
		// 	transports: ["websocket", "polling"], // use WebSocket first, if available
		// 	autoConnect: true,
		// 	timeout: 10000,
		// 	withCredentials: true,
		// });
		io();
	}

	disconnect() {
		if (this.socket) {
			this.socket.emit("time", "hello");
			this.socket.close();
			this.socket = null;
		}
	}

	emit(event: string, data: any) {
		if (this.socket) {
			this.socket.emit(event, data);
		}
	}

	on(eventName: string, callback: any) {
		if (this.socket) {
			// this.socket.addEventListener(eventName, callback);
			this.socket.on(eventName, callback);
		}
	}

	off(eventName: string, callback: any) {
		if (this.socket) {
			this.socket.removeListener(eventName, callback);
		}
	}
}

export { Socket as CustomSocket };
