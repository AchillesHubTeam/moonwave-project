"use server";

import { connectDB } from "../../lib/db";
import mongoose from "mongoose";

const guildConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: "!" },
  moderationEnabled: { type: Boolean, default: true },
  autoModLevel: { type: String, default: "off" },
  customDomain: { type: String, default: "" },
  premiumTier: { type: String, default: "free" },
}, { timestamps: true });

const GuildConfig = mongoose.models["GuildConfig"] ?? mongoose.model("GuildConfig", guildConfigSchema);

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
  const doc: any = await GuildConfig.findOne({ guildId }).lean();
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

export async function updateGuildConfig(guildId: string, data: Partial<GuildConfigData>): Promise<void> {
  await connectDB();
  await GuildConfig.findOneAndUpdate({ guildId }, data, { upsert: true });
}
