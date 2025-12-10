package org.vaishnav.chatapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.chatapp.documents.Chat;
import org.vaishnav.chatapp.documents.Room;
import org.vaishnav.chatapp.dto.RoomRequest;
import org.vaishnav.chatapp.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.frontend.url}")
public class RoomController {
    private final RoomService roomService;

    // Get Room / Join Room
    @GetMapping("/{id}")
    public ResponseEntity<?> getRoom(@PathVariable String id){
        try{
            Room room = roomService.getRoom(id);
            return ResponseEntity.status(HttpStatus.OK).body(room);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Create Room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody RoomRequest request){
        try{
            Room room = roomService.createRoom(request.getRoomId());
            return ResponseEntity.status(HttpStatus.CREATED).body(room);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Fetch Chats of Room
    @GetMapping("/chats/{id}")
    public ResponseEntity<?> getChatsOfRoom(
            @PathVariable String id,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size
    ){
        try{
            List<Chat> chats = roomService.getChatsOfRoom(id,page,size);
            return ResponseEntity.status(HttpStatus.OK).body(chats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
