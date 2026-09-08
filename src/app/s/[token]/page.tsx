"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { growthApi } from "@/lib/api";

export default function SPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  useEffect(() => {
    if (params?.token) {
      localStorage.setItem("pending_share_token", params.token);
      growthApi.trackShareClick(params.token).catch(() => {});
    }
    const t = setTimeout(() => router.replace("/signup"), 800);
    return () => clearTimeout(t);
  }, [params?.token, router]);
  return <div className="container section"><div className="b-card"><h2>Share link saved</h2><p className="muted">Redirecting to signup — sharer gets ₹10 after your first payment.</p></div></div>;
}
