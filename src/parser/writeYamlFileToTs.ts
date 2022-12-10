import fs from "fs";
import openapiTS from "openapi-typescript";
import { EXPORT_PATH, MOCK_PATH_RELATIVE } from "./consts";

const writeYamlFileToTs = async () => {
  const localPath: URL = new URL(MOCK_PATH_RELATIVE, import.meta.url); // may be YAML or JSON format
  const exportPath = new URL(EXPORT_PATH, import.meta.url);
  const schema = await openapiTS(localPath);
  fs.writeFileSync(exportPath, schema);
};

export { writeYamlFileToTs };
