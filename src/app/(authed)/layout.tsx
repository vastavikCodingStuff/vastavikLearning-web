"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // wait for hydration; if no user after mount, redirect
      const t = setTimeout(() => {
        if (!localStorage.getItem("vastavik_user")) router.replace("/login");
      }, 200);
      return () => clearTimeout(t);
    }
  }, [user, router]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
