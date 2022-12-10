import { MOCK_PATH } from "./consts";
import { getAndValidateFile } from "./parseYamlFile";
import { writeTsSchemaToFile, writeYamlFileToTs } from "./writeYamlFileToTs";

const program = async () => {
  const jsonObject = await getAndValidateFile(MOCK_PATH);
  const typeFileString = await writeYamlFileToTs();
  writeTsSchemaToFile(typeFileString);
};

export { program };
