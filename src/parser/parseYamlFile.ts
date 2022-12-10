import fs from "fs";
import { parse } from "yaml";
import { isValidOpenApiSpec, OpenApiSpec } from "./validateParsedStructure";
const getAndValidationYml = async () => {
  const file = fs.readFileSync("src/mocks/artists.yml", "utf8");
  const fileAsJson = parse(file);
  const isFileValid: boolean = await isValidOpenApiSpec(fileAsJson);
  if (!isFileValid) {
    throw new Error("file is not valid");
  }
  return OpenApiSpec.parse(fileAsJson);
};

const fileAsJson = getAndValidationYml();

export { fileAsJson };
