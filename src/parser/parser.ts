import { MOCK_PATH } from "./consts";
import { generateZodFromTs } from "./parseTsFileToEndpoints";
import { getAndValidateFile } from "./parseYamlFile";
import { writeYamlFileToTs } from "./writeYamlFileToTs";

const program = async () => {
  await getAndValidateFile(MOCK_PATH);
  await writeYamlFileToTs();
  await generateZodFromTs();
};

export { program };
