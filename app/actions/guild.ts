"use server";

import { connectDB } from "../../lib/db";
import mongoose, { Document, Model } from "mongoose";

// Định nghĩa Interface cho dữ liệu trong Database
interface IGuildConfig extends Document {
  guildId: string;
  prefix: string;
  moderationEnabled: boolean;
  autoModLevel: string;
  customDomain: string;
  premiumTier: string;
}

const guildConfigSchema = new mongoose.Schema({
  guildId: String,
  prefix: String,
  moderationEnabled: Boolean,
  autoModLevel: String,
  customDomain: String,
  premiumTier: String,
}, { timestamps: true });

// Ép kiểu cho Model để TypeScript nhận diện các trường khi dùng .lean()
const GuildConfig: Model<IGuildConfig> = 
  mongoose.models["GuildConfig"] ?? mongoose.model<IGuildConfig>("GuildConfig", guildConfigSchema);

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
  // Dùng as bất kỳ để TS không bắt bẻ khi map dữ liệu từ lean()
  const doc = await GuildConfig.findOne({ guildId }).lean() as any;
  
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
  ).lean() as any;

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