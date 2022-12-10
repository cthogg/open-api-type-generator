import { fileAsJson } from "./parseYamlFile";
import { writeTsSchemaToFile, writeYamlFileToTs } from "./writeYamlFileToTs";

const program = async () => {
  const jsonObject = await fileAsJson;
  const typeFileString = await writeYamlFileToTs();
  writeTsSchemaToFile(typeFileString);
};

export { program };
