import { getSubscription } from "../../../actions/subscription";

interface SubscriptionPageProps {
  params: Promise<{ guildId: string }>;
}

export default async function SubscriptionPage({ params }: SubscriptionPageProps) {
  const { guildId } = await params;
  const subscription = await getSubscription(guildId);

  return (
    <div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "1.5rem",
          letterSpacing: "-0.02em",
        }}
      >
        Subscription
      </h1>
      {!subscription ? (
        <div
          style={{
            padding: "2rem",
            border: "1px solid var(--border-primary)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            No active subscription. Use /premium activate in Discord to
            subscribe.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            maxWidth: "32rem",
          }}
        >
          <InfoRow label="Tier" value={subscription.tier.toUpperCase()} />
          <InfoRow label="Status" value={subscription.status} />
          <InfoRow label="Provider" value={subscription.provider} />
          <InfoRow
            label="Expires"
            value={new Date(subscription.expiresAt).toLocaleDateString()}
          />
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem",
        border: "1px solid var(--border-primary)",
        backgroundColor: "var(--bg-card)",
      }}
    >
      <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
        {label}
      </span>
      <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{value}</span>
    </div>
  );
}
