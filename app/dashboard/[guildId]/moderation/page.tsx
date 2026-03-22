import { getModerationLogs } from "../../../actions/moderation";

const ACTION_COLOR: Record<string, string> = {
  ban: "badge-red", kick: "badge-red", timeout: "badge-yellow",
  warn: "badge-yellow", unban: "badge-green", untimeout: "badge-green",
  massban: "badge-red", softban: "badge-red", note: "badge-gray",
  lockdown: "badge-yellow", unlock: "badge-green",
};

interface Props { params: Promise<{ guildId: string }> }

export default async function ModerationPage({ params }: Props) {
  const { guildId } = await params;
  const logs = await getModerationLogs(guildId, 100);

  const counts: Record<string, number> = {};
  logs.forEach((l: any) => { counts[l.action] = (counts[l.action] ?? 0) + 1; });

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em" }}>Moderation Logs</h1>
        <p style={{ color: "var(--text-2)", fontSize: "13px", marginTop: "6px" }}>
          {logs.length} actions recorded
        </p>
      </div>

      {/* Action breakdown */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {Object.entries(counts).map(([action, count]) => (
          <div key={action} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span className={`badge ${ACTION_COLOR[action] ?? "badge-gray"}`}>{action}</span>
            <span style={{ fontSize: "12px", color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace" }}>{count}</span>
          </div>
        ))}
      </div>

      {/* Logs table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "90px 140px 140px 1fr 100px", padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
          {["Action", "Target ID", "Moderator", "Reason", "Date"].map(h => (
            <div key={h} style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</div>
          ))}
        </div>

        {logs.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "var(--text-3)", fontSize: "13px" }}>
            No moderation actions recorded yet
          </div>
        ) : (
          logs.map((log: any) => (
            <div key={log._id} className="table-row" style={{ gridTemplateColumns: "90px 140px 140px 1fr 100px" }}>
              <span className={`badge ${ACTION_COLOR[log.action] ?? "badge-gray"}`}>{log.action}</span>
              <span className="mono" style={{ fontSize: "11px", color: "var(--text-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {log.targetId}
              </span>
              <span className="mono" style={{ fontSize: "11px", color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {log.moderatorId}
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {log.reason ?? "No reason"}
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace" }}>
                {new Date(log.timestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}