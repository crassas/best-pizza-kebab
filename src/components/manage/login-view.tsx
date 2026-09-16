import React from "react";
import { useOwnerAuth } from "@/lib/owner-auth";
import { ShieldCheck, LogIn, AlertCircle, ArrowLeft, Utensils } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function LoginView() {
  const { signInWithGoogle, isLoading, user, isAuthorized, signOut, authError } = useOwnerAuth();

  return (
    <div className="min-h-screen bg-brand-black text-cream flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border-2 border-line bg-surface px-3 py-2 text-sm font-bold text-cream hover:border-brand-yellow transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Website</span>
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
          <ShieldCheck className="size-4 text-brand-yellow" />
          <span>Owner Area</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="mx-auto w-full max-w-md my-auto py-8">
        <div className="rounded-2xl border-4 border-black bg-surface-card p-6 sm:p-8 shadow-fastfood">
          {/* Header Banner */}
          <div className="text-center pb-6 border-b-2 border-line">
            <div className="mx-auto size-16 rounded-full bg-brand-red border-3 border-black flex items-center justify-center text-white shadow-fastfood mb-4">
              <Utensils className="size-8" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide uppercase">
              Restaurant Management
            </h1>
            <p className="text-sm text-cream/70 mt-1 font-medium">
              Best Kebab & Pizza · Owner Portal
            </p>
          </div>

          {/* Signed In But Not Authorized State */}
          {user && !isAuthorized && !isLoading && (
            <div className="mt-6 rounded-xl border-2 border-brand-red bg-brand-red/10 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-brand-red font-bold mb-1">
                <AlertCircle className="size-5 shrink-0" />
                <span>Access Restricted</span>
              </div>
              <p className="text-xs text-cream/80 mb-3">
                Signed in as <strong className="text-white">{user.email}</strong>. This account is not on the authorized restaurant owner whitelist.
              </p>
              <button
                type="button"
                onClick={() => signOut()}
                className="w-full rounded-lg border-2 border-black bg-surface py-2 text-xs font-bold text-cream hover:bg-black transition-colors"
              >
                Sign Out / Switch Account
              </button>
            </div>
          )}

          {/* Error Message */}
          {authError && (
            <div className="mt-6 rounded-xl border-2 border-brand-red bg-brand-red/15 p-3 text-xs text-brand-red font-medium text-center">
              {authError}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8 space-y-4">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 rounded-xl border-3 border-black bg-brand-yellow px-5 py-4 text-base font-black text-black shadow-fastfood hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
            >
              <LogIn className="size-5 shrink-0" />
              <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
            </button>

            <div className="rounded-lg bg-surface/50 p-3 border border-line text-center text-xs text-muted">
              🔒 Direct Google Authentication with encrypted Firestore security rules.
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-muted pb-2">
        Best Kebab & Pizza Owner Management System
      </div>
    </div>
  );
}
