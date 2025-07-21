"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar">
      <Link
        href="/articles-strategy-flat-content"
        className={pathname.includes("flat") ? "underline" : undefined}
      >
        Flat Articles
      </Link>
      <Link
        href="/articles-strategy-scoped-content"
        className={pathname.includes("scoped") ? "underline" : undefined}
      >
        Scoped Articles
      </Link>
      <Link
        href="/articles-modules-components"
        className={
          pathname.includes("component") || pathname.includes("module")
            ? "underline"
            : undefined
        }
      >
        Articles /w Modules & Components
      </Link>
    </div>
  );
};

export default Navbar;
