"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Toast = { msg: string; kind: "" | "ok" | "err" } | null;
const Ctx = createContext<(msg: string, kind?: "" | "ok" | "err") => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState<Toast>(null);
  const show = (msg: string, kind: "" | "ok" | "err" = "") => {
    setT({ msg, kind });
    setTimeout(() => setT(null), 3000);
  };
  return (
    <Ctx.Provider value={show}>
      {children}
      {t && (
        <div className={"b-toast b-toast--show" + (t.kind ? " b-toast--" + t.kind : "")}>{t.msg}</div>
      )}
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);
