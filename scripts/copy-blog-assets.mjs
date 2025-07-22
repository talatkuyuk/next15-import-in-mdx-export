import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();

const sourceDir = path.join(projectRoot, "data");
const targetDir = path.join(projectRoot, "out", "data");

const disallowedExtensions = [".md", ".mdx"];

async function copyExceptDisallowed(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await copyExceptDisallowed(srcPath, destPath); // recurse
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!disallowedExtensions.includes(ext)) {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }
}

try {
  await copyExceptDisallowed(sourceDir, targetDir);
} catch (err) {
  console.error("Error copying files:", err);
  process.exit(1);
}
