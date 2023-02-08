import { sentenceCase } from "change-case";
import fs from "fs";
import { createTypeAlias, printNode, zodToTs } from "zod-to-ts";
import { Endpoint } from "./types";

// regex to get all letters after the last slash
const getAfterSlash = (str: string): string => {
  const regex = /\/(\w+)$/;
  const match = str.match(regex);
  if (!match) {
    throw new Error("No match found");
  }
  return match[1];
};

function convertToDTOName(str: string): string {
  const [httpMethod, endpoint] = str.split(" ");
  console.log("endpoint", endpoint);
  console.log("httpMethod", httpMethod);
  const endpointParts = endpoint.split("/");
  console.log("endpointParts", endpointParts);
  const dtoName = endpointParts[1];
  return `${sentenceCase(httpMethod)}${sentenceCase(dtoName)}DTO`;
}

export const writeEndpointsToAFile = (endpoints: Endpoint[]) => {
  const file = fs.createWriteStream("endpoints.ts");
  file.on("error", (err) => {
    console.log(err);
  });

  endpoints.forEach((endpoint, i) => {
    const identifier = endpoint.endpoint;
    console.log("identifier", identifier);
    const name = convertToDTOName(identifier);
    console.log("name", name);
    const { node } = zodToTs(endpoint.responseBody, name);
    const typeAlias = createTypeAlias(node, name, endpoint.endpoint);
    file.write(printNode(typeAlias));
  });
  file.end();
};
