type AdSlotProps = {
  label: string;
  size?: "wide" | "sidebar" | "inline";
};

export function AdSlot({ label, size = "inline" }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  return (
    <aside className={`ad-slot ad-slot--${size}`} aria-label="Advertisement">
      <span>Advertisement</span>
      {client && slot ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <p>{label}</p>
      )}
    </aside>
  );
}
