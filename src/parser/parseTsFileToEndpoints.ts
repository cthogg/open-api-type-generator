// input types

import fs from "fs";
import tsToZod from "ts-to-zod";
import { EXPORT_PATH_ABSOLUTE, EXPORT_PATH_ZOD } from "./consts";

export const generateZodFromTs = async () => {
  const file = fs.readFileSync(EXPORT_PATH_ABSOLUTE, "utf8");
  const zod = tsToZod.generate({ sourceText: file });
  const exportPath = new URL(EXPORT_PATH_ZOD, import.meta.url);

  fs.writeFileSync(exportPath, zod.getZodSchemasFile(file));
};
