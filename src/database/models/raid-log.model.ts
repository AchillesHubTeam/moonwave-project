import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const raidLogSchema = new Schema(
  {
    raidId: { type: String, default: () => uuidv4(), unique: true },
    guildId: { type: String, required: true, index: true },
    triggeredAt: { type: Date, default: Date.now },
    joinCount: { type: Number, required: true },
    windowMs: { type: Number, required: true },
    raiderIds: { type: [String], default: [] },
    actionsToken: { type: String, default: "" },
    lockdownApplied: { type: Boolean, default: false },
    bannedCount: { type: Number, default: 0 },
    resolved: { type: Boolean, default: false },
    resolvedAt: { type: Date, default: null },
    resolvedBy: { type: String, default: "" },
  },
  { timestamps: true }
);

export const RaidLogModel = model("RaidLog", raidLogSchema);
