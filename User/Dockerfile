FROM amazoncorretto:21

WORKDIR /app

COPY build/libs/User-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Spring Boot 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
