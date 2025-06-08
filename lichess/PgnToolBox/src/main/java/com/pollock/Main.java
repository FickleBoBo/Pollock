package com.pollock;

import java.io.IOException;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        switch (args[0]) {
            case "filter" -> {
                if (args.length < 2 || args.length > 3) {
                    System.out.println("Usage: filter <input.zst> [level(1-22)]");
                    return;
                }

                Path input = Path.of(args[1]);
                Path output = input.getParent().resolve(input.getFileName().toString().replaceAll("\\.zst$", "") + "_filter_" + level + ".zst");

                CompressorUtil.filter(input, output, level);
            }
            default -> System.out.println("Unknown command: " + args[0]);
        }
    }
}
