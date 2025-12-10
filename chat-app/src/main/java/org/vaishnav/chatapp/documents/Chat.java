package org.vaishnav.chatapp.documents;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Chat {
    private String sender;
    private String content;
    private LocalDateTime timestamp;
}
