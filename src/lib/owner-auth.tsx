import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, fbSignOut, type User, auth, googleProvider, db } from "@/lib/firebase";
import { isAuthorizedOwner } from "@/lib/admin-config";

interface OwnerAuthContextType {
  user: User | null;
  isAuthorized: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  authError: string | null;
}

const OwnerAuthContext = createContext<OwnerAuthContextType | null>(null);

export function OwnerAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthError(null);

      if (!currentUser) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        let allowed = isAuthorizedOwner(currentUser.email);
        if (!allowed) {
          const candidateIds = [currentUser.uid, currentUser.email].filter(Boolean) as string[];
          for (const id of candidateIds) {
            const snap = await getDoc(doc(db, "admins", id));
            if (snap.exists()) {
              const data = snap.data() as { role?: string };
              if (id === currentUser.email || data.role === "admin") {
                allowed = true;
                break;
              }
            }
          }
        }
        setIsAuthorized(allowed);
      } catch (err: any) {
        console.warn("Owner authorization check failed:", err?.message);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setAuthError(err.message || "Failed to sign in with Google");
      }
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
    } catch (err: any) {
      setAuthError(err.message || "Failed to sign out");
    }
  };

  return (
    <OwnerAuthContext.Provider value={{ user, isAuthorized, isLoading, signInWithGoogle, signOut, authError }}>
      {children}
    </OwnerAuthContext.Provider>
  );
}

export function useOwnerAuth() {
  const context = useContext(OwnerAuthContext);
  if (!context) throw new Error("useOwnerAuth must be used within an OwnerAuthProvider");
  return context;
}
