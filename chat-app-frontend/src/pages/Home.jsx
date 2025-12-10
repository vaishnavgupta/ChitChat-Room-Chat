import { MessageCircleMore, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { createRoomService, joinRoomService } from "../service/RoomService";
import { useRoomContext } from "../context/RoomContext";
import { useNavigate } from "react-router";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const {setContextRoomId,setContextUsername,setConnected} = useRoomContext();
  const navigate = useNavigate();

  const validateForm = () => {
    if (roomId.trim() === "" || username.trim() === "" || roomId.length<=2 || username.length<=3) {
      toast.error("Please fill in all the fields correctly");
      return false;
    }
    return true;
  };

  const joinRoom = async () => {
    if (validateForm() === true) {
      try {
        const response = await joinRoomService(roomId);
        if(response.status === 200){
          setContextRoomId(roomId);
          setContextUsername(username);
          toast.success(`Room ${roomId} joined successfully`);
          setConnected(true)
          navigate('/room')
        }
      } catch (error) {
        if(error.status === 404){
          toast.error("Room does not exists");
          console.log(error);
        }
        else{
          toast.error("Room joining failed with errors");
          console.log(error);
        }
      }
    }
  };

  const createRoom = async () => {
    if (validateForm() === true) {
      try {
        const response = await createRoomService(roomId);
        if (response.status === 201) {
          toast.success("Room created successfully");
          setContextRoomId(roomId);
          setContextUsername(username);
          setConnected(true);
          navigate('/room')
        }
      } catch (error) {
        if (error.status == 400) {
          toast.error("Room already exists with id");
          console.log(error);
        } else {
          toast.error("Room creation failed with errors");
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div
        className="flex flex-row gap-3 items-center cursor-pointer select-none 
  hover:scale-105 transition-transform duration-300 mb-5"
      >
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
          <MessageCircleMore className="h-8 w-8 text-white" />
        </div>

        <h2
          className="text-4xl font-[--font-stacksans] text-transparent bg-clip-text 
    bg-gradient-to-r from-purple-400 to-blue-400 font-bold tracking-wide drop-shadow-md"
        >
          ChitChat
        </h2>
      </div>

      <form>
        <div className="bg-white/10 backdrop-blur-lg shadow-2xl w-150 flex flex-col items-center justify-center rounded-2xl p-6 border border-white/30 hover:border-purple-400 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-10 text-white tracking-wide">
            Join / Create Room
          </h2>

          <label
            htmlFor="roomId"
            className="text-lg font-semibold mb-2 text-gray-200"
          >
            Room ID
          </label>
          <input
            type="text"
            name="roomId"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="block text-center w-full px-4 py-3 border border-gray-500 bg-white/10 text-white placeholder-gray-300 rounded-xl
             focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
            placeholder="Enter Room ID"
          />

          <label
            htmlFor="username"
            className="text-lg font-semibold mb-2 mt-5 text-gray-200"
          >
            User Name
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block text-center w-full px-4 py-3 border border-gray-500 bg-white/10 text-white placeholder-gray-300 rounded-xl
             focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
            placeholder="Enter Username"
          />

          <div className="flex flex-row gap-5">
            <button
              onClick={joinRoom}
              type="button"
              className="bg-purple-600 cursor-pointer hover:bg-purple-800 active:scale-95 mt-12 px-6 py-3 font-bold text-white rounded-xl 
            shadow-md hover:shadow-purple-700 transition-all duration-200"
            >
              Join Room
            </button>

            <button
              onClick={createRoom}
              type="button"
              className="bg-purple-600 cursor-pointer hover:bg-purple-800 active:scale-95 mt-12 px-6 py-3 font-bold text-white rounded-xl 
            shadow-md hover:shadow-purple-700 transition-all duration-200"
            >
              Create Room
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
