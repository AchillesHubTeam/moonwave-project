"use server";

import { connectDB } from "../../lib/db";
import { GuildConfigModel } from "../../lib/models/guild-config.model.js";

const GuildConfig = GuildConfigModel;

export interface GuildConfigData {
  guildId: string;
  prefix: string;
  moderationEnabled: boolean;
  autoModLevel: string;
  customDomain: string;
  premiumTier: string;
}

export async function getGuildConfig(guildId: string): Promise<GuildConfigData | null> {
  await connectDB();
  const doc = await GuildConfig.findOne({ guildId }).lean();
  if (!doc) return null;
  return {
    guildId: String(doc.guildId ?? ""),
    prefix: String(doc.prefix ?? "!"),
    moderationEnabled: Boolean(doc.moderationEnabled),
    autoModLevel: String(doc.autoModLevel ?? "off"),
    customDomain: String(doc.customDomain ?? ""),
    premiumTier: String(doc.premiumTier ?? "free"),
  };
}

export async function updateGuildConfig(
  guildId: string,
  updates: Partial<GuildConfigData>
): Promise<GuildConfigData | null> {
  await connectDB();
  const doc = await GuildConfig.findOneAndUpdate(
    { guildId },
    updates,
    { new: true }
  ).lean();
  if (!doc) return null;
  return {
    guildId: String(doc.guildId ?? ""),
    prefix: String(doc.prefix ?? "!"),
    moderationEnabled: Boolean(doc.moderationEnabled),
    autoModLevel: String(doc.autoModLevel ?? "off"),
    customDomain: String(doc.customDomain ?? ""),
    premiumTier: String(doc.premiumTier ?? "free"),
  };
}
