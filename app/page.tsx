import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#ffffff",
        }}
      >
        MoonWave
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "var(--text-secondary)",
          maxWidth: "32rem",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Enterprise Discord Bot. Moderation, subscriptions, and server management
        at scale.
      </p>
      <Link
        href="/dashboard"
        style={{
          padding: "0.75rem 2rem",
          border: "1px solid var(--border-primary)",
          backgroundColor: "var(--bg-card)",
          color: "var(--accent)",
          fontSize: "0.875rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          transition: "background-color 150ms",
        }}
      >
        Open Dashboard
      </Link>
    </main>
  );
}
