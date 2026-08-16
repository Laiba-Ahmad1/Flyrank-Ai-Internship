const values = [
  "Strategy-first thinking",
  "Clean visual systems",
  "Responsive product design",
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          About
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Thoughtful design for ambitious ideas.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
          We build thoughtful digital experiences for brands, startups, and
          growing teams.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-medium text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
