import { MOCK_PATH } from "./consts";
import { getAndValidateFile } from "./getAndValidateFile";
import { OpenApi } from "./types";
import { generateEndpoints } from "./validateParsedStructure";
import { generateStrings, writeStringstoAFile } from "./writeEndpointsToAFile";

const generateStringsOfFile = async () => {
  const file: OpenApi = await getAndValidateFile(MOCK_PATH);
  const endpoints = generateEndpoints(file);
  return generateStrings(endpoints);
};

const writeFile = async () => {
  const strings: string[] = await generateStringsOfFile();
  writeStringstoAFile(strings);
};

export { generateStringsOfFile, writeFile };
