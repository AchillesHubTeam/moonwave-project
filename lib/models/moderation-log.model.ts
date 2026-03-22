import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const moderationLogSchema = new Schema(
  {
    caseId: { type: String, default: () => uuidv4(), unique: true, index: true },
    guildId: { type: String, required: true, index: true },
    moderatorId: { type: String, required: true },
    targetId: { type: String, required: true, index: true },
    action: {
      type: String,
      enum: [
        "ban",
        "unban",
        "kick",
        "timeout",
        "untimeout",
        "warn",
        "softban",
        "note",
        "massban",
        "lockdown",
        "unlock",
      ],
      required: true,
    },
    reason: { type: String, default: "No reason provided" },
    duration: { type: Number, default: null },
    expiresAt: { type: Date, default: null },
    active: { type: Boolean, default: true },
    notes: {
      type: [
        {
          authorId: String,
          content: String,
          addedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    appeal: {
      submitted: { type: Boolean, default: false },
      reason: { type: String, default: "" },
      status: {
        type: String,
        enum: ["pending", "approved", "denied", ""],
        default: "",
      },
      reviewedBy: { type: String, default: "" },
      reviewedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

export const ModerationLogModel = models.ModerationLog || model("ModerationLog", moderationLogSchema);
