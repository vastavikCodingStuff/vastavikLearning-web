"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RPage({ params }: { params: { code: string } }) {
  const router = useRouter();
  useEffect(() => {
    if (params?.code) localStorage.setItem("pending_referral_code", params.code.toUpperCase());
    const t = setTimeout(() => router.replace("/signup"), 800);
    return () => clearTimeout(t);
  }, [params?.code, router]);
  return <div className="container section"><div className="b-card"><h2>Referral code {params.code?.toUpperCase()} saved</h2><p className="muted">Redirecting to signup — your friend will be credited after your first payment.</p></div></div>;
}
