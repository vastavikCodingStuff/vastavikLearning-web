"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { getBanReason, clearBanStatus } from "@/lib/api";

export default function BannedPage() {
  const router = useRouter();
  const { clearBan } = useAuth();
  const [reason, setReason] = useState("Your account has been banned and deleted by the administrator.");

  useEffect(() => {
    const r = getBanReason();
    if (r) setReason(r);
  }, []);

  const handleCreateNew = () => {
    clearBan();
    clearBanStatus();
    router.push("/signup");
  };

  const handleBackToLogin = () => {
    clearBan();
    clearBanStatus();
    router.push("/login");
  };

  return (
    <main
      className="flex min-h-[85vh] items-center justify-center p-4"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div
        className="w-full max-w-md p-8 text-center"
        style={{
          background: "var(--surface)",
          border: "3px solid #000000",
          borderRadius: "16px",
          boxShadow: "6px 6px 0px #000000",
        }}
      >
        {/* Tactile hazard badge */}
        <div className="flex justify-center mb-6">
          <div
            className="flex items-center justify-center w-24 h-24 rounded-2xl"
            style={{
              background: "#FEE2E2",
              border: "3px solid #EF4444",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-3xl font-black mb-3 tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Account Banned
        </h1>

        {/* Ban Reason Banner */}
        <div
          className="p-3 mb-4 rounded-xl text-sm font-semibold"
          style={{
            background: "#FEF2F2",
            border: "2px solid #EF4444",
            color: "#DC2626",
          }}
        >
          {reason}
        </div>

        {/* Description */}
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ opacity: 0.85 }}
        >
          All your previous records, enrollments, notes, and progress have been
          permanently wiped from the active system.
          <br /><br />
          To continue using Vastavik Learning, you must join again with a new account.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleCreateNew}
            className="w-full py-3 px-4 font-bold rounded-xl transition-transform active:translate-x-0.5 active:translate-y-0.5"
            style={{
              background: "#2563EB",
              color: "#FFFFFF",
              border: "2.5px solid #000000",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            👤 Create New Account →
          </button>

          <button
            type="button"
            onClick={handleBackToLogin}
            className="w-full py-3 px-4 font-semibold rounded-xl transition-transform active:translate-x-0.5 active:translate-y-0.5"
            style={{
              background: "var(--surface2)",
              color: "var(--text)",
              border: "2px solid #000000",
              boxShadow: "3px 3px 0px #000000",
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </main>
  );
}
