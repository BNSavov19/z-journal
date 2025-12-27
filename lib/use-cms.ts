"use client";

import { useEffect, useMemo, useState } from "react";
import type { CMSData } from "./types";
import { saveCMSData, subscribeCMSData } from "./cms-data";

export const useCMSData = () => {
  const [data, setData] = useState<CMSData | null>(null);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    const boot = async () => {
      const { initial, unsubscribe: unsub } = await subscribeCMSData(
        (next) => {
          if (mounted) {
            setData(next);
          }
        }
      );
      unsubscribe = unsub;
      if (mounted) {
        setData(initial);
      }
    };

    boot();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  const update = async (next: CMSData) => {
    setData(next);
    await saveCMSData(next);
  };

  return useMemo(() => ({ data, update }), [data]);
};
