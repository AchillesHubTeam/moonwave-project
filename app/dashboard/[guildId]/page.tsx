import Link from "next/link";

interface GuildPageProps {
  params: Promise<{ guildId: string }>;
}

export default async function GuildDashboardPage({ params }: GuildPageProps) {
  const { guildId } = await params;

  return (
    <div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em",
        }}
      >
        Guild: {guildId}
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <DashboardCard
          href={`/dashboard/${guildId}/moderation`}
          title="Moderation"
          description="View moderation logs and actions"
        />
        <DashboardCard
          href={`/dashboard/${guildId}/settings`}
          title="Settings"
          description="Configure server preferences"
        />
        <DashboardCard
          href={`/dashboard/${guildId}/subscription`}
          title="Subscription"
          description="Manage premium tier"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "1.5rem",
        border: "1px solid var(--border-primary)",
        backgroundColor: "var(--bg-card)",
        transition: "border-color 150ms",
      }}
    >
      <h3
        style={{
          fontSize: "0.9375rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
        {description}
      </p>
    </Link>
  );
}
