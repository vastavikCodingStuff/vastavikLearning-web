import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Forgot Password",
  description: "Reset your Vastavik Learning account password. Enter your email and we'll send you a secure reset link.",
  path: "/forgot-password",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}