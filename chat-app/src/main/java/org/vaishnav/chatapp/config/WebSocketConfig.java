package org.vaishnav.chatapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        //Server will send messages to /topic/** to Client (Publish)
        config.enableSimpleBroker("/topic");
        //Client need to send messages to /app/** route ==> Redirected to Controller @MessageMapping()
        config.setApplicationDestinationPrefixes("/app");

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")  //Frontend Browser connects to ws/localhost:8080/chat
                .setAllowedOriginPatterns(frontendUrl, "http://127.0.0.1:5173")
                .withSockJS();
    }
}
