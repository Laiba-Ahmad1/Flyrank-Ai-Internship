"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

const filters = [
  "All",
  "Web Dev",
  "2D Animation",
  "Motion Graphics",
  "Graphic Designing",
];

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const visibleProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((project) => project.category === selectedFilter);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Selected work
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Work
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
          Selected projects across motion, design, and digital experiences.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-sky-600 bg-sky-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-600">
              {project.category}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
              {project.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {project.shortDescription}
            </p>
            <span className="mt-5 inline-flex items-center text-sm font-medium text-slate-900 group-hover:text-sky-700">
              View project <span className="ml-2">→</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
