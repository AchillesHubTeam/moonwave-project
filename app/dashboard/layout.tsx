import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav
        style={{
          width: "16rem",
          borderRight: "1px solid var(--border-primary)",
          backgroundColor: "var(--bg-secondary)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
            color: "#ffffff",
          }}
        >
          MoonWave
        </Link>
        <NavLink href="/dashboard" label="Servers" />
      </nav>
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "0.5rem 0.75rem",
        fontSize: "0.875rem",
        color: "var(--text-secondary)",
        borderLeft: "2px solid transparent",
        transition: "color 150ms",
      }}
    >
      {label}
    </Link>
  );
}
