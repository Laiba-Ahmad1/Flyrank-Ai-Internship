"use client";

import { useState } from "react";

const initialProfile = {
  fullName: "Ava Johnson",
  email: "ava@example.com",
  role: "Senior Product Designer",
  bio: "I craft intuitive digital experiences for ambitious teams.",
  notifications: true,
  publicProfile: true,
};

export default function Home() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProfile((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Account Settings
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Update your profile
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Adjust your personal details and communication preferences in one
            place.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]"
        >
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Full name</span>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Email address</span>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Professional role</span>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Short bio</span>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-center justify-between gap-3 text-sm text-slate-700">
                <span>Email notifications</span>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={profile.notifications}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-300 text-indigo-600"
                />
              </label>

              <label className="flex items-center justify-between gap-3 text-sm text-slate-700">
                <span>Show profile publicly</span>
                <input
                  type="checkbox"
                  name="publicProfile"
                  checked={profile.publicProfile}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-300 text-indigo-600"
                />
              </label>
            </div>
          </div>

          <aside className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Profile preview
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                This is how your updated details will appear.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-700">
                {profile.fullName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {profile.fullName}
              </h3>
              <p className="text-sm text-indigo-600">{profile.role}</p>
              <p className="mt-3 text-sm text-slate-600">{profile.bio}</p>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Save changes
            </button>

            {saved && (
              <p className="text-sm font-medium text-emerald-600">
                Your profile has been updated.
              </p>
            )}
          </aside>
        </form>
      </div>
    </div>
  );
}
