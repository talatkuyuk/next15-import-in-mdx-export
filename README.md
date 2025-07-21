This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Application

The application is designed for:

1. finding a solution **import static assets with relative path** in MDX for Next.js output export.
2. finding a solution **import components/modules/functions** in MDX.

## Getting Started

First, run the development server and open [http://localhost:3000](http://localhost:3000) with your browser.

```bash
npm run dev
```

Or, run the production mode and open [http://localhost:3000](http://localhost:3000) with your browser.

```bash
npm run build
npm run start
```

## Import static assets with relative path in MDX when output export

When output export, static assets which are located in a different directory other than `public` need to be copied to output folder in a structured way in blog articles live.

### Employ two `recma` plugins

With the **[`recma-mdx-import-media`](https://github.com/ipikuka/recma-mdx-import-media)** and **[`recma-mdx-change-imports`](https://github.com/ipikuka/recma-mdx-change-imports)** plugins working together, you can seamlessly display images using **relative path** in Markdown/MDX.

In this application, I am able to display images using _relative paths_.

```markdown
Pay attention to that I am not using any import declarations at all !

### using markdown syntax

![article image](./article-assets/image.png "Article Image")
![blog image](../blog-assets/image.png "Blog Image")

### using html syntax

<img alt="article image" src="./article-assets/image.png" />
<img alt="blog image" src="../blog-assets/image.png" />
```

## Import components/modules/functions in MDX

**[`next-mdx-remote-client`](https://github.com/ipikuka/next-mdx-remote-client)** provides feature for importing modules/functions/components.

Importing a function or module from a file doesn't need anything extra in **`next-mdx-remote-client`**.

But, importing a `React` component needs to use a `recma` plugin called **[`recma-mdx-import-react`](https://github.com/ipikuka/recma-mdx-import-react)**. This recma plugin ensures getting `React` instance from the arguments and makes the runtime props `{React, jsx, jsxs, jsxDev, Fragment}` is available in the dynamically imported components in the compiled source of MDX.
