import { MOCK_PATH } from "./consts";
import { getAndValidateFile } from "./getAndValidateFile";
import { OpenApi } from "./types";
import { generateEndpoints } from "./validateParsedStructure";
import { generateStrings, writeStringstoAFile } from "./writeEndpointsToAFile";
import { createZodFetchersFromEndpoints, Fetcher } from "./zodFetch";

const getFile = async (): Promise<OpenApi> => {
  return await getAndValidateFile(MOCK_PATH);
};

const generateStringsOfFile = async () => {
  const file: OpenApi = await getFile();
  console.log("file", JSON.stringify(file));
  const endpoints = generateEndpoints(file);
  return generateStrings(endpoints);
};

const writeFile = async () => {
  const strings: string[] = await generateStringsOfFile();
  writeStringstoAFile(strings);
};

const createTypes = async (): Promise<Fetcher[]> => {
  const file: OpenApi = await getFile();
  const endpoints = generateEndpoints(file);
  return createZodFetchersFromEndpoints(endpoints);
};

export { generateStringsOfFile, writeFile, createTypes };
