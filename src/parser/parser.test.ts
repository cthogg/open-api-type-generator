import { describe, expect, it } from "vitest";
import { getAndValidateFile } from "../parser/parseYamlFile";
import { MOCK_PATH } from "./consts";
import { program } from "./parser";

describe("parser tests", () => {
  it("file is of type object", () => {
    expect(typeof getAndValidateFile(MOCK_PATH)).toBe("object");
  });

  it("creates a file", () => {
    program();
  });
});
