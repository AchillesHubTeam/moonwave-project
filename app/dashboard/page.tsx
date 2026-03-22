import { connectDB } from "../../lib/db";
import { GuildConfigModel } from "../../lib/models/guild-config.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getUserGuilds(accessToken: string) {
  const res = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const guilds = await res.json();
  // Chỉ lấy guild user là admin (permission bit 0x8)
  return guilds.filter((g: any) => (BigInt(g.permissions) & BigInt(0x8)) === BigInt(0x8));
}

async function getGuilds(adminGuildIds: string[]) {
  if (adminGuildIds.length === 0) return [];
  try {
    await connectDB();
    return await GuildConfigModel.find({ guildId: { $in: adminGuildIds } }).lean();
  } catch {
    return [];
  }
}

const TIER_COLOR: Record<string, string> = {
  enterprise: "badge-purple", pro: "badge-accent",
  basic: "badge-green", free: "badge-gray",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const accessToken = (session as any).accessToken;
  const userGuilds = accessToken ? await getUserGuilds(accessToken) : [];
  const adminGuildIds = userGuilds.map((g: any) => g.id);
  const guilds = await getGuilds(adminGuildIds);

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.03em" }}>Server Management</h1>
        <p style={{ color: "var(--text-2)", fontSize: "13px", marginTop: "6px" }}>
          {guilds.length} server{guilds.length !== 1 ? "s" : ""} where you are admin and MoonWave is active
        </p>
      </div>
      {guilds.length === 0 ? (
        <div className="card" style={{ padding: "48px", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "6px" }}>No servers found</div>
          <div style={{ color: "var(--text-2)", fontSize: "13px" }}>
            You need to be an admin in a server that has MoonWave bot installed.
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {guilds.map((guild: any) => {
            const discordGuild = userGuilds.find((g: any) => g.id === guild.guildId);
            return (
              <Link key={guild.guildId} href={`/dashboard/${guild.guildId}`}>
                <div className="card" style={{ padding: "20px", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {discordGuild?.icon ? (
                        <img src={`https://cdn.discordapp.com/icons/${guild.guildId}/${discordGuild.icon}.png`} alt="" style={{ width: 40, height: 40, borderRadius: "10px" }} />
                      ) : (
                        <div style={{ width: 40, height: 40, borderRadius: "10px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800 }}>
                          {discordGuild?.name?.[0] ?? "?"}
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "14px" }}>{discordGuild?.name ?? guild.guildId}</div>
                        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--text-3)" }}>{guild.guildId}</div>
                      </div>
                    </div>
                    <span className={`badge ${TIER_COLOR[guild.premiumTier] ?? "badge-gray"}`}>
                      {guild.premiumTier ?? "free"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {guild.moderationEnabled && <span className="badge badge-green">Mod</span>}
                    {guild.antiRaidEnabled && <span className="badge badge-accent">Anti-Raid</span>}
                    {guild.autoModLevel !== "off" && <span className="badge badge-yellow">AutoMod {guild.autoModLevel}</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
