"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("hasVisited");
      if (!hasVisited && pathname === "/") {
        router.replace("/welcome");
        // 不设 ready，避免瞬间渲染后再跳转
        return;
      }
    }
    setReady(true);
  }, [pathname, router]);

  // 没准备好就什么都不渲染，防止 SSR/CSR 不一致
  if (!ready) return null;

  return <>{children}</>;
}
