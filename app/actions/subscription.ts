"use server";

import { connectDB } from "../../lib/db";
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  guildId: String,
  provider: String,
  externalId: String,
  tier: String,
  status: String,
  expiresAt: Date,
}, { timestamps: true });

const Subscription = mongoose.models["Subscription"] ?? mongoose.model("Subscription", subscriptionSchema);

export interface SubscriptionData {
  guildId: string;
  provider: string;
  tier: string;
  status: string;
  expiresAt: string;
}

export async function getSubscription(guildId: string): Promise<SubscriptionData | null> {
  await connectDB();
  const doc = await Subscription.findOne({ guildId, status: "active" })
    .sort({ createdAt: -1 })
    .lean();

  if (!doc) return null;
  return {
    guildId: String(doc.guildId ?? ""),
    provider: String(doc.provider ?? ""),
    tier: String(doc.tier ?? "free"),
    status: String(doc.status ?? ""),
    expiresAt: (doc.expiresAt as Date)?.toISOString?.() ?? "",
  };
}
