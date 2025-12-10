import { axiosClient } from "../config/AxiosClient"

export const createRoomService = async (roomId) => {
    const response = await axiosClient.post('/api/room',{
        roomId: roomId
    });
    return response;
};

export const joinRoomService = async (roomId) => {
    const response = await axiosClient.get(`/api/room/${roomId}`)
    return response;
}

export const getRoomMessages = async (roomId) => {
    const response = await axiosClient.get(`/api/room/chats/${roomId}`)
    return response;
}