async function getHealthData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");

  if (!res.ok) {
    throw new Error("Failed to fetch health data");
  }

  const data = await res.json();
  return data;
}

export default async function HealthPage() {
  const user = await getHealthData();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        Health Check
      </h1>
      <p className="mt-3 text-lg text-slate-600">Status: OK</p>

      <pre className="mt-8 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        {JSON.stringify(user, null, 2)}
      </pre>
    </main>
  );
}
