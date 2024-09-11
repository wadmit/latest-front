import { io } from "socket.io-client";
import { Socket as SocketMainType } from "socket.io-client";

class Socket {
  socket: SocketMainType | null;
  constructor() {
    this.socket = null;
  }

  connect() {
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
