const fs = require("fs");

const filePath = "src/out/zodTypes.ts";

// Read the file
const fileContent = fs.readFileSync(filePath, "utf8");

// Replace const with export const
const updatedContent = fileContent.replace(/const\s+/g, "export const ");

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent);
