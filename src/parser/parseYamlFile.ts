import fs from "fs";
import { parse } from "yaml";
import { OpenApiSpec, OpenApiSpecType } from "./validateParsedStructure";

const getAndValidationYml = () => {
  const file = fs.readFileSync("src/mocks/artists.yml", "utf8");
  const fileAsJson = parse(file);
  console.log("fileAsJson", fileAsJson);
  OpenApiSpec.parse(fileAsJson);
  return fileAsJson as OpenApiSpecType;
};

const fileAsJson = getAndValidationYml();

export { fileAsJson };
