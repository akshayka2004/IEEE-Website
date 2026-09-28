"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type Kind = "success" | "error" | "info";
type ToastItem = { id: number; message: string; kind: Kind; leaving: boolean };
type Ctx = { toast: (message: string, kind?: Kind) => void };

const ToastContext = createContext<Ctx>({ toast: () => {} });

export const useToast = () => useContext(ToastContext);

const EXIT_MS = 320;

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), EXIT_MS);
  }, []);

  const toast = useCallback(
    (message: string, kind: Kind = "info") => {
      const id = nextId.current++;
      setItems((prev) => [...prev.slice(-2), { id, message, kind, leaving: false }]);
      window.setTimeout(() => remove(id), 4500);
    },
    [remove]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="false">
        {items.map((t) => (
          <div key={t.id} className={`toast toast-${t.kind}${t.leaving ? " is-leaving" : ""}`} role="status">
            <span className="toast-dot" aria-hidden="true" />
            <span>{t.message}</span>
            <button className="toast-close" aria-label="Dismiss notification" onClick={() => remove(t.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
