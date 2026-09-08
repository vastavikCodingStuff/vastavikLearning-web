"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { growthApi } from "@/lib/api";
import { useToast } from "@/components/Toast";

export default function ReferPage() {
  const toast = useToast();
  const [status, setStatus] = useState<any>(null);
  const [shareStatus, setShareStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([growthApi.getReferralStatus().catch(() => null), growthApi.getShareStatus().catch(() => null)]).then(([r, s]) => {
      setStatus(r);
      setShareStatus(s);
      setLoading(false);
    });
  }, []);

  const genReferral = async () => {
    try {
      const r = await growthApi.generateReferralCode();
      toast("Code: " + r.code, "ok");
      const fresh = await growthApi.getReferralStatus().catch(() => null);
      if (fresh) setStatus(fresh);
    } catch (e: any) { toast(e.message, "err"); }
  };

  const genShare = async () => {
    try {
      const r = await growthApi.generateShareToken();
      if (r.share_url) {
        await navigator.clipboard.writeText(r.share_url);
        toast("Link copied: " + r.share_url, "ok");
        if (navigator.share) await navigator.share({ title: "Vastavik", text: r.share_url }).catch(() => {});
      } else toast(r.message || "Cap reached", "err");
      const fresh = await growthApi.getShareStatus().catch(() => null);
      if (fresh) setShareStatus(fresh);
    } catch (e: any) { toast(e.message, "err"); }
  };

  if (loading) return <div className="container section"><p>Loading...</p></div>;
  if (!status?.eligible && !shareStatus?.eligible) {
    return <div className="container section"><div className="b-card"><h2>Locked</h2><p className="muted">Refer & Earn and Share unlock after your first payment (or offline coupon).</p><Link href="/pricing" className="b-btn b-btn--primary mt-2">Go to Pricing</Link></div></div>;
  }

  return (
    <div className="container section">
      <h1>Refer & Earn · Share</h1>
      <div className="grid grid-2 mt-3">
        <div className="b-card">
          <h3>Refer & Earn — ₹25 × 3</h3>
          <p className="muted">Your code: <strong className="font-mono">{status?.code ?? "—"}</strong> {status?.code && <button className="b-btn b-btn--ghost" onClick={() => { navigator.clipboard.writeText(status.code); toast("Copied", "ok"); }}>Copy</button>}</p>
          <p className="muted text-sm">{status?.rewarded_count ?? 0} / {status?.cap ?? 3} rewarded · balance ₹{status?.credit_balance_inr ?? 0}</p>
          {!status?.code && <button className="b-btn b-btn--primary mt-2" onClick={genReferral}>Generate code</button>}
          {status?.code && <button className="b-btn mt-2" onClick={() => { const t = `Join Vastavik Pro! Code ${status.code} — https://vastavikcomputers.firebaseapp.com/r/${status.code}`; navigator.clipboard.writeText(t); toast("Share text copied", "ok"); }}>Share referral</button>}
          {status?.history?.length > 0 && <ul className="mt-2 text-sm">{status.history.map((h: any, i: number) => <li key={i}>{h.referee_email || h.referee_uid} — {h.status} {h.status === "rewarded" ? `+₹${h.reward_amount}` : ""}</li>)}</ul>}
        </div>
        <div className="b-card">
          <h3>Share App — ₹10 × 2</h3>
          <p className="muted text-sm">{shareStatus?.rewarded_count ?? 0} / {shareStatus?.cap ?? 2} rewarded</p>
          <button className="b-btn b-btn--primary mt-2" onClick={genShare}>Create share link</button>
          {shareStatus?.shares?.length > 0 && <ul className="mt-2 text-sm">{shareStatus.shares.map((s: any) => <li key={s.token} className="font-mono">{s.share_url} — {s.status} ({s.clicks} clicks)</li>)}</ul>}
        </div>
      </div>
    </div>
  );
}
