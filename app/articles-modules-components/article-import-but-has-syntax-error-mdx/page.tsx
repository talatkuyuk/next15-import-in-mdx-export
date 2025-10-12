import { Suspense } from "react";
import type { Metadata } from "next";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";
import { nodeTypes } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import recmaMdxImportReact from "recma-mdx-import-react";

import type { Frontmatter } from "@/types";
import { getRandomInteger } from "@/utils";
import { getMarkdownFromSlug } from "@/utils/file";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";

const directory = "data/articles-modules-components";
const slug = "article-import-but-has-syntax-error-mdx";

export async function generateMetadata(): Promise<Metadata> {
  const file = await getMarkdownFromSlug(directory, slug);

  if (!file) return {};

  const { frontmatter } = getFrontmatter<Frontmatter>(file.source);

  return {
    title: frontmatter.title ?? "Article",
  };
}

/**
 * "MDXRemote" to be rendered
 */
export default async function Post() {
  const result = await getMarkdownFromSlug(directory, slug);

  if (!result) {
    return <ErrorComponent error="The source could not found !" />;
  }

  const { source, format } = result;

  const options: EvaluateOptions = {
    parseFrontmatter: true,
    scope: {
      readingTime: getRandomInteger(5, 10),
    },
    mdxOptions: {
      format,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
      recmaPlugins: [recmaMdxImportReact],
      baseUrl: import.meta.url,
    },
  };

  const { content, error } = await evaluate({ source, options, components });

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return <Suspense fallback={<LoadingComponent />}>{content}</Suspense>;
}
