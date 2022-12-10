import { MOCK_PATH } from "./consts";
import { getAndValidateFile } from "./getAndValidateFile";
import { OpenApi } from "./openApiTypes";
import { generateEndpoints } from "./validateParsedStructure";

const program = async () => {
  const file: OpenApi = await getAndValidateFile(MOCK_PATH);
  const endpoints = generateEndpoints(file);
  //write endpoints to a file
  // write endpoint file to ts file.
  return endpoints;
};

export { program };
