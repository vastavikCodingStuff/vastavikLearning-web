import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Vastavik Learning — Code. Create. Conquer.",
  description:
    "A high-performance learning platform with live classrooms, AI tutoring, code execution, OCR exercise scanning and a bold Neo-Brutalist design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232563EB'/%3E%3Ctext x='50' y='65' font-size='60' text-anchor='middle' fill='white' font-family='Arial' font-weight='900'%3EV%3C/text%3E%3C/svg%3E"
        />
        <style>{`
          :root { --font-display: 'Space Grotesk', Inter, system-ui, sans-serif; --font-body: 'Inter', system-ui, sans-serif; --font-mono: 'JetBrains Mono', monospace; }
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
