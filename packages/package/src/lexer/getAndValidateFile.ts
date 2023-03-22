import SwaggerParser from "@apidevtools/swagger-parser";
import * as fs from "fs";
import { parse } from "yaml";
import { openApiSchema } from "./openApiTypes";
import { OpenApi } from "./types";

const getAndValidateFile = async (path: string): Promise<OpenApi> => {
  SwaggerParser.parse(path);
  const file = fs.readFileSync(path, "utf8");
  const fileAsJson = parse(file);
  return openApiSchema.check(fileAsJson);
};

export { getAndValidateFile };
