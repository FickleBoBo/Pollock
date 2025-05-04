FROM amazoncorretto:21

WORKDIR /app

COPY build/libs/User-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
