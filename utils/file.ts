import fs from "fs";
import path from "path";
import fg from "fast-glob";

import { getFrontmatter } from "next-mdx-remote-client/utils";

import type { Post, Frontmatter } from "@/types";

type MarkdownFilename = `${string}.md` | `${string}.mdx`;

export const RE = /\.mdx?$/; // Only .md(x) files

export function getMarkdownExtension(fileName: MarkdownFilename): "md" | "mdx" {
  // const match = fileName.match(/\.mdx?$/);
  // const ext = match![0].substring(1);
  const ext = path.extname(fileName);

  return ext as "md" | "mdx";
}

export function toFilename(slug: string): MarkdownFilename {
  // replace the last dash with dot
  return slug.replace(/-(?=[^-]*$)/, ".") as MarkdownFilename;
}

export function toSlug(filename: string): string {
  // replace the last dot with dash         // Convert to URL-friendly /
  return filename.replace(/\.(?=[^.]*$)/, "-").replace(path.sep, "/");
}

/**
 * get all markdown/MDX files from the specified directory
 */
export const getMarkdownFiles = (directory: string): string[] => {
  return fs
    .readdirSync(path.join(process.cwd(), directory))
    .filter((filePath: string) => RE.test(filePath));
};

/**
 * get all markdown/MDX files from the specified directory, including subdirectories.
 */
export const getMarkdownFilesGlob = (directory: string): string[] => {
  return fg.sync(["**/*.mdx", "**/*.md"], {
    cwd: directory,
    onlyFiles: true,
  });
};

/**
 *
 * @param directory relative path from project root to file
 * @param filename filename
 *
 */
export const getSource = async (
  directory: string,
  filename: string
): Promise<string | undefined> => {
  const sourcePath = path.join(process.cwd(), directory, filename);
  if (!fs.existsSync(sourcePath)) return;
  return await fs.promises.readFile(sourcePath, "utf8");
};

/**
 * get the source and format from a slug !
 */
export const getMarkdownFromSlug = async (
  directory: string,
  slug: string
): Promise<
  | {
      source: string;
      format: "md" | "mdx";
      path: string;
    }
  | undefined
> => {
  if (!/-mdx?$/.test(slug)) return;

  const filename = toFilename(slug);

  const projectDir = process.cwd();
  const filePath = path.join(projectDir, directory, filename);
  const relativePath = path.relative(projectDir, filePath);
  const folderPath = path.dirname(relativePath);

  if (fs.existsSync(filePath)) {
    const source = await getSource(directory, filename);

    if (!source) return;

    return {
      source,
      format: getMarkdownExtension(filename),
      path: folderPath,
    };
  }
};

/**
 *
 * @param directory relative path from project root to file
 * @param filename filename
 *
 */
export const getSourceSync = (
  directory: string,
  filename: string
): string | undefined => {
  const sourcePath = path.join(process.cwd(), directory, filename);
  if (!fs.existsSync(sourcePath)) return;
  return fs.readFileSync(sourcePath, "utf8");
};

/**
 * get the frontmatter and slug of a file
 */
export const getPostInformation = (
  directory: string,
  filename: string
): Post | undefined => {
  const source = getSourceSync(directory, filename);

  if (!source) return;

  const frontmatter = getFrontmatter<Frontmatter>(source).frontmatter;

  const post: Post = {
    ...frontmatter,
    slug: toSlug(filename),
  };

  return post;
};
