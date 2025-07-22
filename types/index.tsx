export type Frontmatter = {
  title: string;
  author: string;
  date: Date;
  isDraft?: boolean;
};

export type Post = Frontmatter & { slug: string | string[] };

export type Scope = {
  readingTime: string;
};
