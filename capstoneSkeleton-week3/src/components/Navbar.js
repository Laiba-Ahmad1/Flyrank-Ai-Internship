"use client";

import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          Flyrank
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 text-sm font-medium text-slate-700 sm:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
