"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function AuthedClientLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      const t = setTimeout(() => {
        if (!localStorage.getItem("vastavik_user")) router.replace("/login");
      }, 200);
      return () => clearTimeout(t);
    }
  }, [user, router]);

  return <>{children}</>;
}