import { MOCK_PATH } from "./consts";
import { getAndValidateFile } from "./getAndValidateFile";
import { OpenApi } from "./types";
import { generateEndpoints } from "./validateParsedStructure";
import { writeEndpointsToAFile } from "./writeEndpointsToAFile";

const program = async () => {
  const file: OpenApi = await getAndValidateFile(MOCK_PATH);
  const endpoints = generateEndpoints(file);
  console.log("endpoints", endpoints);
  writeEndpointsToAFile(endpoints);
  return endpoints;
};

export { program };
