package com.pollock;

import com.github.luben.zstd.ZstdInputStream;
import com.github.luben.zstd.ZstdOutputStream;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

public class CompressorUtil {

    private static final String SITE_PREFIX = "[Site \"https://lichess.org/";
    private static final String PGN_PREFIX = "1.";

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

    public static void extract(Path input, Path outputDir) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(new ZstdInputStream(new FileInputStream(input.toFile()))));

        String pgnName = null;
        StringBuilder pgnDataBuilder = new StringBuilder();

        boolean engineEvalFlag = false;

        String line = null;
        int emptyLineCnt = 0;

        int splitGameCnt = 0;
        int totalGameCnt = 0;

        while ((line = br.readLine()) != null) {
            pgnDataBuilder.append(line).append("\n");

            if (line.startsWith(SITE_PREFIX)) {
                int startIdx = SITE_PREFIX.length();
                int endIdx = line.indexOf('"', startIdx);
                pgnName = line.substring(startIdx, endIdx);
            }

            if (line.startsWith(PGN_PREFIX)) {
                if (line.contains("eval")) {
                    engineEvalFlag = true;
                }
            }

            if (line.isEmpty()) {
                emptyLineCnt++;
            }

            if (emptyLineCnt > 1) {
                totalGameCnt++;
                emptyLineCnt = 0;

                if (!engineEvalFlag) {
                    pgnName = null;
                    pgnDataBuilder.setLength(0);
                    continue;
                }

                File dir = new File(String.valueOf(outputDir));
                if (!dir.exists()) dir.mkdirs();

                BufferedWriter bw = new BufferedWriter(new FileWriter(new File(dir, pgnName + ".pgn")));
                bw.write(pgnDataBuilder.toString());
                bw.flush();

                splitGameCnt++;
                if (splitGameCnt % 10_000 == 0) {
                    System.out.printf("Processing %,d entries...\n", splitGameCnt);
                }

                pgnName = null;
                pgnDataBuilder.setLength(0);
                engineEvalFlag = false;
            }
        }

        System.out.printf("splitGameCnt = %,d\n", splitGameCnt);
        System.out.printf("totalGameCnt = %,d\n", totalGameCnt);
    }
}
