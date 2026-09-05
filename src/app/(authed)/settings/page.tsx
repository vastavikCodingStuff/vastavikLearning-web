"use client";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/Toast";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [weekly, setWeekly] = useState(false);

  return (
    <div className="b-dash">
      <Sidebar />
      <main className="b-dash__main">
        <h1 className="mb-3">Settings</h1>

        <div className="b-card mb-3">
          <h3>👤 Account</h3>
          <div className="grid grid-2 mt-2">
            <div>
              <label className="b-label">Name</label>
              <input className="b-input" defaultValue={user?.name || ""} />
            </div>
            <div>
              <label className="b-label">Email</label>
              <input className="b-input" defaultValue={user?.email || ""} type="email" />
            </div>
          </div>
          <button className="b-btn b-btn--primary mt-3" onClick={() => toast("Profile updated", "ok")}>Save changes</button>
        </div>

        <div className="b-card mb-3">
          <h3>🎨 Appearance</h3>
          <div className="flex gap-1 mt-2" style={{ flexWrap: "wrap" }}>
            {(["light", "dark", "system"] as const).map((t) => (
              <button key={t} className={"b-btn b-btn--sm " + (theme === t ? "b-btn--primary" : "b-btn--ghost")} onClick={() => setTheme(t)}>{t[0].toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="b-card mb-3">
          <h3>🔔 Notifications</h3>
          {[
            { label: "Email notifications", val: emailNotif, set: setEmailNotif, desc: "Course updates, streaks, certificates" },
            { label: "Push notifications", val: pushNotif, set: setPushNotif, desc: "Live class reminders, quiz alerts" },
            { label: "Weekly progress report", val: weekly, set: setWeekly, desc: "Summary every Sunday" },
          ].map((row) => (
            <label key={row.label} className="flex items-center gap-2 mt-2" style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={row.val} onChange={(e) => row.set(e.target.checked)} style={{ width: 20, height: 20 }} />
              <div style={{ flex: 1 }}>
                <strong style={{ display: "block" }}>{row.label}</strong>
                <span className="muted" style={{ fontSize: "0.85rem" }}>{row.desc}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="b-card mb-3">
          <h3>🔒 Security</h3>
          <div className="grid grid-2 mt-2">
            <button className="b-btn b-btn--ghost" onClick={() => toast("Password reset email sent", "ok")}>Change password</button>
            <button className="b-btn b-btn--ghost" onClick={() => toast("2FA enabled", "ok")}>Enable 2FA</button>
          </div>
        </div>

        <div className="b-card b-card--pink" style={{ color: "var(--white)" }}>
          <h3>⚠ Danger zone</h3>
          <p style={{ opacity: 0.9, fontSize: "0.95rem" }}>Permanently delete your account and all data.</p>
          <button className="b-btn mt-2" style={{ background: "var(--white)", color: "var(--pink)" }} onClick={() => toast("Account deletion requested", "err")}>Delete account</button>
        </div>
      </main>
    </div>
  );
}
