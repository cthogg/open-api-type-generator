import { describe, expect, it } from "vitest";
import { getAndValidateFile } from "../lexer/getAndValidateFile";
import { MOCK_PATH } from "./consts";
import { generateStringsOfFile, writeFile } from "./parser";

describe("parser tests", () => {
  it("file is of type object", () => {
    expect(typeof getAndValidateFile(MOCK_PATH)).toBe("object");
  });

  it("generates strings", async () => {
    const strings = await generateStringsOfFile();
    expect(strings).toMatchInlineSnapshot(`
      [
        "/** GET /artists */
      type GetArtistsDTO = {
          artist_name: string;
          artist_genre: string;
          albums_recorded: number;
          username: string;
      };",
      ]
    `);
  });

  it("creates a file", () => {
    writeFile();
  });
});
