package org.vaishnav.chatapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.vaishnav.chatapp.documents.Chat;
import org.vaishnav.chatapp.dto.ChatRequest;
import org.vaishnav.chatapp.service.ChatService;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.frontend.url}")
public class ChatController {
    private final ChatService chatService;

    // For both Sending & Receiving
    @MessageMapping("/sendMessage/{roomId}")        // Client to Server ==> /app/sendMessage/123
    @SendTo("/topic/room/{roomId}")                 // Server to Client ==> /topic/room/123
    public Chat sendChat(
            @DestinationVariable String roomId,
            @RequestBody ChatRequest request
    ){
        try{
            return chatService.saveChat(roomId, request);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
