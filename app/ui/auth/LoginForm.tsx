"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/lib/actions";

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="self-center flex justify-center items-center relative h-10 w-full bg-35mm-green-bright px-12 rounded-lg text-black font-medium py-2 mt-3 hover:shadow-35mm-green-glow"
    >
      <div className={pending ? "flex" : "hidden"}>Loading</div>
      <span className={pending ? "hidden" : "flex"}>Login</span>
    </button>
  );
};

const LoginForm = () => {
  const [fields, setFields] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [errorMessage, dispatch] = useFormState(login, null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "email" | "password"
  ) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form action={dispatch}>
      <div className="flex flex-col w-[320px] items-center gap-3 px-4 py-6 bg-35mm-black-header rounded-md">
        <div className="flex items-center text-7xl font-bold transition-colors duration-500 text-35mm-green-bright mb-3">
          <span className="overlay-text">35</span>
          <span className="text-sm">mm</span>
        </div>

        <div className="flex flex-col w-full gap-2">
          <label className="text-35mm-off-white font-light" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            placeholder="name@host.com"
            name="email"
            type="email"
            autoComplete="username"
            className="h-10 w-full bg-35mm-black-dark rounded-lg px-3 py-[0.375rem] outline-none transition-all border border-transparent focus:border-35mm-green-bright font-light"
            required
            aria-required="true"
            value={fields.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="font-light" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className="h-10 w-full bg-35mm-black-dark rounded-lg px-3 py-[0.375rem] outline-none transition-all border border-transparent focus:border-35mm-green-bright font-light"
            placeholder="Password"
            required
            aria-required="true"
            value={fields.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        <LoginButton />
        <Link
          href="/auth/signup"
          className="text-35mm-green-bright text-sm hover:underline"
        >
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
