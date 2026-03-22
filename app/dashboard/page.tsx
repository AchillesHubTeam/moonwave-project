import { connectDB } from "../lib/db";
import { GuildConfigModel } from "../lib/models/guild-config.model";
import Link from "next/link";

async function getGuilds() {
  try {
    await connectDB();
    return await GuildConfigModel.find({}).lean();
  } catch {
    return [];
  }
}

const TIER_COLOR: Record<string, string> = {
  enterprise: "badge-purple", pro: "badge-accent",
  basic: "badge-green", free: "badge-gray",
};

export default async function DashboardPage() {
  const guilds = await getGuilds();

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.03em" }}>Server Management</h1>
        <p style={{ color: "var(--text-2)", fontSize: "13px", marginTop: "6px" }}>
          {guilds.length} server{guilds.length !== 1 ? "s" : ""} connected
        </p>
      </div>
      {guilds.length === 0 ? (
        <div className="card" style={{ padding: "48px", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "6px" }}>No servers found</div>
          <div style={{ color: "var(--text-2)", fontSize: "13px" }}>
            Make sure MoonWave bot is online and has joined at least one server.
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {guilds.map((guild: any) => (
            <Link key={guild.guildId} href={`/dashboard/${guild.guildId}`}>
              <div className="card" style={{ padding: "20px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "10px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, fontFamily: "monospace" }}>
                    {guild.guildId?.slice(-2) ?? "??"}
                  </div>
                  <span className={`badge ${TIER_COLOR[guild.premiumTier] ?? "badge-gray"}`}>
                    {guild.premiumTier ?? "free"}
                  </span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--text-3)", marginBottom: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {guild.guildId}
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {guild.moderationEnabled && <span className="badge badge-green">Mod</span>}
                  {guild.antiRaidEnabled && <span className="badge badge-accent">Anti-Raid</span>}
                  {guild.autoModLevel !== "off" && <span className="badge badge-yellow">AutoMod {guild.autoModLevel}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
