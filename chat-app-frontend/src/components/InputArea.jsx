import { SendHorizonal } from 'lucide-react'
import React from 'react'

const InputArea = ({chat, setChat, sendMessage}) => {
  return (
    <div className='fixed backdrop-blur-lg bg-gray-400/50 bottom-0 w-2/3 justify-center h-16 rounded px-2 py-2'>
        <div className="flex flex-row gap-5">
            <input 
            type='text' 
            placeholder='Enter your message...'
            onKeyDown={(e) => {
              if( e.key == "Enter" ){
                sendMessage();
              }
            }} 
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            className='w-full p-2 bg-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-400'/>

            <button 
            onClick={sendMessage}
            className='bg-purple-600 cursor-pointer hover:bg-purple-800 active:scale-95 px-6 py-3 font-bold text-white rounded-xl 
            shadow-md hover:shadow-purple-700 transition-all duration-200 flex'>Send <SendHorizonal className='ms-2'/>
            </button>
        </div>
    </div>
  )
}

export default InputArea