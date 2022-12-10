import { describe, expect, it } from "vitest";
import { MOCK_PATH } from "./consts";
import { getAndValidateFile } from "./getAndValidateFile";
import { program } from "./parser";

describe("parser tests", () => {
  it("file is of type object", () => {
    expect(typeof getAndValidateFile(MOCK_PATH)).toBe("object");
  });

  it("creates a file", () => {
    program();
  });
});
