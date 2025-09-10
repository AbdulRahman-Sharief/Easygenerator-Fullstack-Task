/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupForm } from "../../utils/validators";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  async function onSubmit(data: SignupForm) {
    try {
      await signup(data);
      router.push("/app");
    } catch (err: any) {
      alert(err?.message || "Signup failed");
    }
  }

  return (
    <main className="max-w-md mx-auto mt-16">
      <h2 className="text-xl font-semibold mb-6">Create an account</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 p-2 input" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

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
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded bg-emerald-600 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Creating…" : "Sign up"}
          </button>
        </div>
      </form>
      <p className="text-sm mt-4">
        Already have an account?{" "}
        <a href="/signin" className="underline">
          Sign in
        </a>
      </p>
    </main>
  );
}
