import Peer from "peerjs";
import React, {
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("");
  const [roomId, setRoomId] = useState("");
  const [peerId, setPeerId] = useState("");
  const peerInstance = useRef(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const socket = io(`${API_URL}`, {
      withCredentials: true,
    });

    setSocket(socket);

    // Check for stored user data
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({ token: storedToken, ...userData });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peerInstance.current = peer;
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        status,
        setStatus,
        roomId,
        setRoomId,
        peerInstance,
        peerId,
        socket,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}; 