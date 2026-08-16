export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Let&apos;s build something meaningful.
        </h1>
        <p className="mt-5 text-base text-slate-600 sm:text-lg">
          Let&apos;s start a conversation about your next product, campaign, or
          digital project.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-600">Email</p>
          <a
            href="mailto:hello@flyrank.example"
            className="mt-2 inline-block text-lg font-semibold text-slate-900 hover:text-sky-700"
          >
            hello@flyrank.example
          </a>
        </div>
      </section>
    </main>
  );
}
