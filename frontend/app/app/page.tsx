"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function AppPage() {
  const { user, loading, signout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user, router]);

  if (loading) return <div className="max-w-lg mx-auto mt-24">Loading…</div>;

  return (
    <main className="max-w-2xl mx-auto mt-24 bg-white p-6 rounded shadow-sm">
      <h1 className="text-xl font-semibold mb-4">
        Welcome to the application.
      </h1>
      <p className="mb-4">
        Hello, <strong>{user?.name ?? user?.email}</strong>
      </p>
      <div>
        <button
          onClick={async () => {
            await signout();
            router.push("/signin");
          }}
          className="py-2 px-4 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
