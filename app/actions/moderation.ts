"use server";

import { connectDB } from "../../lib/db";
import mongoose from "mongoose";

const moderationLogSchema = new mongoose.Schema({
  guildId: String,
  moderatorId: String,
  targetId: String,
  action: String,
  reason: String,
  timestamp: { type: Date, default: Date.now },
});

const ModerationLog = mongoose.models["ModerationLog"] ?? mongoose.model("ModerationLog", moderationLogSchema);

export interface ModerationLogData {
  _id: string;
  guildId: string;
  moderatorId: string;
  targetId: string;
  action: string;
  reason: string;
  timestamp: string;
}

export async function getModerationLogs(guildId: string, limit = 50): Promise<ModerationLogData[]> {
  await connectDB();
  // THÊM: as any[] vào đây
  const docs = await ModerationLog.find({ guildId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean() as any[];

  return docs.map((doc) => ({
    _id: String(doc._id),
    guildId: String(doc.guildId ?? ""),
    moderatorId: String(doc.moderatorId ?? ""),
    targetId: String(doc.targetId ?? ""),
    action: String(doc.action ?? ""),
    reason: String(doc.reason ?? ""),
    timestamp: (doc.timestamp as Date)?.toISOString?.() ?? new Date().toISOString(),
  }));
}

export async function deleteModerationLog(logId: string): Promise<boolean> {
  await connectDB();
  const result = await ModerationLog.deleteOne({ _id: logId });
  return result.deletedCount > 0;
}