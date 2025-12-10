package org.vaishnav.chatapp.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.vaishnav.chatapp.documents.Room;

import java.util.Optional;

@Repository
public interface RoomRepository extends MongoRepository<Room, ObjectId> {

    // Get Room using Room ID
    Optional<Room> findByRoomId(String roomId);

    // Exists by Room ID
    boolean existsByRoomId(String roomId);

}
