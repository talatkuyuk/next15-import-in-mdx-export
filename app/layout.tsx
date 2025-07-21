import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import MotionFade from "@/components/MotionFade";
import ThemeProvider from "@/components/ThemeProvider";

import "@/styles/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ipikuka Blog",
  description: "Demonstration of next-mdx-remote-client's import features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <div className="main-wrapper">
          <ThemeProvider>
            <Header />
            <MotionFade>{children}</MotionFade>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
