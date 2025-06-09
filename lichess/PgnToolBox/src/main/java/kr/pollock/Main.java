package kr.pollock;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        switch (args[0]) {
            case "count" -> {
                if (args.length != 2) {
                    System.out.println("Usage: count <input.zst>");
                    return;
                }

                Path input = Path.of(args[1]);

                CompressorUtil.count(input);
            }
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
            case "merge" -> {
                if (args.length < 5) {
                    System.out.println("Usage: merge <input1.zst> <input2.zst> ... <inputN.zst> <output.zst> <compression-level>");
                    return;
                }

                int level;
                try {
                    level = Integer.parseInt(args[args.length - 1]);

                    if (level < 1 || level > 22) {
                        throw new NumberFormatException();
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid compression level(1-22): " + args[args.length - 1]);
                    return;
                }

                List<Path> inputs = new ArrayList<>();
                for (int i = 1; i < args.length - 2; i++) {
                    inputs.add(Path.of(args[i]));
                }

                Path output = Path.of(args[args.length - 2]);

                CompressorUtil.merge(inputs, output, level);
            }
            case "split" -> {
                if (args.length != 4) {
                    System.out.println("Usage: split <input.zst> <games-per-chunk> <compression-level>");
                    return;
                }

                int gamesPerChunk;
                try {
                    gamesPerChunk = Integer.parseInt(args[2]);
                } catch (NumberFormatException e) {
                    System.out.println("Invalid GamesPerChunk: " + args[2]);
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

                CompressorUtil.split(input, gamesPerChunk, level);
            }
            default -> System.out.println("Unknown command: " + args[0]);
        }
    }
}
