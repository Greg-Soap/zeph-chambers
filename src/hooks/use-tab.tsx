"use client";

import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useTabUrlSync(defaultTab: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const setTab = useCallback(
    (tab: string) => {
      setSearchParams((prev) => {
        prev.set("tab", tab);
        return prev;
      });
    },
    [setSearchParams]
  );

  const currentTab = searchParams.get("tab") || defaultTab;

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setTab(defaultTab);
    }
  }, [defaultTab, searchParams, setTab]);

  return { currentTab, setTab };
}
