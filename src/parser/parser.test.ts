import { describe, expect, it } from "vitest";
import { fileAsJson } from "../parser/parseYamlFile";

describe("parser tests", () => {
  it("file is of type object", () => {
    expect(typeof fileAsJson).toBe("object");
  });
});
