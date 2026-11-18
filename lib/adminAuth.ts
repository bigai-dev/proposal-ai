"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Demo-grade session flag. This is intentionally not real security —
// the portal is a workshop demo with no sensitive data.
const SESSION_KEY = "cf_admin_session";

export const DEMO_CREDENTIALS = {
  email: "admin@codeforge.com.my",
  password: "forge2026",
};

export function signIn() {
  localStorage.setItem(SESSION_KEY, new Date().toISOString());
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function isSignedIn(): boolean {
  return localStorage.getItem(SESSION_KEY) !== null;
}

/** Redirects to /admin when not signed in. Returns true once verified. */
export function useAdminGuard(): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isSignedIn()) {
      setReady(true);
    } else {
      router.replace("/admin");
    }
  }, [router]);

  return ready;
}
