import { getSubscription } from "../../../actions/subscription";

interface Props { params: Promise<{ guildId: string }> }

const TIER_INFO: Record<string, { color: string; badge: string; perks: string[] }> = {
  enterprise: { color: "var(--purple)", badge: "badge-purple", perks: ["Unlimited commands", "Priority support", "Custom domain", "90-day analytics", "All features unlocked"] },
  pro: { color: "var(--accent)", badge: "badge-accent", perks: ["50 custom commands", "25 automod rules", "30-day analytics", "Advanced logging"] },
  basic: { color: "var(--green)", badge: "badge-green", perks: ["10 custom commands", "10 automod rules", "7-day analytics"] },
  free: { color: "var(--text-3)", badge: "badge-gray", perks: ["5 custom commands", "5 automod rules", "Basic logging"] },
};

export default async function SubscriptionPage({ params }: Props) {
  const { guildId } = await params;
  const sub = await getSubscription(guildId);
  const tier = sub?.tier ?? "free";
  const info = TIER_INFO[tier] ?? TIER_INFO.free;

  return (
    <div style={{ padding: "32px", maxWidth: "600px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em" }}>Subscription</h1>
        <div className="mono" style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "4px" }}>{guildId}</div>
      </div>

      {/* Current tier */}
      <div className="card" style={{ padding: "24px", marginBottom: "20px", borderColor: info.color + "44" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "6px" }}>
              Current Plan
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", color: info.color }}>
              {tier.toUpperCase()}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            {sub ? (
              <>
                <span className="badge badge-green">Active</span>
                {sub.provider && sub.provider !== "free" && (
                  <div style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "6px" }}>
                    via {sub.provider}
                  </div>
                )}
                {sub.expiresAt && (
                  <div style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "4px" }}>
                    Expires {new Date(sub.expiresAt).toLocaleDateString()}
                  </div>
                )}
              </>
            ) : (
              <span className="badge badge-gray">Free Tier</span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {info.perks.map(perk => (
            <div key={perk} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
              <span style={{ color: info.color }}>✓</span>
              <span style={{ color: "var(--text-2)" }}>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tier comparison */}
      <div className="section-title">Available Plans</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {["basic", "pro", "enterprise"].map(t => {
          const ti = TIER_INFO[t];
          const isCurrent = t === tier;
          return (
            <div key={t} className="card" style={{ padding: "16px 20px", borderColor: isCurrent ? ti.color + "44" : "var(--border)", opacity: isCurrent ? 1 : 0.7 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className={`badge ${ti.badge}`}>{t}</span>
                  {isCurrent && <span style={{ fontSize: "11px", color: "var(--text-3)" }}>Current plan</span>}
                </div>
                {!isCurrent && (
                  <button className="btn btn-ghost" style={{ fontSize: "12px", padding: "5px 12px" }}>
                    Upgrade
                  </button>
                )}
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
                {ti.perks.slice(0, 3).map(p => (
                  <span key={p} style={{ fontSize: "11px", color: "var(--text-3)" }}>· {p}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "16px", padding: "14px", background: "var(--bg-2)", borderRadius: "8px", fontSize: "12px", color: "var(--text-3)" }}>
        To upgrade, use <span className="mono" style={{ color: "var(--text-2)" }}>/premium activate</span> in your Discord server.
      </div>
    </div>
  );
}