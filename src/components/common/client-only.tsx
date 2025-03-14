"use client";

import { useEffect, useState, type ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
}

/**
 *  prevent hydration errors that depend on client-side APIs
 */
export function ClientOnly({ children }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}
