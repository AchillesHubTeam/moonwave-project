import { connectDB } from "../../../lib/db";
import { GuildConfigModel } from "../../../lib/models/guild-config.model";
import { ModerationLogModel } from "../../../lib/models/moderation-log.model";
import Link from "next/link";

async function getGuildData(guildId: string) {
  await connectDB();
  const [config, modCount, recentMods] = await Promise.all([
    GuildConfigModel.findOne({ guildId }).lean(),
    ModerationLogModel.countDocuments({ guildId }),
    ModerationLogModel.find({ guildId }).sort({ createdAt: -1 }).limit(5).lean(),
  ]);
  return { config, modCount, recentMods };
}

const ACTION_COLOR: Record<string, string> = {
  ban: "badge-red", kick: "badge-red", timeout: "badge-yellow",
  warn: "badge-yellow", unban: "badge-green", massban: "badge-red",
  softban: "badge-red", note: "badge-gray", lockdown: "badge-yellow", unlock: "badge-green",
};

interface Props { params: Promise<{ guildId: string }> }

export default async function GuildOverviewPage({ params }: Props) {
  const { guildId } = await params;
  const { config, modCount, recentMods } = await getGuildData(guildId);

  if (!config) {
    return (
      <div style={{ padding: "32px" }}>
        <div className="card" style={{ padding: "48px", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "6px" }}>Server not found</div>
          <div style={{ color: "var(--text-2)", fontSize: "13px" }}>
            Guild ID: <span className="mono">{guildId}</span> is not registered in the database.
          </div>
        </div>
      </div>
    );
  }

  const c = config as any;

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Server Overview
            </h1>
            <span className={`badge ${c.premiumTier === "enterprise" ? "badge-purple" : c.premiumTier === "pro" ? "badge-accent" : "badge-gray"}`}>
              {c.premiumTier}
            </span>
          </div>
          <div className="mono" style={{ fontSize: "12px", color: "var(--text-3)" }}>{guildId}</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href={`/dashboard/${guildId}/settings`}>
            <button className="btn btn-ghost">Settings</button>
          </Link>
          <Link href={`/dashboard/${guildId}/moderation`}>
            <button className="btn btn-primary">View Logs</button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--text)" }}>{modCount}</div>
          <div className="stat-label">Total Actions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: c.moderationEnabled ? "var(--green)" : "var(--red)" }}>
            {c.moderationEnabled ? "ON" : "OFF"}
          </div>
          <div className="stat-label">Moderation</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: c.antiRaidEnabled ? "var(--green)" : "var(--red)" }}>
            {c.antiRaidEnabled ? "ON" : "OFF"}
          </div>
          <div className="stat-label">Anti-Raid</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: c.autoModLevel === "off" ? "var(--text-3)" : "var(--yellow)" }}>
            {c.autoModLevel?.toUpperCase() ?? "OFF"}
          </div>
          <div className="stat-label">AutoMod Level</div>
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Recent mod actions */}
        <div className="card">
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "13px" }}>Recent Actions</span>
            <Link href={`/dashboard/${guildId}/moderation`}>
              <span style={{ fontSize: "12px", color: "var(--accent-2)" }}>View all →</span>
            </Link>
          </div>
          {recentMods.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--text-3)", fontSize: "13px" }}>
              No actions yet
            </div>
          ) : (
            recentMods.map((log: any) => (
              <div key={String(log._id)} className="table-row" style={{ gridTemplateColumns: "auto 1fr auto" }}>
                <span className={`badge ${ACTION_COLOR[log.action] ?? "badge-gray"}`}>{log.action}</span>
                <span className="mono" style={{ fontSize: "11px", color: "var(--text-3)", padding: "0 12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {log.targetId}
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-3)" }}>
                  {new Date(log.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Config summary */}
        <div className="card">
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "13px" }}>Configuration</span>
            <Link href={`/dashboard/${guildId}/settings`}>
              <span style={{ fontSize: "12px", color: "var(--accent-2)" }}>Edit →</span>
            </Link>
          </div>
          {[
            ["Prefix", c.prefix || "!"],
            ["Welcome Channel", c.welcomeChannelId || "Not set"],
            ["Muted Role", c.mutedRoleId || "Not set"],
            ["Timezone", c.timezone || "UTC"],
            ["Language", c.language || "en"],
            ["Sticky Roles", c.stickyRoles ? "Enabled" : "Disabled"],
          ].map(([key, val]) => (
            <div key={key} className="table-row" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <span style={{ color: "var(--text-2)", fontSize: "13px" }}>{key}</span>
              <span className="mono" style={{ fontSize: "12px", color: "var(--text)", textAlign: "right" }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}