import type { Metadata } from "next";
import Link from "next/link";

import { getPostInformation, getMarkdownFilesGlob } from "@/utils/file";
import type { Post } from "@/types";

export const metadata: Metadata = {
  title: "Ipikuka Articles with Scoped Content Strategy",
};

const directory = "data/articles-strategy-scoped-content";
const path = "/articles-strategy-scoped-content/";

export default async function Articles() {
  const files = getMarkdownFilesGlob(directory);

  const posts = files
    .map((file) => getPostInformation(directory, file))
    .filter((post): post is Post => post !== undefined)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      <h1>Articles with Scoped Content Strategy</h1>
      <p>
        Each article is inside its own directory, and images are stored inside
        that directory. There is a directory for common assets as well.
      </p>
      <pre>
        <code>/data</code>
        <br />
        <code> {"  "}/articles</code>
        <br />
        <code>{"      "}/article-1</code>
        <br />
        <code>{"          "}my-article-x.mdx</code>
        <br />
        <code>{"          "}/article-assets</code>
        <br />
        <code>{"              "}imageX.png</code>
        <br />
        <code>{"      "}/article-2</code>
        <br />
        <code>{"          "}my-article-y.mdx</code>
        <br />
        <code>{"          "}/article-assets</code>
        <br />
        <code>{"              "}imageY.png</code>
        <br />
        <code>{"      "}/blog-assets</code>
        <br />
        <code>{"          "}image.png</code>
      </pre>
      <ul className="articles">
        {posts.map((post) => (
          <li key={post.title}>
            <strong>
              <Link href={path + encodeURIComponent(post.slug)}>
                {post.title}
              </Link>
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
