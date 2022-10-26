import { describe, expect, it } from "vitest";
import { printHelloWorld } from "../helloWorld";

describe("parseErrors", () => {
  it("Prints hello world as expected", () => {
    const errors = printHelloWorld();

    expect(errors).toBe("Hello world");
  });
  it("Does not print hello world as expected", () => {
    const errors = printHelloWorld();

    expect(errors).not.toBe("Hello worlds");
  });
});
