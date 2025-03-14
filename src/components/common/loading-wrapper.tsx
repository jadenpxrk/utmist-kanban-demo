"use client";

import { useEffect, useRef, useState } from "react";

import { DashboardSkeleton } from "@/components/common/dashboard-skeleton";
import { usePathname } from "next/navigation";

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export function LoadingWrapper({ children }: LoadingWrapperProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle all loading states with a single effect
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set loading to true when path changes
    setIsLoading(true);

    // Set a new timer
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Clean up on unmount or before next effect run
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname]); // Only depend on pathname changes

  return isLoading ? <DashboardSkeleton /> : children;
}
