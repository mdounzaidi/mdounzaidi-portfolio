import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import FormInput from "./FormInput";
import LoadingButton from "./LoadingButton";
import StatusMessage from "./StatusMessage";
import { useAuth } from "../context/AuthContext";
import { register } from "../services/authApi";
import {
  validateEmail,
  validateMax,
  validatePassword,
  validateUsername,
} from "../utils/validation";

const emptyLogin = {
  identifier: "",
  password: "",
};

const emptySignup = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [signupForm, setSignupForm] = useState(emptySignup);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function updateLogin(event) {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  }

  function updateSignup(event) {
    setSignupForm({ ...signupForm, [event.target.name]: event.target.value });
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setErrors({});
    setStatus(null);
  }

  function validateLogin() {
    const nextErrors = {};
    if (!loginForm.identifier.trim()) nextErrors.identifier = "Username or email is required";
    const passwordError = validatePassword(loginForm.password);
    if (passwordError) nextErrors.password = passwordError;
    return nextErrors;
  }

  function validateSignup() {
    const nextErrors = {};
    if (!signupForm.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    } else {
      const firstNameError = validateMax(signupForm.firstName, 20, "First name");
      if (firstNameError) nextErrors.firstName = firstNameError;
    }

    const lastNameError = validateMax(signupForm.lastName, 20, "Last name");
    if (lastNameError) nextErrors.lastName = lastNameError;

    const usernameError = validateUsername(signupForm.username);
    if (usernameError) nextErrors.username = usernameError;

    const emailError = validateEmail(signupForm.email);
    if (emailError) nextErrors.email = emailError;

    const passwordError = validatePassword(signupForm.password);
    if (passwordError) nextErrors.password = passwordError;

    if (signupForm.password !== signupForm.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    return nextErrors;
  }

  async function handleLogin(event) {
    event.preventDefault();
    const nextErrors = validateLogin();
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      await signIn({
        identifier: loginForm.identifier.trim(),
        password: loginForm.password,
      });
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(event) {
    event.preventDefault();
    const nextErrors = validateSignup();
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      await register({
        firstName: signupForm.firstName.trim(),
        lastName: signupForm.lastName.trim(),
        username: signupForm.username.trim(),
        email: signupForm.email.trim(),
        password: signupForm.password,
      });
      setSignupForm(emptySignup);
      setStatus({
        type: "success",
        message: "Account created. Please check your email to verify your account before logging in.",
      });
      setMode("login");
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  const activeForm = mode === "login" ? loginForm : signupForm;

  return (
    <section className="min-h-screen bg-zinc-900 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#1d1f1e] shadow-[0_0_80px_rgba(0,0,0,0.35)]">
        <div className="hidden w-[42%] flex-col justify-between bg-[#004D43] p-10 lg:flex">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-zinc-200">
              Secure Access
            </p>
            <h1 className="font-FoundersGroteskCondensed text-6xl uppercase leading-none">
              Enter
              <br />
              Your Space
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-zinc-100/80">
              Sign in to manage articles, account details, and protected
              portfolio content.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-black/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-200/70">
              Account note
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-100/80">
              New accounts need email verification before they can access the
              dashboard.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center bg-zinc-900 p-6 sm:p-10 lg:w-[58%] lg:p-12">
          <div className="mb-8 flex w-fit rounded-full border border-zinc-800 bg-zinc-950 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-full px-5 py-2 text-sm uppercase tracking-wider transition-colors ${
                mode === "login"
                  ? "bg-[#004D43] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`rounded-full px-5 py-2 text-sm uppercase tracking-wider transition-colors ${
                mode === "signup"
                  ? "bg-[#004D43] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              Welcome Back
            </p>
            <h2 className="mt-3 font-FoundersGroteskCondensed text-5xl uppercase leading-none sm:text-6xl">
              {mode === "login" ? "Login To Continue" : "Create Your Account"}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
              {mode === "login"
                ? "Use your username or email with your password."
                : "Create an account, then verify your email before logging in."}
            </p>
          </div>

          <div className="mt-8">
            <StatusMessage type={status?.type} message={status?.message} />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              disabled
              className="flex cursor-not-allowed items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-zinc-500"
            >
              <FaGoogle />
              Google unavailable
            </button>
            <button
              type="button"
              disabled
              className="flex cursor-not-allowed items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-zinc-500"
            >
              <FaGithub />
              GitHub unavailable
            </button>
          </div>

          <form
            className="mt-8 space-y-4"
            onSubmit={mode === "login" ? handleLogin : handleSignup}
          >
            {mode === "signup" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    name="firstName"
                    placeholder="First name"
                    value={activeForm.firstName}
                    onChange={updateSignup}
                    error={errors.firstName}
                  />
                  <FormInput
                    name="lastName"
                    placeholder="Last name"
                    value={activeForm.lastName}
                    onChange={updateSignup}
                    error={errors.lastName}
                  />
                </div>
                <FormInput
                  name="username"
                  placeholder="Username"
                  value={activeForm.username}
                  onChange={updateSignup}
                  error={errors.username}
                />
              </>
            )}

            <FormInput
              name={mode === "login" ? "identifier" : "email"}
              type={mode === "login" ? "text" : "email"}
              placeholder={mode === "login" ? "Username or email" : "Email address"}
              value={mode === "login" ? activeForm.identifier : activeForm.email}
              onChange={mode === "login" ? updateLogin : updateSignup}
              error={mode === "login" ? errors.identifier : errors.email}
            />

            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              value={activeForm.password}
              onChange={mode === "login" ? updateLogin : updateSignup}
              error={errors.password}
            />

            {mode === "signup" && (
              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={activeForm.confirmPassword}
                onChange={updateSignup}
                error={errors.confirmPassword}
              />
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between gap-4 text-sm text-zinc-400">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-[#004D43]"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="transition-colors hover:text-white">
                  Forgot password?
                </Link>
              </div>
            )}

            <LoadingButton type="submit" loading={loading} className="mt-4">
              {mode === "login" ? "Login Now" : "Create Account"}
            </LoadingButton>
          </form>

          <p className="mt-6 text-sm text-zinc-500">
            {mode === "login"
              ? "New here? Switch to sign up and create your account."
              : "Already have an account? Switch back to login."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
