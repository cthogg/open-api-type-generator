import SwaggerParser from "@apidevtools/swagger-parser";
import fs from "fs";
import { parse } from "yaml";
import { generateEndpoints } from "./validateParsedStructure";

const getAndValidateFile = async (path: string) => {
  SwaggerParser.parse(path);
  const file = fs.readFileSync(path, "utf8");
  const fileAsJson = parse(file);
  const endpoints = generateEndpoints(fileAsJson);
  console.log("endpoints", endpoints);
  return fileAsJson;
};

export { getAndValidateFile };
