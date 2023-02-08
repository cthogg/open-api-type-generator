import { sentenceCase } from "change-case";
import fs from "fs";
import { createTypeAlias, printNode, zodToTs } from "zod-to-ts";
import { Endpoint } from "./types";

function convertToDTOName(str: string): string {
  const [httpMethod, endpoint] = str.split(" ");
  const endpointParts = endpoint.split("/");
  const dtoName = endpointParts[1];
  return `${sentenceCase(httpMethod)}${sentenceCase(dtoName)}DTO`;
}

const generateStrings = (endpoints: Endpoint[]) => {
  const stringArray: string[] = [];

  endpoints.forEach((endpoint, i) => {
    const identifier = endpoint.endpoint;
    const name = convertToDTOName(identifier);
    const { node } = zodToTs(endpoint.responseBody, name);
    const typeAlias = createTypeAlias(node, name, endpoint.endpoint);
    stringArray.push(printNode(typeAlias));
  });
  return stringArray;
};

export const writeEndpointsToAFile = (endpoints: Endpoint[]) => {
  const stringArray = generateStrings(endpoints);
  const file = fs.createWriteStream("endpoints.ts");
  file.on("error", (err) => {
    console.log(err);
  });
  stringArray.forEach((str) => {
    file.write(str);
  });
  file.end();
};
