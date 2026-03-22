"use client";

import { useState, useEffect } from "react";
import { getGuildConfig, updateGuildConfig } from "../../../actions/guild";

interface Props { params: Promise<{ guildId: string }> }

export default function SettingsPage({ params }: Props) {
  const [guildId, setGuildId] = useState("");
  const [config, setConfig] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    params.then(({ guildId }) => {
      setGuildId(guildId);
      getGuildConfig(guildId).then(setConfig);
    });
  }, [params]);

  if (!config) return (
    <div style={{ padding: "32px", color: "var(--text-2)", fontSize: "13px" }}>Loading...</div>
  );

  async function save() {
    setSaving(true);
    await updateGuildConfig(guildId, config);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function toggle(key: string) {
    setConfig((prev: any) => ({ ...prev, [key]: !prev[key] }));
  }

  function set(key: string, value: any) {
    setConfig((prev: any) => ({ ...prev, [key]: value }));
  }

  return (
    <div style={{ padding: "32px", maxWidth: "720px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em" }}>Settings</h1>
          <div className="mono" style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "4px" }}>{guildId}</div>
        </div>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saved ? "✓ Saved" : saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* General */}
      <Section title="General">
        <Row label="Prefix" desc="Command prefix for legacy commands">
          <input className="input" value={config.prefix ?? "!"} onChange={e => set("prefix", e.target.value)} style={{ width: "80px" }} />
        </Row>
        <Row label="Timezone" desc="Server timezone for logs and reminders">
          <select className="input" value={config.timezone ?? "UTC"} onChange={e => set("timezone", e.target.value)} style={{ width: "160px" }}>
            {["UTC","Asia/Ho_Chi_Minh","America/New_York","Europe/London","Asia/Tokyo","Asia/Seoul"].map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </Row>
        <Row label="Language" desc="Bot response language">
          <select className="input" value={config.language ?? "en"} onChange={e => set("language", e.target.value)} style={{ width: "120px" }}>
            <option value="en">English</option>
            <option value="vi">Vietnamese</option>
            <option value="ja">Japanese</option>
          </select>
        </Row>
      </Section>

      {/* Moderation */}
      <Section title="Moderation">
        <Row label="Moderation System" desc="Enable ban, kick, warn, mute commands">
          <div className={`toggle ${config.moderationEnabled ? "on" : ""}`} onClick={() => toggle("moderationEnabled")} />
        </Row>
        <Row label="Sticky Roles" desc="Restore roles when members rejoin">
          <div className={`toggle ${config.stickyRoles ? "on" : ""}`} onClick={() => toggle("stickyRoles")} />
        </Row>
        <Row label="Welcome Channel ID" desc="Channel to send welcome messages">
          <input className="input" value={config.welcomeChannelId ?? ""} onChange={e => set("welcomeChannelId", e.target.value)} style={{ width: "180px" }} placeholder="Channel ID" />
        </Row>
        <Row label="Welcome Message" desc="Use {user} and {server} as placeholders">
          <input className="input" value={config.welcomeMessage ?? ""} onChange={e => set("welcomeMessage", e.target.value)} placeholder="Welcome {user} to {server}!" />
        </Row>
        <Row label="Muted Role ID" desc="Role assigned to muted members">
          <input className="input" value={config.mutedRoleId ?? ""} onChange={e => set("mutedRoleId", e.target.value)} style={{ width: "180px" }} placeholder="Role ID" />
        </Row>
      </Section>

      {/* AutoMod */}
      <Section title="Auto Moderation">
        <Row label="AutoMod Level" desc="Automatic content filtering intensity">
          <select className="input" value={config.autoModLevel ?? "off"} onChange={e => set("autoModLevel", e.target.value)} style={{ width: "120px" }}>
            <option value="off">Off</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </Row>
      </Section>

      {/* Anti-Raid */}
      <Section title="Anti-Raid">
        <Row label="Anti-Raid Protection" desc="Automatically detect and handle raids">
          <div className={`toggle ${config.antiRaidEnabled ? "on" : ""}`} onClick={() => toggle("antiRaidEnabled")} />
        </Row>
        <Row label="Join Threshold" desc="Joins within window to trigger raid detection">
          <input className="input" type="number" value={config.antiRaidThreshold ?? 10} onChange={e => set("antiRaidThreshold", parseInt(e.target.value))} style={{ width: "80px" }} min={1} />
        </Row>
        <Row label="Window (ms)" desc="Time window for join counting">
          <input className="input" type="number" value={config.antiRaidWindowMs ?? 10000} onChange={e => set("antiRaidWindowMs", parseInt(e.target.value))} style={{ width: "100px" }} step={1000} />
        </Row>
        <Row label="Ban Raiders" desc="Automatically ban detected raiders">
          <div className={`toggle ${config.antiRaidBanRaiders ? "on" : ""}`} onClick={() => toggle("antiRaidBanRaiders")} />
        </Row>
        <Row label="Lockdown on Detect" desc="Lock server channels when raid is detected">
          <div className={`toggle ${config.antiRaidLockdownOnDetect ? "on" : ""}`} onClick={() => toggle("antiRaidLockdownOnDetect")} />
        </Row>
      </Section>

      {/* Tickets */}
      <Section title="Tickets">
        <Row label="Ticket Category ID" desc="Category channel for ticket threads">
          <input className="input" value={config.ticketCategoryId ?? ""} onChange={e => set("ticketCategoryId", e.target.value)} style={{ width: "180px" }} placeholder="Category ID" />
        </Row>
        <Row label="Ticket Log Channel ID" desc="Channel for ticket transcripts">
          <input className="input" value={config.ticketLogChannelId ?? ""} onChange={e => set("ticketLogChannelId", e.target.value)} style={{ width: "180px" }} placeholder="Channel ID" />
        </Row>
      </Section>

      <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saved ? "✓ Saved" : saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div className="section-title">{title}</div>
      <div className="card" style={{ overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "2px" }}>{desc}</div>
      </div>
      <div style={{ marginLeft: "16px", flexShrink: 0 }}>{children}</div>
    </div>
  );
}