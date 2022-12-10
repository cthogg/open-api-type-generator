import SwaggerParser from "@apidevtools/swagger-parser";
import fs from "fs";
import { parse } from "yaml";
import { OpenApi, openApiSchema } from "./openApiTypes";

const getAndValidateFile = async (path: string): Promise<OpenApi> => {
  SwaggerParser.parse(path);
  const file = fs.readFileSync(path, "utf8");
  const fileAsJson = parse(file);
  return openApiSchema.parse(fileAsJson);
};

export { getAndValidateFile };
