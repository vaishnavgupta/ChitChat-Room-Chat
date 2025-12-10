package org.vaishnav.chatapp.config;


import org.springframework.beans.factory.annotation.Value;

public class AppConstants {

    @Value("${app.frontend.url}")
    public static String FRONTEND_URL;


}
