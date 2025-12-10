import React from 'react'
import { timeAgo } from '../utils/helper'

const ChatItemOther = ({username,content,imageUrl,currUser,agoTime}) => {
  return (
     <div className={`flex items-end gap-2 ${username === currUser ? "flex-row-reverse" : ""}`}>
        <div className='rounded-full w-8 h-8 object-cover'>
            <img src="https://cdn-icons-png.flaticon.com/512/219/219970.png" alt='userImage'/>
        </div>
      <div className="bg-gray-300 p-2 rounded-lg w-fit shadow-md break-words">
        <p className="font-bold text-red-600 text-sm">{username}</p>
        <p className="text-black text-sm">{content}</p>
        <p className="text-black mt-2 text-[10px]">{agoTime}</p>
      </div>
    </div>
  )
}

export default ChatItemOther