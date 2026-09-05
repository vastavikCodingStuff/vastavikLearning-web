"use client";
import { useEffect } from "react";

/**
 * Injects a JSON-LD script into the document head.
 * Use one component per page, pass any number of schema objects.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  useEffect(() => {
    const items = Array.isArray(data) ? data : [data];
    const id = `jsonld-${Math.random().toString(36).slice(2, 10)}`;
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = id;
    s.text = JSON.stringify(items);
    document.head.appendChild(s);
    return () => {
      const e = document.getElementById(id);
      if (e) e.remove();
    };
  }, [data]);
  return null;
}
