# PgnToolBox Usage Guide (feat Lichess Open Database)

---

## 🔧 Build the Fat JAR

Run the following command to generate the executable JAR file:

```bash
./gradlew shadowJar
```

The resulting fat JAR will be generated at:

```
build/libs/PgnToolBox-1.0-SNAPSHOT-all.jar
```

---

## 🔢 Count the Number of PGN Games

Count how many PGN games are included in a `.zst` file:

```bash
java -jar build/libs/PgnToolBox-1.0-SNAPSHOT-all.jar count <input.zst>
```

---

## 🧠 Filter Games with Engine Analysis (Eval Tag)

Extract only games that include an engine evaluation (`%eval`) tag:

```bash
java -jar build/libs/PgnToolBox-1.0-SNAPSHOT-all.jar filter <input.zst> <output.zst> <compression-level>
```

- `input.zst`: Source `.zst` file containing PGN data
- `output.zst`: Output file path for filtered data
- `compression-level`: Compression level (1–22)

---

## 🗜 Recompress a `.zst` File

Change the compression level of an existing `.zst` file:

```bash
java -jar build/libs/PgnToolBox-1.0-SNAPSHOT-all.jar recompress <input.zst> <output.zst> <compression-level>
```

---

## 🔀 Merge Multiple `.zst` Files

Combine several `.zst` files into a single file:

```bash
java -jar build/libs/PgnToolBox-1.0-SNAPSHOT-all.jar merge <input1.zst> <input2.zst> ... <inputN.zst> <output.zst> <compression-level>
```

---

## ✂️ Split a `.zst` File

Split a large `.zst` file into smaller chunks, each containing a fixed number of PGN games:

```bash
java -jar build/libs/PgnToolBox-1.0-SNAPSHOT-all.jar split <input.zst> <games-per-chunk> <compression-level>
```

---
