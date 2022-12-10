import SwaggerParser from "@apidevtools/swagger-parser";
import fs from "fs";
import { parse } from "yaml";
import { OpenApiSpec } from "./validateParsedStructure";

const getAndValidateFile = async (path: string) => {
  SwaggerParser.parse(path);
  const file = fs.readFileSync(path, "utf8");
  const fileAsJson = parse(file);
  return OpenApiSpec.parse(fileAsJson);
};

export { getAndValidateFile };
