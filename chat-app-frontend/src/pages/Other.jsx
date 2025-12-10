import { MessageCircleMore } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Other = () => {
  const navigate = useNavigate();
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
      <h2 className="text-3xl text-white font-bold mb-5">
        Oops! 404 Not Found
      </h2>
      <h3 className="text-2xl text-white mb-5">This page does not exists</h3>
      <button
        className="bg-blue-400 hover:bg-blue-600 p-3 rounded"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Other;
