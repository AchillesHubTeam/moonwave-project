"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const NAV = [
  { href: "", label: "Overview", icon: "⬡" },
  { href: "/moderation", label: "Moderation", icon: "⚔" },
  { href: "/settings", label: "Settings", icon: "⚙" },
  { href: "/subscription", label: "Subscription", icon: "◈" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const guildId = pathname.split("/")[2];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px",
        borderRight: "1px solid var(--border)",
        background: "var(--bg-2)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border)" }}>
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 32, height: 32,
              background: "var(--accent)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: 800,
            }}>M</div>
            <span style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em" }}>MoonWave</span>
          </Link>
        </div>

        {/* Bot status */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="pulse" />
            <span style={{ fontSize: "12px", color: "var(--text-2)" }}>Bot Online</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "8px", flex: 1 }}>
          <div className="section-title" style={{ padding: "12px 8px 6px" }}>Navigation</div>

          <Link href="/dashboard" style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "8px 10px", borderRadius: "6px", fontSize: "13px", fontWeight: 500,
            color: pathname === "/dashboard" ? "var(--text)" : "var(--text-2)",
            background: pathname === "/dashboard" ? "var(--bg-4)" : "transparent",
            marginBottom: "2px",
          }}>
            <span>◧</span> Servers
          </Link>

          {guildId && NAV.map(({ href, label, icon }) => {
            const full = `/dashboard/${guildId}${href}`;
            const active = href === "" ? pathname === full : pathname.startsWith(full);
            return (
              <Link key={href} href={full} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "8px 10px", borderRadius: "6px", fontSize: "13px", fontWeight: 500,
                color: active ? "var(--text)" : "var(--text-2)",
                background: active ? "var(--bg-4)" : "transparent",
                marginBottom: "2px",
                transition: "all 100ms",
              }}>
                <span>{icon}</span> {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        {session?.user && (
          <div style={{ padding: "12px", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {session.user.image && (
                <img src={session.user.image} alt="" style={{ width: 28, height: 28, borderRadius: "50%" }} />
              )}
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {session.user.name}
                </div>
              </div>
              <button onClick={() => signOut()} className="btn btn-ghost" style={{ padding: "4px 8px", fontSize: "11px" }}>
                Out
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}