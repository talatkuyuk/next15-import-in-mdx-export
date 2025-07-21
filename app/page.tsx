import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ipikuka Blog Main Page",
};

export default async function Home() {
  return (
    <main style={{ display: "grid", justifyItems: "center" }}>
      <p style={{ marginBottom: "0", textAlign: "center" }}>
        This is a <strong>blog application</strong> using{" "}
        <strong>next-mdx-remote-client</strong> in{" "}
        <code>Next.js app router</code>.
      </p>
      <div className="next-mdx-remote-client">next-mdx-remote-client</div>

      <p style={{ textAlign: "center" }}>
        It is a wrapper of the <code>@mdx-js/mdx</code> in order to load MDX
        content.
      </p>
    </main>
  );
}
