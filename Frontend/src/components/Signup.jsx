
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaFacebookMessenger,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaComments,
  FaUserPlus,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

function Signup() {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5002/api/user/signup",
        userInfo,
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        toast.success("Signup successful!");

        localStorage.setItem(
          "ChatApp",
          JSON.stringify(response.data)
        );

        setAuthUser(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Signup error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.error || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-200";

  const fieldClass = (hasError) =>
    `flex items-center gap-3 rounded-xl border bg-white/5 px-4 transition-all duration-300 hover:bg-white/[0.08] focus-within:-translate-y-0.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20 ${
      hasError
        ? "border-red-400"
        : "border-white/10 hover:border-indigo-400/50"
    }`;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-4 py-8 sm:py-12">

      {/* Animated Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/30 backdrop-blur-2xl md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white md:flex lg:p-12">

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10"></div>

          <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full border border-white/10"></div>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-md transition duration-300 hover:rotate-6 hover:scale-110">
              <FaFacebookMessenger className="text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-wide">
                Messenger
              </h1>
              <p className="text-xs text-indigo-100">
                Stay connected
              </p>
            </div>
          </div>

          {/* Welcome Content */}
          <div className="relative z-10 my-12">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md transition duration-500 hover:rotate-6 hover:scale-110">
              <FaUserPlus className="text-5xl" />
            </div>

            <h2 className="mb-5 text-4xl font-extrabold leading-tight lg:text-5xl">
              Your next
              <br />
              conversation
              <br />
              <span className="text-indigo-200">
                starts here.
              </span>
            </h2>

            <p className="max-w-sm text-base leading-7 text-indigo-100">
              Create your account and discover a better way
              to connect with your friends and loved ones
              through real-time messaging.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-2">
                <FaCheckCircle className="shrink-0 text-xl text-emerald-300" />
                <span className="text-sm text-indigo-50">
                  Connect with people instantly
                </span>
              </div>

              <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-2">
                <FaCheckCircle className="shrink-0 text-xl text-emerald-300" />
                <span className="text-sm text-indigo-50">
                  Enjoy real-time conversations
                </span>
              </div>

              <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-2">
                <FaCheckCircle className="shrink-0 text-xl text-emerald-300" />
                <span className="text-sm text-indigo-50">
                  Make every message count
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm text-indigo-100">
            <FaShieldAlt />
            <span>Your conversations, your people.</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-5"
          >

            {/* Mobile Logo */}
            <div className="mb-7 flex items-center gap-3 md:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition duration-300 hover:rotate-6 hover:scale-110">
                <FaFacebookMessenger className="text-2xl" />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-white">
                  Messenger
                </h1>
                <p className="text-sm text-indigo-200">
                  Stay connected
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-indigo-300">
                Join Our Community
              </p>

              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Create your
                <span className="mt-1 block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Account
                </span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Fill in your details and start chatting today.
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className={labelClass}>
                Full Name
              </label>

              <div className={fieldClass(errors.fullname)}>
                <FaUser className="shrink-0 text-slate-400 transition-colors duration-300 group-hover:text-indigo-300" />

                <input
                  id="fullname"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className={inputClass}
                  {...register("fullname", {
                    required: "Full name is required",
                  })}
                />
              </div>

              {errors.fullname && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>

              <div className={fieldClass(errors.email)}>
                <FaEnvelope className="shrink-0 text-slate-400" />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className={inputClass}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>

              <div className={fieldClass(errors.password)}>
                <FaLock className="shrink-0 text-slate-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className={inputClass}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-slate-400 transition duration-300 hover:scale-110 hover:text-indigo-300"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  {errors.password.message}
                </p>
              )}

              {password && (
                <p className="mt-2 text-xs text-slate-400">
                  {password.length >= 6
                    ? "✓ Password length looks good"
                    : "Use at least 6 characters"}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className={labelClass}
              >
                Confirm Password
              </label>

              <div className={fieldClass(errors.confirmPassword)}>
                <FaLock className="shrink-0 text-slate-400" />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  className={inputClass}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: validatePasswordMatch,
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="shrink-0 text-slate-400 transition duration-300 hover:scale-110 hover:text-indigo-300"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-xs font-medium text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}

              {confirmPassword &&
                confirmPassword === password && (
                  <p className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
                    <FaCheckCircle />
                    Passwords match
                  </p>
                )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mt-3 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 py-4 font-bold text-white shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:from-blue-400 hover:via-indigo-400 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>

              <span className="relative z-10">
                {loading ? "Creating Account..." : "Create Account"}
              </span>

              {!loading && (
                <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
              )}
            </button>

            {/* Login Link */}
            <p className="pt-2 text-center text-sm text-slate-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-300 transition-colors duration-300 hover:text-white hover:underline"
              >
                Login
              </Link>
            </p>

            {/* Footer */}
            <div className="border-t border-white/10 pt-4 text-center">
              <p className="text-xs leading-5 text-slate-400">
                <FaShieldAlt className="mr-1 inline-block" />
                Start your journey with Messenger.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
