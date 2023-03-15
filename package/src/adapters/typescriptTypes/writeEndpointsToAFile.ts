import { sentenceCase, camelCase } from "change-case";
import * as fs from "fs";
import { generateRuntypes } from "generate-runtypes";
import { EOL } from "os";
import { Endpoint, EndpointKey } from "../../lexer/types";

function convertToDTOName(str: string): {
  typeName: `${string}DTO`;
  constantName: `${string}DTOObject`;
  runtypeName: `${string}DTO`;
} {
  const [httpMethod, endpoint] = str.split(" ");
  const endpointParts = endpoint.split("/");
  const dtoName = endpointParts[1];
  return {
    typeName: `${sentenceCase(httpMethod)}${sentenceCase(dtoName)}DTO`,
    runtypeName: `${camelCase(httpMethod)}${sentenceCase(dtoName)}DTO`,
    constantName: `${camelCase(httpMethod)}${sentenceCase(dtoName)}DTOObject`,
  };
}

export const generateStrings = (endpoints: Endpoint[]): string[] => {
  const stringArray: string[] = [];
  const exportNames: string[] = [];
  const constantNames: string[] = [];

  stringArray.push(`//AUTOGENERATED FILE - DO NOT EDIT MANUALLY`);
  stringArray.push(EOL);
  stringArray.push(EOL);

  endpoints.forEach((_endpoint) => {
    Object.keys(_endpoint).map((endpointName: EndpointKey) => {
      const identifier = endpointName;
      const responseBodyTwo = _endpoint[endpointName].responseBodyTwo;
      const {
        typeName: name,
        constantName,
        runtypeName,
      } = convertToDTOName(identifier);
      const sourceCode = generateRuntypes([responseBodyTwo]);
      stringArray.push(sourceCode);
      stringArray.push(`const ${constantName} = {
      "${identifier}": { 
        responseBody: ${runtypeName}}
      }`);
      //push a new line to string array
      stringArray.push(EOL);
      stringArray.push(EOL);
      exportNames.push(name);
      constantNames.push(constantName);
    });
  });
  stringArray.push(`export {${exportNames.join(", ")}}`);
  stringArray.push(EOL);

  stringArray.push(EOL);

  stringArray.push(`export const endpointRegistryTwo = {`);
  stringArray.push(`...${constantNames.join(", ")}`);
  stringArray.push(`} as const;`);

  return stringArray;
};

export const writeStringstoAFile = (strings: string[]) => {
  const file = fs.createWriteStream("src/out/typescriptTypes.ts");
  file.on("error", (err) => {
    console.log(err);
  });
  strings.forEach((str) => {
    file.write(str);
  });
  file.end();
};
