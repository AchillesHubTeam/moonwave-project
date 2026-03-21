import { getModerationLogs } from "../../../actions/moderation";

interface ModerationPageProps {
  params: Promise<{ guildId: string }>;
}

export default async function ModerationPage({ params }: ModerationPageProps) {
  const { guildId } = await params;
  const logs = await getModerationLogs(guildId);

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
        Moderation Logs
      </h1>
      {logs.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          No moderation actions recorded.
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.8125rem",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border-primary)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "0.75rem" }}>Action</th>
              <th style={{ padding: "0.75rem" }}>Target</th>
              <th style={{ padding: "0.75rem" }}>Moderator</th>
              <th style={{ padding: "0.75rem" }}>Reason</th>
              <th style={{ padding: "0.75rem" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log._id}
                style={{ borderBottom: "1px solid var(--border-primary)" }}
              >
                <td
                  style={{
                    padding: "0.75rem",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {log.action}
                </td>
                <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>
                  {log.targetId}
                </td>
                <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>
                  {log.moderatorId}
                </td>
                <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>
                  {log.reason}
                </td>
                <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>
                  {new Date(log.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
