import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download Android App (v1.0.51) — Vastavik Learning",
  description:
    "Download the official Vastavik Learning Android application. Includes live coding classes, AI tutor, Monaco code editor, and ICSE/CBSE curriculum.",
  alternates: { canonical: "/download" },
};

const MAIN_APK_URL =
  "https://github.com/vastavikCodingStuff/vastavikLearning-app/releases/download/v1.0.51/vastavikLearning-v1.0.51.apk";
const EXTENSION_APK_URL =
  "https://github.com/vastavikCodingStuff/vastavikLearning-app/releases/download/v1.0.51/vastavik-codeoss-extension.apk";
const ALL_RELEASES_URL =
  "https://github.com/vastavikCodingStuff/vastavikLearning-app/releases";

export default function DownloadPage() {
  return (
    <>
      <section className="b-page-head b-page-head--blue">
        <div className="container">
          <span
            className="b-tag mb-2"
            style={{ display: "inline-flex", background: "var(--yellow)" }}
          >
            📱 OFFICIAL ANDROID RELEASE
          </span>
          <h1>Get Vastavik Learning on Android</h1>
          <p>
            Experience lightning-fast native performance, hardware-protected offline
            viewing, Monaco code editor, and live classrooms on your phone or tablet.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Main Download Cards */}
          <div className="grid grid-2 mb-4" style={{ gap: "24px" }}>
            {/* Main Application */}
            <div
              className="b-card flex flex-col justify-between"
              style={{
                border: "3px solid #000000",
                boxShadow: "6px 6px 0px #000000",
                borderRadius: "16px",
                background: "var(--surface)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="b-tag b-tag--blue">PRIMARY APP</span>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{ background: "var(--lime)", border: "1.5px solid #000" }}
                  >
                    v1.0.51 (Latest)
                  </span>
                </div>
                <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Vastavik Learning App
                </h2>
                <p className="text-sm mb-4" style={{ opacity: 0.85 }}>
                  The full learning suite: interactive video lessons, quizzes, practice problems,
                  real-time AI tutor, and progress tracking.
                </p>

                <div
                  className="p-3 mb-4 rounded-xl text-xs flex justify-between"
                  style={{ background: "var(--surface2)", border: "1.5px solid #000" }}
                >
                  <span><strong>Size:</strong> ~63.5 MB</span>
                  <span><strong>Package:</strong> com.vastavik.computer</span>
                  <span><strong>Min Android:</strong> 7.0+ (Nougat)</span>
                </div>
              </div>

              <a
                href={MAIN_APK_URL}
                className="b-btn b-btn--primary b-btn--block b-btn--lg text-center"
                style={{
                  boxShadow: "4px 4px 0px #000000",
                  textDecoration: "none",
                }}
              >
                📥 Download Main APK (v1.0.51)
              </a>
            </div>

            {/* CodeOSS Companion Extension */}
            <div
              className="b-card flex flex-col justify-between"
              style={{
                border: "3px solid #000000",
                boxShadow: "6px 6px 0px #000000",
                borderRadius: "16px",
                background: "var(--surface)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="b-tag b-tag--pink">OPTIONAL PACK</span>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{ background: "var(--yellow)", border: "1.5px solid #000" }}
                  >
                    Extension v16
                  </span>
                </div>
                <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  CodeOSS Companion
                </h2>
                <p className="text-sm mb-4" style={{ opacity: 0.85 }}>
                  Companion execution pack containing Monaco / VS Code Web editor,
                  Ubuntu terminal runtime, and sandboxed code execution tools.
                </p>

                <div
                  className="p-3 mb-4 rounded-xl text-xs flex justify-between"
                  style={{ background: "var(--surface2)", border: "1.5px solid #000" }}
                >
                  <span><strong>Size:</strong> ~14.1 MB</span>
                  <span><strong>Type:</strong> Companion Bridge</span>
                  <span><strong>Status:</strong> Ready</span>
                </div>
              </div>

              <a
                href={EXTENSION_APK_URL}
                className="b-btn b-btn--ghost b-btn--block b-btn--lg text-center"
                style={{
                  border: "2.5px solid #000000",
                  boxShadow: "4px 4px 0px #000000",
                  textDecoration: "none",
                }}
              >
                🧩 Download Extension APK
              </a>
            </div>
          </div>

          {/* Installation Instructions & Highlights */}
          <div
            className="b-card p-6"
            style={{
              border: "3px solid #000000",
              boxShadow: "6px 6px 0px #000000",
              borderRadius: "16px",
              background: "var(--surface)",
            }}
          >
            <h3 className="text-xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>
              ⚡ How to Install on Android
            </h3>

            <div className="grid grid-3" style={{ gap: "20px" }}>
              <div className="p-4 rounded-xl" style={{ background: "var(--surface2)", border: "2px solid #000" }}>
                <strong className="block text-base mb-1">1. Download APK</strong>
                <p className="text-xs" style={{ opacity: 0.8 }}>
                  Click <strong>Download Main APK</strong> above. Your mobile browser will save the file to your Downloads folder.
                </p>
              </div>

              <div className="p-4 rounded-xl" style={{ background: "var(--surface2)", border: "2px solid #000" }}>
                <strong className="block text-base mb-1">2. Allow Installation</strong>
                <p className="text-xs" style={{ opacity: 0.8 }}>
                  Tap the downloaded file. When prompted by Android, enable &quot;Install unknown apps&quot; or &quot;Allow from this source&quot;.
                </p>
              </div>

              <div className="p-4 rounded-xl" style={{ background: "var(--surface2)", border: "2px solid #000" }}>
                <strong className="block text-base mb-1">3. Open &amp; Sign In</strong>
                <p className="text-xs" style={{ opacity: 0.8 }}>
                  Launch Vastavik Learning from your app drawer. Sign in with your account to start learning immediately.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs font-semibold" style={{ opacity: 0.75 }}>
                Verified clean build • SHA-256 integrity checksums published on GitHub
              </span>
              <a
                href={ALL_RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold underline"
              >
                View all GitHub Releases →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
