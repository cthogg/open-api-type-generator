import {
  generateStrings,
  writeStringstoAFile,
} from "../adapters/typescriptTypes/writeEndpointsToAFile";
import {
  createZodFetchersFromEndpoints,
  Fetcher,
} from "../adapters/zodFetch/zodFetch";
import { getAndValidateFile } from "../lexer/getAndValidateFile";
import { OpenApi } from "../lexer/types";
import { generateEndpoints } from "../lexer/validateParsedStructure";
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

const createTypes = async (): Promise<Fetcher[]> => {
  const endpoints = await generateEndpointsOfAFile();
  return createZodFetchersFromEndpoints(endpoints);
};

export { generateStringsOfFile, writeFile, createTypes };
