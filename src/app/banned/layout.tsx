import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Banned — Vastavik Learning",
  description: "Account moderation status notice.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BannedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
