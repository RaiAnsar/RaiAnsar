import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Rai Ansar",
  description: "This page does not exist. Head back to the homepage, services or contact form.",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

const links = [
  { href: "/", label: "Home", note: "Start from the top" },
  { href: "/#services", label: "Services", note: "Development, DevOps and speed work" },
  { href: "/#skills", label: "Projects and skills", note: "What I build with" },
  { href: "/#contact", label: "Contact", note: "Tell me what you need" },
];

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-[#030712] text-white flex items-center">
      <div className="container py-24">
        <p className="font-mono text-sm text-[#38bdf8] mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          That page does not exist<span className="text-[#38bdf8]">.</span>
        </h1>
        <p className="text-lg text-[#9ca3af] max-w-xl mb-10">
          The link may be old or mistyped. These will get you where you were going.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl list-none p-0">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 transition-colors hover:border-[#38bdf8]/60 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#38bdf8]"
              >
                <span className="block font-semibold">{l.label}</span>
                <span className="block text-sm text-[#9ca3af]">{l.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
