package com.pollock;

import java.io.IOException;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        switch (args[0]) {
            case "extract" -> {
                if (args.length != 3) {
                    System.out.println("Usage: extract <input.zst> <outputDir>");
                    return;
                }

                Path input = Path.of(args[1]);
                Path outputDir = Path.of(args[2]);

                CompressorUtil.extract(input, outputDir);
            }
            case "compress" -> {
                if (args.length != 3) {
                    System.out.println("Usage: compress <inputDir> <output.zst>");
                    return;
                }

                Path inputDir = Path.of(args[1]);
                Path output = Path.of(args[2]);

//                CompressorUtil.compress(inputDir, output);
            }
            default -> System.out.println("Unknown command: " + args[0]);
        }
    }
}
