
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaFacebookMessenger,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaComments,
  FaShieldAlt,
} from "react-icons/fa";

function Login() {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5002/api/user/login",
        userInfo,
        {
          withCredentials: true,
        }
      );

      toast.success("Login successful!");

      localStorage.setItem(
        "ChatApp",
        JSON.stringify(response.data)
      );

      setAuthUser(response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.error || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-4 py-10">

      {/* Background Decorations */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white md:flex">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"></div>

          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/10"></div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-md">
              <FaFacebookMessenger className="text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                Messenger
              </h1>
              <p className="text-xs text-indigo-100">
                Stay connected
              </p>
            </div>
          </div>

          <div className="relative z-10 my-12">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md">
              <FaComments className="text-5xl" />
            </div>

            <h2 className="mb-5 text-4xl font-extrabold leading-tight">
              Conversations
              <br />
              that bring
              <br />
              us closer.
            </h2>

            <p className="max-w-sm text-base leading-7 text-indigo-100">
              Connect with your friends, share your thoughts,
              and enjoy real-time conversations anytime,
              anywhere.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-indigo-500 bg-pink-400 font-bold text-white">
                  A
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-indigo-500 bg-sky-400 font-bold text-white">
                  R
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-indigo-500 bg-emerald-400 font-bold text-white">
                  S
                </div>
              </div>

              <p className="text-sm text-indigo-100">
                Your conversations, your people.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm text-indigo-100">
            <FaShieldAlt />
            <span>Your space to connect and communicate.</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-10 md:p-12">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6"
          >
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 md:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                <FaFacebookMessenger className="text-2xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  Messenger
                </h1>
                <p className="text-sm text-indigo-200">
                  Stay connected
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                Welcome Back
              </p>

              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Login to your
                <span className="mt-1 block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Account
                </span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Enter your details to continue your conversations.
              </p>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email Address
              </label>

              <div
                className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 transition duration-300 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20 ${
                  errors.email
                    ? "border-red-400"
                    : "border-white/10"
                }`}
              >
                <FaEnvelope className="shrink-0 text-slate-400" />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>

              <div
                className={`flex items-center gap-3 rounded-xl border bg-white/5 px-4 transition duration-300 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20 ${
                  errors.password
                    ? "border-red-400"
                    : "border-white/10"
                }`}
              >
                <FaLock className="shrink-0 text-slate-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-slate-400 transition hover:text-white"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 py-4 font-bold text-white shadow-lg shadow-indigo-900/30 transition duration-300 hover:scale-[1.01] hover:from-blue-400 hover:to-violet-500 hover:shadow-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login to Messenger"}

              {!loading && (
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-slate-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-300 transition hover:text-white hover:underline"
              >
                Create an account
              </Link>
            </p>

            <div className="border-t border-white/10 pt-5 text-center">
              <p className="text-xs leading-5 text-slate-400">
                Connect with your people, one message at a time.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;