FROM ubuntu:22.04

RUN apt update && apt install -y openjdk-21-jdk

WORKDIR /app

COPY build/libs/StockfishProxy-0.0.1-SNAPSHOT.jar app.jar
COPY engine/stockfish-ubuntu-x86-64-avx2 /app/engine/stockfish

RUN chmod +x /app/engine/stockfish

ENV STOCKFISH_PATH=/app/engine/stockfish

ENTRYPOINT ["java", "-jar", "app.jar"]
