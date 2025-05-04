FROM ubuntu:22.04

RUN apt update && apt install -y wget unzip software-properties-common \
    && wget https://corretto.aws/downloads/latest/amazon-corretto-21-x64-linux-jdk.deb \
    && dpkg -i amazon-corretto-21-x64-linux-jdk.deb \
    && rm amazon-corretto-21-x64-linux-jdk.deb

WORKDIR /app

COPY build/libs/StockfishProxy-0.0.1-SNAPSHOT.jar app.jar
COPY engine/stockfish-ubuntu-x86-64-avx2 /app/engine/stockfish

RUN chmod +x /app/engine/stockfish

ENV STOCKFISH_PATH=/app/engine/stockfish

ENTRYPOINT ["java", "-jar", "app.jar"]
