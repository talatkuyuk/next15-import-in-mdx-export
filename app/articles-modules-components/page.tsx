import type { Metadata } from "next";
import Link from "next/link";

import { getPostInformation, getMarkdownFiles } from "@/utils/file";
import type { Post } from "@/types";

export const metadata: Metadata = {
  title: "Ipikuka Articles with importing modules and components",
};

const directory = "data/articles-modules-components";
const path = "/articles-modules-components/";

export default async function Articles() {
  const files = getMarkdownFiles(directory);

  const posts = files
    .map((file) => getPostInformation(directory, file))
    .filter((post): post is Post => post !== undefined)
    .filter((post) => !post.isDraft)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // http://localhost:3000/articles-modules-components/article-import-component-mjs-mdx
  // http://localhost:3000/articles-modules-components/article-import-module-from-file-mdx

  return (
    <div>
      <h1>Articles with importing modules and components</h1>
      <p>
        This page is designed for demonstrating of importing components and
        modules into MDX.
      </p>
      <ul className="articles">
        {posts.map((post) => (
          <li key={post.title}>
            <strong>
              <Link href={path + post.slug}>{post.title}</Link>
            </strong>
            <p>
              <span>{String(post.date)}, </span>
              <span>
                written by <strong>{post.author}</strong>
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
