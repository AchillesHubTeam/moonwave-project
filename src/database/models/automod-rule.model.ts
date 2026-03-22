import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const automodRuleSchema = new Schema(
  {
    ruleId: { type: String, default: () => uuidv4(), unique: true, index: true },
    guildId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["spam", "invite", "link", "word", "mention", "caps", "zalgo", "duplicate"],
      required: true,
    },
    action: {
      type: String,
      enum: ["warn", "delete", "timeout", "kick", "ban"],
      default: "delete",
    },
    threshold: { type: Number, default: 5 },
    windowMs: { type: Number, default: 5000 },
    words: { type: [String], default: [] },
    timeoutDurationMs: { type: Number, default: 300_000 },
    ignoredChannels: { type: [String], default: [] },
    ignoredRoles: { type: [String], default: [] },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AutomodRuleModel = model("AutomodRule", automodRuleSchema);
