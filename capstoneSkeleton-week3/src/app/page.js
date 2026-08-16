import Link from "next/link";

const stats = [
  { value: "5+", label: "Years creating digital work" },
  { value: "18", label: "Projects shipped" },
  { value: "8", label: "Creative partners" },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
            Portfolio / Creative Studio
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Designing digital stories that feel clear, bold, and memorable.
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
            I build visual systems, product experiences, and motion-led brand
            work for teams that want thoughtful design with real impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="rounded-2xl bg-slate-900 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
              Selected focus
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              Brand systems + product storytelling
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Strategy, interface design, motion direction, and polished launch
              experiences for meaningful work.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="text-2xl font-bold text-slate-900">
                  {item.value}
                </div>
                <div className="mt-1 text-xs text-slate-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
