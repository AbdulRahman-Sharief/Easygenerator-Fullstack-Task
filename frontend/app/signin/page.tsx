/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, SigninForm } from "../../utils/validators";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninForm>({ resolver: zodResolver(signinSchema) });

  async function onSubmit(data: SigninForm) {
    try {
      await login(data);
      router.push("/app");
    } catch (err: any) {
      alert(err?.message || "Sign in failed");
    }
  }

  return (
    <main className="max-w-md mx-auto mt-16">
      <h2 className="text-xl font-semibold mb-6">Sign in</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="mt-1 p-2 input" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 p-2 input"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            className="w-full py-2 px-4 rounded bg-emerald-600 text-white disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
      <p className="text-sm mt-4">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline">
          Sign up
        </a>
      </p>
    </main>
  );
}
