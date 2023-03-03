import {
  generateStrings,
  writeStringstoAFile,
} from "../adapters/typescriptTypes/writeEndpointsToAFile";

import { generateEndpoints } from "../lexer/generateEndpoints";
import { getAndValidateFile } from "../lexer/getAndValidateFile";
import { OpenApi } from "../lexer/types";
import { MOCK_PATH } from "./consts";

const generateEndpointsOfAFile = async () => {
  const file: OpenApi = await getAndValidateFile(MOCK_PATH);
  return generateEndpoints(file);
};

const generateStringsOfFile = async () => {
  const endpoints = await generateEndpointsOfAFile();
  return generateStrings(endpoints);
};

const writeFile = async () => {
  const strings: string[] = await generateStringsOfFile();
  writeStringstoAFile(strings);
};

export { generateStringsOfFile, writeFile };
