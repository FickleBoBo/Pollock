package kr.pollock;

import java.io.IOException;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        switch (args[0]) {
            case "filter" -> {
                if (args.length != 4) {
                    System.out.println("Usage: filter <input.zst> <output.zst> <compression-level>");
                    return;
                }

                int level;
                try {
                    level = Integer.parseInt(args[3]);

                    if (level < 1 || level > 22) {
                        throw new NumberFormatException();
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid compression level(1-22): " + args[3]);
                    return;
                }

                Path input = Path.of(args[1]);
                Path output = Path.of(args[2]);

                CompressorUtil.filter(input, output, level);
            }
            case "recompress" -> {
                if (args.length != 4) {
                    System.out.println("Usage: recompress <input.zst> <output.zst> <compression-level>");
                    return;
                }

                int level;
                try {
                    level = Integer.parseInt(args[3]);

                    if (level < 1 || level > 22) {
                        throw new NumberFormatException();
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid compression level(1-22): " + args[3]);
                    return;
                }

                Path input = Path.of(args[1]);
                Path output = Path.of(args[2]);

                CompressorUtil.recompress(input, output, level);
            }
            default -> System.out.println("Unknown command: " + args[0]);
        }
    }
}
