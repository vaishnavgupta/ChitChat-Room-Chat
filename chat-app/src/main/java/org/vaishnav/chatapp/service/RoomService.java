package org.vaishnav.chatapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.vaishnav.chatapp.documents.Chat;
import org.vaishnav.chatapp.documents.Room;
import org.vaishnav.chatapp.repository.RoomRepository;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public Room createRoom(String roomId){
        if(roomRepository.existsByRoomId(roomId)){
            throw new RuntimeException("Room already exists");
        }
        return roomRepository.save(
                Room.builder()
                        .roomId(roomId)
                        .chats(Collections.emptyList())
                        .build()
        );
    }

    public Room getRoom(String roomId){
        System.out.println("Searching Room: "+ roomId);
        System.out.println("All rooms: "+ roomRepository.findAll());
        return roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new RuntimeException("Room does not exists"));

    }

    public List<Chat> getChatsOfRoom(String roomId, int page, int size){
        Room room = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new RuntimeException("Room does not exists"));

        List<Chat> chats = room.getChats();
//        int start = Math.max(0, chats.size() - (page - 1) * size) ;
//        int end = Math.min(chats.size(), start + size);

        return chats;
    }
}
