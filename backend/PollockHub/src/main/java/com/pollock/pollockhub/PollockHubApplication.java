package com.pollock.pollockhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PollockHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(PollockHubApplication.class, args);
    }

}
