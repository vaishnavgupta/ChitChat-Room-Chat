import React from 'react'

const RoomHeader = ({roomId,username,leaveRoom}) => {
  return (
    <div className='flex backdrop-blur-lg fixed flex-row bg-gray-400/50 text-white items-center justify-around p-3 w-full border-2 border-gray-500'>
        <h2 className='text-xl'>Room Id : <span className='font-bold'>{roomId}</span></h2>
        <h2 className='text-xl'>User : <span className='font-bold'>{username}</span></h2>
        <button className='bg-red-500 cursor-pointer hover:bg-red-700 active:scale-95 px-6 py-3 font-bold text-white rounded-xl 
            shadow-md hover:shadow-red-700 transition-all duration-200'
            onClick={leaveRoom}
        >
            Leave Room
        </button>
    </div>
  )
}

export default RoomHeader