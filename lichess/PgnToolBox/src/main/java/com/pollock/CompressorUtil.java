package com.pollock;

import com.github.luben.zstd.ZstdInputStream;
import com.github.luben.zstd.ZstdOutputStream;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

public class CompressorUtil {

    private static final String PGN_PREFIX = "1.";
    private static final String EVAL_TAG = "eval";

    private CompressorUtil() {
    }

    public static void filteringEmptyGame(Path input, Path output) throws IOException {
        try (var br = new BufferedReader(new InputStreamReader(new ZstdInputStream(Files.newInputStream(input))));
             var bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output))))) {

            StringBuilder sb = new StringBuilder();

            String line = null;
            int emptyLineCnt = 0;

            boolean isEmptyGame = true;

            int streamedGameCnt = 0;
            int totalGameCnt = 0;

            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");

                if (line.startsWith(PGN_PREFIX)) {
                    isEmptyGame = false;
                }

                if (line.isEmpty()) emptyLineCnt++;

                if (emptyLineCnt > 1) {
                    if (isEmptyGame) {
                    } else {
                        bw.write(sb.toString());
                        streamedGameCnt++;
                    }

                    emptyLineCnt = 0;
                    isEmptyGame = true;
                    totalGameCnt++;
                    sb.setLength(0);

                    if (totalGameCnt % 1_000_000 == 0) {
                        System.out.printf("Processing StreamedGameCnt = %,d\n", streamedGameCnt);
                        System.out.printf("Processing TotalGameCnt = %,d\n", totalGameCnt);
                        System.out.printf("Processing StreamedGame Ratio = %.4f\n\n", (streamedGameCnt * 100.0) / totalGameCnt);
                    }
                }
            }

            System.out.printf("StreamedGameCnt = %,d\n", streamedGameCnt);
            System.out.printf("TotalGameCnt = %,d\n", totalGameCnt);
            System.out.printf("StreamedGame Ratio = %.4f\n\n", (streamedGameCnt * 100.0) / totalGameCnt);
        }
    }

    public static void filteringEvalGame(Path input, Path output) throws IOException {
        try (var br = new BufferedReader(new InputStreamReader(new ZstdInputStream(Files.newInputStream(input))));
             var bw = new BufferedWriter(new OutputStreamWriter(new ZstdOutputStream(Files.newOutputStream(output))))) {

            StringBuilder sb = new StringBuilder();

            String line = null;
            int emptyLineCnt = 0;

            boolean isEmptyGame = true;

            int streamedGameCnt = 0;
            int totalGameCnt = 0;

            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");

                if (line.startsWith(PGN_PREFIX) && line.contains(EVAL_TAG)) {
                    isEmptyGame = false;
                }

                if (line.isEmpty()) emptyLineCnt++;

                if (emptyLineCnt > 1) {
                    if (isEmptyGame) {
                    } else {
                        bw.write(sb.toString());
                        streamedGameCnt++;
                    }

                    emptyLineCnt = 0;
                    isEmptyGame = true;
                    totalGameCnt++;
                    sb.setLength(0);

                    if (totalGameCnt % 1_000_000 == 0) {
                        System.out.printf("Processing StreamedGameCnt = %,d\n", streamedGameCnt);
                        System.out.printf("Processing TotalGameCnt = %,d\n", totalGameCnt);
                        System.out.printf("Processing StreamedGame Ratio = %.4f\n\n", (streamedGameCnt * 100.0) / totalGameCnt);
                    }
                }
            }

            System.out.printf("StreamedGameCnt = %,d\n", streamedGameCnt);
            System.out.printf("TotalGameCnt = %,d\n", totalGameCnt);
            System.out.printf("StreamedGame Ratio = %.4f\n\n", (streamedGameCnt * 100.0) / totalGameCnt);
        }
    }
}
