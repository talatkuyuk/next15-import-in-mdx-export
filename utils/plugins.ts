import type { PluggableList } from "unified";
import { nodeTypes } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeImageToolkit from "rehype-image-toolkit";
import recmaMdxImportMedia from "recma-mdx-import-media";
import recmaMdxChangeImports, {
  type ChangeImportsOptions,
} from "recma-mdx-change-imports";

export const remarkPlugins: PluggableList = [remarkGfm];

export const rehypePlugins: PluggableList = [
  [rehypeRaw, { passThrough: nodeTypes }],

  // set image size with title hack
  rehypeImageToolkit,
];

export const recmaPlugins: (pathname: string) => PluggableList = (pathname) => [
  // turn media paths into imports in markdown syntax
  recmaMdxImportMedia,

  // turn imports with relative paths into constant variable declaration of resolvable URL string
  [recmaMdxChangeImports, { pathname } as ChangeImportsOptions],
];
