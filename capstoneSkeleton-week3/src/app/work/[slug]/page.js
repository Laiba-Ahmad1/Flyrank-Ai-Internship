import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Project not found
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            The requested project could not be found.
          </p>
          <Link
            href="/work"
            className="mt-6 inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            ← Back to Work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <Link
        href="/work"
        className="inline-flex items-center text-sm font-medium text-sky-700 transition hover:text-sky-800"
      >
        ← Back to Work
      </Link>

      <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
          {project.category}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {project.shortDescription}
        </p>
        <div className="mt-8 h-1.5 w-20 rounded-full bg-sky-600" />
        <p className="mt-6 text-base leading-8 text-slate-700">
          {project.fullDescription}
        </p>
      </article>
    </main>
  );
}
