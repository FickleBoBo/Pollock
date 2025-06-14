package kr.pollock;

import com.github.luben.zstd.ZstdInputStream;
import com.github.luben.zstd.ZstdOutputStream;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class CompressorUtil {

    private static final String EVENT_PREFIX = "[Event";
    private static final String NOTATION_PREFIX = "1.";
    private static final String EVAL_TAG = "eval";

    private CompressorUtil() {
    }

    public static void count(Path input) throws IOException {
        long start = System.currentTimeMillis();
        long elapsed;
        long millis;
        long seconds;
        long minutes;
        long hours;

        try (var br = new BufferedReader(new InputStreamReader(new ZstdInputStream(Files.newInputStream(input))))) {
            String line = null;
            long lineCnt = 0;
            long pgnCnt = 0;

            while ((line = br.readLine()) != null) {
                lineCnt++;

                if (line.startsWith(EVENT_PREFIX)) {
                    pgnCnt++;

                    if (pgnCnt % 1_000_000 == 0) System.out.printf("Processing PGN: %,d\n", pgnCnt);
                }
            }
            System.out.printf("Processing PGN: %,d\n", pgnCnt);

            elapsed = System.currentTimeMillis() - start;
            millis = elapsed % 1000;
            seconds = (elapsed / 1000) % 60;
            minutes = (elapsed / (1000 * 60)) % 60;
            hours = (elapsed / (1000 * 60 * 60));

            System.out.printf("Processing Time = %02d:%02d:%02d.%03d\n\n", hours, minutes, seconds, millis);
            System.out.printf("Total Line: %,d\n", lineCnt);
            System.out.printf("Total PGN: %,d\n", pgnCnt);
        }
    }

    public static void filter(Path input, Path output, int level) throws IOException {
        long start = System.currentTimeMillis();
        long elapsed;
        long millis;
        long seconds;
        long minutes;
        long hours;

        try (var br = new BufferedReader(new InputStreamReader(new ZstdInputStream(Files.newInputStream(input))));
             var bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output), level)))) {
            StringBuilder pgnData = new StringBuilder();

            String line = null;
            long lineCnt = 0;

            boolean isFullPgn = false;
            boolean isEmptyGame = true;
            boolean isEvalGame = false;

            int emptyGameCnt = 0;
            int evalGameCnt = 0;
            int totalGameCnt = 0;

            while ((line = br.readLine()) != null) {
                lineCnt++;

                if (line.startsWith(EVENT_PREFIX)) totalGameCnt++;

                if (!line.isEmpty() && !line.startsWith("[")) isFullPgn = true;

                if (line.startsWith(NOTATION_PREFIX)) {
                    isEmptyGame = false;

                    if (line.contains(EVAL_TAG)) {
                        isEvalGame = true;
                    }
                }

                pgnData.append(line).append("\n");

                if (!line.isEmpty() && isFullPgn) {
                    if (isEmptyGame) emptyGameCnt++;

                    if (isEvalGame) {
                        bw.write(pgnData.toString());
                        evalGameCnt++;
                    }

                    isFullPgn = false;
                    isEmptyGame = true;
                    isEvalGame = false;
                    pgnData.setLength(0);

                    if (totalGameCnt % 1_000_000 == 0) {
                        System.out.println("--------------------------------------------------");
                        System.out.printf("Processing Exclude EmptyGameCnt = %,d\n", totalGameCnt - emptyGameCnt);
                        System.out.printf("Processing StreamedGameCnt = %,d\n", evalGameCnt);
                        System.out.printf("Processing TotalGameCnt = %,d\n", totalGameCnt);
                        System.out.printf("Processing Exclude EmptyGameCnt Ratio = %.4f\n", ((totalGameCnt - emptyGameCnt) * 100.0) / totalGameCnt);
                        System.out.printf("Processing StreamedGame Ratio = %.4f\n", (evalGameCnt * 100.0) / totalGameCnt);
                        System.out.printf("Processing Line: %,d\n", lineCnt);

                        elapsed = System.currentTimeMillis() - start;
                        millis = elapsed % 1000;
                        seconds = (elapsed / 1000) % 60;
                        minutes = (elapsed / (1000 * 60)) % 60;
                        hours = (elapsed / (1000 * 60 * 60));
                        System.out.printf("Processing Time = %02d:%02d:%02d.%03d\n", hours, minutes, seconds, millis);
                    }
                }
            }
            System.out.println("==================================================");
            System.out.printf("Exclude EmptyGameCnt = %,d\n", totalGameCnt - emptyGameCnt);
            System.out.printf("StreamedGameCnt = %,d\n", evalGameCnt);
            System.out.printf("TotalGameCnt = %,d\n", totalGameCnt);
            System.out.printf("Exclude EmptyGameCnt Ratio = %.4f\n", ((totalGameCnt - emptyGameCnt) * 100.0) / totalGameCnt);
            System.out.printf("StreamedGame Ratio = %.4f\n", (evalGameCnt * 100.0) / totalGameCnt);
            System.out.printf("Total Line: %,d\n", lineCnt);

            elapsed = System.currentTimeMillis() - start;
            millis = elapsed % 1000;
            seconds = (elapsed / 1000) % 60;
            minutes = (elapsed / (1000 * 60)) % 60;
            hours = (elapsed / (1000 * 60 * 60));
            System.out.printf("Processed Time = %02d:%02d:%02d.%03d\n", hours, minutes, seconds, millis);
            System.out.println("==================================================");
        }
    }

    public static void recompress(Path input, Path output, int level) throws IOException {
        long start = System.currentTimeMillis();
        long elapsed;
        long millis;
        long seconds;
        long minutes;
        long hours;

        try (var br = new BufferedReader(new InputStreamReader(new ZstdInputStream(Files.newInputStream(input))));
             var bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output), level)))) {
            String line = null;
            long lineCnt = 0;

            while ((line = br.readLine()) != null) {
                lineCnt++;

                bw.write(line);
                bw.newLine();
            }

            elapsed = System.currentTimeMillis() - start;
            millis = elapsed % 1000;
            seconds = (elapsed / 1000) % 60;
            minutes = (elapsed / (1000 * 60)) % 60;
            hours = (elapsed / (1000 * 60 * 60));

            System.out.printf("Processed Time = %02d:%02d:%02d.%03d\n", hours, minutes, seconds, millis);
            System.out.printf("Total Line: %,d\n", lineCnt);
        }
    }

    public static void merge(List<Path> inputs, Path output, int level) throws IOException {
        long start = System.currentTimeMillis();
        long elapsed;
        long millis;
        long seconds;
        long minutes;
        long hours;

        try (var bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output), level)))) {
            long lineCnt = 0;
            long pgnCnt = 0;

            for (Path input : inputs) {
                try (var br = new BufferedReader(new InputStreamReader(new ZstdInputStream(Files.newInputStream(input))))) {
                    String line = null;

                    while ((line = br.readLine()) != null) {
                        lineCnt++;

                        bw.write(line);
                        bw.newLine();

                        if (line.startsWith(EVENT_PREFIX)) {
                            pgnCnt++;

                            if (pgnCnt % 1_000_000 == 0) System.out.printf("Processing PGN: %,d\n", pgnCnt);
                        }
                    }
                }
            }
            System.out.printf("Processing PGN: %,d\n", pgnCnt);

            elapsed = System.currentTimeMillis() - start;
            millis = elapsed % 1000;
            seconds = (elapsed / 1000) % 60;
            minutes = (elapsed / (1000 * 60)) % 60;
            hours = (elapsed / (1000 * 60 * 60));

            System.out.printf("Processing Time = %02d:%02d:%02d.%03d\n\n", hours, minutes, seconds, millis);
            System.out.printf("Total Line: %,d\n", lineCnt);
            System.out.printf("Total PGN: %,d\n", pgnCnt);
        }
    }

    public static void split(Path input, int gamesPerChunk, int level) throws IOException {
        long start = System.currentTimeMillis();
        long elapsed;
        long millis;
        long seconds;
        long minutes;
        long hours;

        System.out.println("--------------------------------------------------");

        try (var br = new BufferedReader(new InputStreamReader(new ZstdInputStream(Files.newInputStream(input))))) {
            String line = null;
            int chunkCnt = 0;
            int pgnCnt = 0;

            Path output = Path.of(
                    input.getFileName().toString().replaceFirst("\\.pgn\\.zst$", "") +
                            "_" + String.format("%06d", chunkCnt) +
                            ".pgn.zst"
            );
            var bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output), level)));

            while ((line = br.readLine()) != null) {
                if (line.startsWith(EVENT_PREFIX)) {
                    if (pgnCnt == gamesPerChunk) {
                        bw.close();

                        pgnCnt = 0;
                        chunkCnt++;

                        output = Path.of(
                                input.getFileName().toString().replaceFirst("\\.pgn\\.zst$", "") +
                                        "_" + String.format("%06d", chunkCnt) +
                                        ".pgn.zst"
                        );
                        bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output), level)));
                    }

                    pgnCnt++;
                }

                bw.write(line);
                bw.newLine();
            }
            bw.close();

            System.out.printf("Processing Split = %,d\n", chunkCnt);
            System.out.println("--------------------------------------------------");

            elapsed = System.currentTimeMillis() - start;
            millis = elapsed % 1000;
            seconds = (elapsed / 1000) % 60;
            minutes = (elapsed / (1000 * 60)) % 60;
            hours = (elapsed / (1000 * 60 * 60));

            System.out.printf("Processed Time = %02d:%02d:%02d.%03d\n", hours, minutes, seconds, millis);
        }
    }
}
