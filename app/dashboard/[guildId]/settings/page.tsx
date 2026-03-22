import { getGuildConfig } from "../../../actions/guild";

interface SettingsPageProps {
  params: Promise<{ guildId: string }>;
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { guildId } = await params;
  const config = await getGuildConfig(guildId);

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
        Server Settings
      </h1>
      {!config ? (
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          Server configuration not found. Run /setup in Discord first.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            maxWidth: "32rem",
          }}
        >
          <SettingsRow label="Guild ID" value={config.guildId} />
          <SettingsRow label="Prefix" value={config.prefix} />
          <SettingsRow
            label="Moderation"
            value={config.moderationEnabled ? "Enabled" : "Disabled"}
          />
          <SettingsRow label="Auto-Mod Level" value={config.autoModLevel} />
          <SettingsRow label="Premium Tier" value={config.premiumTier} />
          <SettingsRow
            label="Custom Domain"
            value={config.customDomain || "None"}
          />
        </div>
      )}
    </div>
  );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
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
