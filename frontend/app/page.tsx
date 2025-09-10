import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-lg mx-auto mt-24 text-center">
      <h1 className="text-2xl font-semibold mb-6">Auth Starter</h1>
      <div className="space-x-4">
        <Link href="/signup" className="underline">
          Sign up
        </Link>
        <Link href="/signin" className="underline">
          Sign in
        </Link>
        <Link href="/app" className="underline">
          App (protected)
        </Link>
      </div>
    </main>
  );
}
