"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { isUserBanned } from "@/lib/api";
import PrivacyWatermark from "@/components/PrivacyWatermark";

export default function AuthedClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isBanned } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isBanned || isUserBanned()) {
      router.replace("/banned");
      return;
    }

    if (user === null) {
      const t = setTimeout(() => {
        if (!localStorage.getItem("vastavik_user")) router.replace("/login");
      }, 200);
      return () => clearTimeout(t);
    }
  }, [user, isBanned, router]);

  return (
    <>
      <PrivacyWatermark />
      {children}
    </>
  );
}