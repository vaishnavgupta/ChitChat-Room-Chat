package org.vaishnav.chatapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.vaishnav.chatapp.documents.Chat;
import org.vaishnav.chatapp.documents.Room;
import org.vaishnav.chatapp.dto.ChatRequest;
import org.vaishnav.chatapp.repository.RoomRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final RoomRepository roomRepository;


    public Chat saveChat(String roomId, ChatRequest chatRequest){
        Room room = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        Chat chat = Chat.builder()
                .sender(chatRequest.getSender())
                .content(chatRequest.getContent())
                .timestamp(LocalDateTime.now())
                .build();
        room.getChats().add(chat);
        roomRepository.save(room);
        return chat;
    }
}
