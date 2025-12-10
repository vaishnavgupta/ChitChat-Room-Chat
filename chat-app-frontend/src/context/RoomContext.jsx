import { createContext, useContext, useState } from "react";

export const useRoomContext = () => {
    const context = useContext(RoomContext);
    if(!context){
        throw new Error("useContextRoom must be used within RoomProvider");
    }
    return context;
}

export const RoomContext = createContext();

export const RoomProvider = ({children}) => {

    const [contextRoomId, setContextRoomId] = useState('');
    const [contextUsername, setContextUsername] = useState('');
    const [connected, setConnected] = useState(false);

    const contextData = {
        contextRoomId,
        contextUsername,
        connected,
        setContextRoomId,
        setContextUsername,
        setConnected
    }

    return <RoomContext.Provider value={contextData}>
        {children}
    </RoomContext.Provider>
}

