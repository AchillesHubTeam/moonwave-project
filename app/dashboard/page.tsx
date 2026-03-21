export default function DashboardPage() {
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
        Server Overview
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
        Select a server from the sidebar or connect MoonWave to a new server.
      </p>
      <div
        style={{
          marginTop: "2rem",
          padding: "2rem",
          border: "1px solid var(--border-primary)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          No servers loaded. Ensure MoonWave is running and connected to
          MongoDB.
        </p>
      </div>
    </div>
  );
}
