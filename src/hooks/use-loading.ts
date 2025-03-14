import { useEffect, useState } from "react";

/**
 * hook to simulate loading state for components
 * @param delay - loading duration in milliseconds
 * @returns loading state
 */
export function useLoading(delay = 1000) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
}
