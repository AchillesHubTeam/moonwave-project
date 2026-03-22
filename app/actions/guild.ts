"use server";

import { connectDB } from "../../lib/db";
import { GuildConfigModel } from "../../lib/models/guild-config.model";

export interface GuildConfigData {
  guildId: string;
  prefix: string;
  moderationEnabled: boolean;
  autoModLevel: string;
  customDomain: string;
  premiumTier: string;
  antiRaidEnabled: boolean;
  antiRaidThreshold: number;
  antiRaidWindowMs: number;
  antiRaidBanRaiders: boolean;
  antiRaidLockdownOnDetect: boolean;
  welcomeChannelId: string;
  welcomeMessage: string;
  leaveChannelId: string;
  leaveMessage: string;
  mutedRoleId: string;
  ticketCategoryId: string;
  ticketLogChannelId: string;
  stickyRoles: boolean;
  timezone: string;
  language: string;
}

export async function getGuildConfig(guildId: string): Promise<GuildConfigData | null> {
  await connectDB();
  const doc: any = await GuildConfigModel.findOne({ guildId }).lean();
  if (!doc) return null;
  return {
    guildId: String(doc.guildId ?? ""),
    prefix: String(doc.prefix ?? "!"),
    moderationEnabled: Boolean(doc.moderationEnabled),
    autoModLevel: String(doc.autoModLevel ?? "off"),
    customDomain: String(doc.customDomain ?? ""),
    premiumTier: String(doc.premiumTier ?? "free"),
    antiRaidEnabled: Boolean(doc.antiRaidEnabled),
    antiRaidThreshold: Number(doc.antiRaidThreshold ?? 10),
    antiRaidWindowMs: Number(doc.antiRaidWindowMs ?? 10000),
    antiRaidBanRaiders: Boolean(doc.antiRaidBanRaiders),
    antiRaidLockdownOnDetect: Boolean(doc.antiRaidLockdownOnDetect),
    welcomeChannelId: String(doc.welcomeChannelId ?? ""),
    welcomeMessage: String(doc.welcomeMessage ?? ""),
    leaveChannelId: String(doc.leaveChannelId ?? ""),
    leaveMessage: String(doc.leaveMessage ?? ""),
    mutedRoleId: String(doc.mutedRoleId ?? ""),
    ticketCategoryId: String(doc.ticketCategoryId ?? ""),
    ticketLogChannelId: String(doc.ticketLogChannelId ?? ""),
    stickyRoles: Boolean(doc.stickyRoles),
    timezone: String(doc.timezone ?? "UTC"),
    language: String(doc.language ?? "en"),
  };
}

export async function updateGuildConfig(guildId: string, data: Partial<GuildConfigData>): Promise<void> {
  await connectDB();
  const { guildId: _, ...rest } = data as any;
  await GuildConfigModel.findOneAndUpdate(
    { guildId },
    { $set: rest },
    { upsert: true, new: true }
  );
}