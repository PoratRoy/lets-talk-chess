import io from 'socket.io-client';
import { createContext } from 'react';

export const socket = io(process.env.REACT_APP_SERVER_CONTEXT_URL);
export const SocketContext = createContext();
