"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  size?: "wide" | "sidebar" | "inline";
};

export function AdSlot({ size = "inline" }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  useEffect(() => {
    if (!client || !slot) {
      return;
    }

    window.adsbygoogle = window.adsbygoogle ?? [];
    window.adsbygoogle.push({});
  }, [client, slot]);

  if (!client || !slot) {
    return null;
  }

  return (
    <aside className={`ad-slot ad-slot--${size}`} aria-label="Advertisement">
      <span>Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
