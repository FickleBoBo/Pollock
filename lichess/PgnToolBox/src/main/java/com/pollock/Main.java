package com.pollock;

import java.io.IOException;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        switch (args[0]) {
            case "filter" -> {
                if (args.length != 3) {
                    System.out.println("Usage: filter <input.zst> <output.zst>");
                    return;
                }

                Path input = Path.of(args[1]);
                Path output = Path.of(args[2]);

                CompressorUtil.filter(input, output);
            }
            default -> System.out.println("Unknown command: " + args[0]);
        }
    }
}
