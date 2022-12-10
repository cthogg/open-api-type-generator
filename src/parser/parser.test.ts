import { describe, expect, it } from "vitest";
import { fileAsJson } from "../parser/parseYamlFile";
import { program } from "./parser";

describe("parser tests", () => {
  it("file is of type object", () => {
    expect(typeof fileAsJson).toBe("object");
  });
  it("creates a file", () => {
    program();
  });
});
