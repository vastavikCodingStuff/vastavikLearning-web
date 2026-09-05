import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Sign Up — Create Your Free Account",
  description: "Create a free Vastavik Learning account in under 30 seconds. No credit card required. Email, Google or GitHub.",
  path: "/signup",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}