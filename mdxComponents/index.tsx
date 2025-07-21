import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from "next-mdx-remote-client/rsc";

export const components: MDXComponents = {
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="custom-strong" {...props} />
  ),
  wrapper: (props: React.ComponentPropsWithoutRef<"div">) => {
    return <div id="mdx-layout">{props.children}</div>;
  },
  Image,
  Link,
  DynamicLink: dynamic(() => import("next/link")),
};
