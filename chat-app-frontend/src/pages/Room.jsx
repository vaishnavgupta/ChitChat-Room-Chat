import React, { useEffect, useRef, useState } from "react";
import RoomHeader from "../components/RoomHeader";
import InputArea from "../components/InputArea";
import ChatItemOther from "../components/ChatItemOther";
import { useNavigate } from "react-router";
import { useRoomContext } from "../context/RoomContext";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import { BASE_URL } from "../config/AxiosClient";
import { Stomp } from "@stomp/stompjs";
import { getRoomMessages } from "../service/RoomService";
import { timeAgo } from "../utils/helper";

const Room = () => {
  const {
    contextRoomId,
    contextUsername,
    connected,
    setContextRoomId,
    setContextUsername,
    setConnected,
  } = useRoomContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) {
      //Navigate back to home
      navigate("/");
    }
  }, [connected, contextRoomId, contextUsername]);

  const [messages, setMessages] = useState([
    {
      sender: "Vaishnav",
      content: "Hello",
    },
    {
      sender: "Vaishnav",
      content: "How are you? How is your life going",
    },
    {
      sender: "Ramesh",
      content: "Is every thing good",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  const leaveRoom = () => {
    setConnected(false);
    setContextRoomId("");
    setContextUsername("");
    if(stompClient) stompClient.disconnect();
    toast.success("Room exited successfully");
  };

  //Div Scroll Smooth
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  //page init --> Message load
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await getRoomMessages(contextRoomId);
        if (response.status === 200) {
          const previousChats = response.data;
          setMessages(previousChats);
        }
      } catch (error) {
        toast.error(`Failed to load messages`);
      }
    };

    if (connected) loadMessages();
  }, [connected, contextRoomId]);

  //stomp client connect --> Subscribe and establish connection

  useEffect(() => {
    const connectWebSocket = () => {
      //Sock JS
      const sock = new SockJS(`${BASE_URL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected");

        client.subscribe(`/topic/room/${contextRoomId}`, (message) => {
          //triggered for each new message
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }
  }, [contextRoomId]);

  // sendMessage Functionality
  const sendMessage = () => {
    if (stompClient && connected && input.trim()) {
      const chat = {
        content: input,
        sender: contextUsername,
        roomId: contextRoomId,
      };
      stompClient.send(
        `/app/sendMessage/${contextRoomId}`,
        {},
        JSON.stringify(chat)
      );
      setInput("");
    }
  };

  return (
    <div className="min-h-screen items-center flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <RoomHeader
        roomId={contextRoomId}
        username={contextUsername}
        leaveRoom={leaveRoom}
      />
      {/*  Actual CHAT Area  */}
      <main
        ref={chatBoxRef}
        className="py-20 h-screen overflow-auto w-3/4 bg-slate-800"
      >
        {/* Message Container */}
        <div className="flex flex-col gap-3 px-4 overflow-hidden">
          {messages.map((chat, index) => (
            <div
              className={`flex ${
                chat.sender === contextUsername
                  ? "justify-end"
                  : "justify-start"
              }`}
              key={index}
            >
              <ChatItemOther
                username={chat.sender}
                content={chat.content}
                key={index}
                currUser={contextUsername}
                agoTime={timeAgo(chat.timestamp)}
              />
            </div>
          ))}
        </div>
      </main>
      <InputArea chat={input} setChat={setInput} sendMessage={sendMessage} />
    </div>
  );
};

export default Room;
