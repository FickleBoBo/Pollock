package com.pollock;

import com.github.luben.zstd.ZstdInputStream;

import java.io.*;
import java.nio.file.Path;

public class CompressorUtil {

    private static final String SITE_PREFIX = "[Site \"https://lichess.org/";
    private static final String PGN_PREFIX = "1.";

    private CompressorUtil() {
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
