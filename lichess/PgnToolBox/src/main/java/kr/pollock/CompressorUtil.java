package kr.pollock;

import com.github.luben.zstd.ZstdInputStream;
import com.github.luben.zstd.ZstdOutputStream;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class CompressorUtil {

    private static final String NOTATION_PREFIX = "1.";
    private static final String EVAL_TAG = "eval";

    private CompressorUtil() {
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

            StringBuilder sb = new StringBuilder();

            String line = null;
            int emptyLineCnt = 0;

            boolean isEmptyGame = true;
            boolean isEvalGame = false;

            int emptyGameCnt = 0;
            int streamedGameCnt = 0;
            int totalGameCnt = 0;

            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");

                if (line.startsWith(NOTATION_PREFIX)) {
                    isEmptyGame = false;

                    if (line.contains(EVAL_TAG)) {
                        isEvalGame = true;
                    }
                }

                if (line.isEmpty()) emptyLineCnt++;

                if (emptyLineCnt > 1) {
                    if (isEmptyGame) {
                        emptyGameCnt++;
                    }

                    if (isEvalGame) {
                        bw.write(sb.toString());
                        streamedGameCnt++;
                    }

                    emptyLineCnt = 0;
                    isEmptyGame = true;
                    isEvalGame = false;
                    totalGameCnt++;
                    sb.setLength(0);

                    if (totalGameCnt % 1_000_000 == 0) {
                        System.out.println("--------------------------------------------------");
                        System.out.printf("Processing Exclude EmptyGameCnt = %,d\n", totalGameCnt - emptyGameCnt);
                        System.out.printf("Processing StreamedGameCnt = %,d\n", streamedGameCnt);
                        System.out.printf("Processing TotalGameCnt = %,d\n", totalGameCnt);
                        System.out.printf("Processing Exclude EmptyGameCnt Ratio = %.4f\n", ((totalGameCnt - emptyGameCnt) * 100.0) / totalGameCnt);
                        System.out.printf("Processing StreamedGame Ratio = %.4f\n", (streamedGameCnt * 100.0) / totalGameCnt);

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
            System.out.printf("StreamedGameCnt = %,d\n", streamedGameCnt);
            System.out.printf("TotalGameCnt = %,d\n", totalGameCnt);
            System.out.printf("Exclude EmptyGameCnt Ratio = %.4f\n", ((totalGameCnt - emptyGameCnt) * 100.0) / totalGameCnt);
            System.out.printf("StreamedGame Ratio = %.4f\n", (streamedGameCnt * 100.0) / totalGameCnt);

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

            while ((line = br.readLine()) != null) {
                bw.write(line);
                bw.newLine();
            }
        }

        elapsed = System.currentTimeMillis() - start;
        millis = elapsed % 1000;
        seconds = (elapsed / 1000) % 60;
        minutes = (elapsed / (1000 * 60)) % 60;
        hours = (elapsed / (1000 * 60 * 60));

        System.out.printf("Processed Time = %02d:%02d:%02d.%03d\n", hours, minutes, seconds, millis);
    }

    public static void merge(List<Path> inputs, Path output, int level) throws IOException {
        long start = System.currentTimeMillis();
        long elapsed;
        long millis;
        long seconds;
        long minutes;
        long hours;

        try (var bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output), level)))) {

            for (Path input : inputs) {
                try (var br = new BufferedReader(new InputStreamReader(new ZstdInputStream(Files.newInputStream(input))))) {
                    String line = null;

                    while ((line = br.readLine()) != null) {
                        bw.write(line);
                        bw.newLine();
                    }
                }
            }
        }

        elapsed = System.currentTimeMillis() - start;
        millis = elapsed % 1000;
        seconds = (elapsed / 1000) % 60;
        minutes = (elapsed / (1000 * 60)) % 60;
        hours = (elapsed / (1000 * 60 * 60));

        System.out.printf("Processed Time = %02d:%02d:%02d.%03d\n", hours, minutes, seconds, millis);
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
            int chunkCnt = 1;
            int emptyLineCnt = 0;
            Path output = Path.of(input.getFileName().toString().replaceFirst("\\.pgn\\.zst$", "") + "_" + chunkCnt + ".pgn.zst");
            var bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output), level)));

            while ((line = br.readLine()) != null) {
                bw.write(line);
                bw.newLine();

                if (line.isEmpty()) emptyLineCnt++;

                if (emptyLineCnt == gamesPerChunk * 2) {
                    bw.close();
                    System.out.printf("Processing Split = %d\n", chunkCnt);

                    chunkCnt++;
                    emptyLineCnt = 0;
                    output = Path.of(input.getFileName().toString().replaceFirst("\\.pgn\\.zst$", "") + "_" + chunkCnt + ".pgn.zst");
                    bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output), level)));
                }
            }

            bw.close();
            System.out.printf("Processing Split = %d\n", chunkCnt);
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
