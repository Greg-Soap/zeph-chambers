"use client";

import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAnchorNavigation } from "./use-navigation";

export function useTabUrlSync(defaultTab: string) {
  const navigateTo = useAnchorNavigation();
  const searchParams = useSearchParams();

  const setTab = useCallback(
    (tab: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("tab", tab);
      navigateTo(`?${params.toString()}`);
    },
    [navigateTo, searchParams]
  );

  const currentTab = searchParams.get("tab") || defaultTab;

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setTab(defaultTab);
    }
  }, [defaultTab, searchParams, setTab]);

  return { currentTab, setTab };
}
