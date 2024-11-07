import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAnchorNavigation() {
  const router = useRouter();

  const navigateTo = useCallback(
    (href: string) => {
      // Update the URL without using Next.js routing
      window.history.pushState({}, "", href);

      // Trigger a route change in Next.js
      router.push(href);
    },
    [router]
  );

  return navigateTo;
}
