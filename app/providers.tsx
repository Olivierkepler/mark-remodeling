"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function GlobalShortcutsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // cmd+k OR ctrl+k
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        router.push("/cmd");
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [router]);

  return <>{children}</>;
}
