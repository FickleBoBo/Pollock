package com.pollock;

import java.io.IOException;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        switch (args[0]) {
            case "filter" -> {
                if (args.length < 2 || args.length > 3) {
                    System.out.println("Usage: filter <input.zst> [-level(1-22)]");
                    return;
                }

                int level = 3;
                if (args.length == 3) {
                    try {
                        level = Integer.parseInt(args[2].substring(1));

                        if (level < 1 || level > 22) {
                            throw new NumberFormatException();
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid compression level(1-22): " + args[2]);
                        return;
                    }
                }

                Path input = Path.of(args[1]);
                Path output = input.getParent().resolve(input.getFileName().toString().replaceFirst("\\.pgn\\.zst$", "_filter_" + level + ".pgn.zst"));

                CompressorUtil.filter(input, output, level);
            }
            case "recompress" -> {
                if (args.length < 2 || args.length > 3) {
                    System.out.println("Usage: recompress <input.zst> [-level(1-22)]");
                    return;
                }

                int level = 3;
                if (args.length == 3) {
                    try {
                        level = Integer.parseInt(args[2].substring(1));

                        if (level < 1 || level > 22) {
                            throw new NumberFormatException();
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid compression level(1-22): " + args[2]);
                        return;
                    }
                }

                Path input = Path.of(args[1]);
                Path output = input.getParent().resolve(input.getFileName().toString().replaceFirst("\\.pgn\\.zst$", "_filter_" + level + ".pgn.zst"));

                CompressorUtil.recompress(input, output, level);
            }
            default -> System.out.println("Unknown command: " + args[0]);
        }
    }
}
