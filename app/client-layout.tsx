"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("hasVisited");
      if (!hasVisited && pathname === "/") {
        router.replace("/welcome");
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
