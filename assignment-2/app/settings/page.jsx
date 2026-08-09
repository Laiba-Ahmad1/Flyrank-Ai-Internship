"use client";

import { useMemo, useRef, useState } from "react";

const initialForm = {
  displayName: "",
  email: "",
  password: "",
};

const validateField = (name, value) => {
  if (name === "displayName") {
    if (!value.trim()) return "Display name is required.";
    if (value.trim().length < 2 || value.trim().length > 50) {
      return "Display name must be 2-50 characters.";
    }
  }

  if (name === "email") {
    if (!value.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return "Please enter a valid email address.";
    }
  }

  if (name === "password" && value) {
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/\d/.test(value)) return "Password must contain at least one number.";
  }

  return "";
};

const validateForm = (values) => {
  const errors = {};
  Object.keys(values).forEach((field) => {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  });
  return errors;
};

const fakeApiUpdate = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error("Unable to save changes right now."));
      } else {
        resolve();
      }
    }, 700);
  });

export default function SettingsPage() {
  const [formState, setFormState] = useState(initialForm);
  const [touched, setTouched] = useState({
    displayName: false,
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState(null);
  const [toast, setToast] = useState(null);
  const fieldRefs = useRef({ displayName: null, email: null, password: null });

  const visibleErrors = useMemo(() => {
    const next = {};
    Object.keys(formState).forEach((field) => {
      if (touched[field]) next[field] = errors[field] || "";
    });
    return next;
  }, [errors, formState, touched]);

  const isFormValid = useMemo(() => {
    const validationErrors = validateForm(formState);
    return Object.keys(validationErrors).length === 0;
  }, [formState]);

  const handleBlur = (field) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const message = validateField(field, formState[field]);
    setErrors((current) => ({ ...current, [field]: message || undefined }));
  };

  const handleChange = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setBanner(null);
    setToast(null);
    if (touched[field]) {
      const message = validateField(field, value);
      setErrors((current) => ({ ...current, [field]: message || undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBanner(null);
    setToast(null);

    const nextErrors = validateForm(formState);
    setErrors(nextErrors);
    setTouched({ displayName: true, email: true, password: true });

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    setSubmitting(true);

    try {
      await fakeApiUpdate();
      setToast("Profile updated successfully.");
    } catch {
      setBanner("We could not save your changes. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#f5f7ff_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl justify-center">
        <section className="grid w-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_70px_-20px_rgba(15,23,42,0.35)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative bg-slate-950 px-8 py-10 text-white sm:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.45),_transparent_30%)]" />
            <div className="relative">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-slate-200">
                Workspace settings
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-tight">
                Shape your profile with confidence.
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                Keep your account details polished and your workspace experience
                seamless.
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-medium text-white">
                  What you can update
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Public display name</li>
                  <li>• Primary email address</li>
                  <li>• Secure password preferences</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {banner ? (
              <div
                className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm"
                role="alert"
              >
                <span className="mt-0.5 text-base">⚠️</span>
                <div className="flex-1">
                  <p className="font-semibold">Update failed</p>
                  <p>{banner}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBanner(null)}
                  className="text-red-600 transition hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ) : null}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="displayName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Display name
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  ref={(element) => {
                    fieldRefs.current.displayName = element;
                  }}
                  value={formState.displayName}
                  onChange={(event) =>
                    handleChange("displayName", event.target.value)
                  }
                  onBlur={() => handleBlur("displayName")}
                  aria-invalid={Boolean(visibleErrors.displayName)}
                  aria-describedby={
                    visibleErrors.displayName ? "displayName-error" : undefined
                  }
                  className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition ${visibleErrors.displayName ? "border-red-400 bg-red-50 text-red-700" : "border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"}`}
                  placeholder="e.g. Maya Chen"
                />
                {visibleErrors.displayName ? (
                  <p
                    id="displayName-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    {visibleErrors.displayName}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={(element) => {
                    fieldRefs.current.email = element;
                  }}
                  value={formState.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  onBlur={() => handleBlur("email")}
                  aria-invalid={Boolean(visibleErrors.email)}
                  aria-describedby={
                    visibleErrors.email ? "email-error" : undefined
                  }
                  className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition ${visibleErrors.email ? "border-red-400 bg-red-50 text-red-700" : "border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"}`}
                  placeholder="you@example.com"
                />
                {visibleErrors.email ? (
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {visibleErrors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={(element) => {
                    fieldRefs.current.password = element;
                  }}
                  value={formState.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  onBlur={() => handleBlur("password")}
                  aria-invalid={Boolean(visibleErrors.password)}
                  aria-describedby={
                    visibleErrors.password ? "password-error" : undefined
                  }
                  className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition ${visibleErrors.password ? "border-red-400 bg-red-50 text-red-700" : "border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"}`}
                  placeholder="Leave blank to keep current password"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Optional. Must be at least 8 characters and include a number.
                </p>
                {visibleErrors.password ? (
                  <p id="password-error" className="mt-2 text-sm text-red-600">
                    {visibleErrors.password}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className="flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save changes"
                )}
              </button>

              {toast ? (
                <div
                  className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm"
                  role="status"
                >
                  <span className="text-base">✓</span>
                  <span>{toast}</span>
                </div>
              ) : null}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
