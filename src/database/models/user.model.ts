import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userId: { type: String, required: true },
    guildId: { type: String, required: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    inventory: {
      type: [
        {
          itemId: String,
          name: String,
          quantity: { type: Number, default: 1 },
          acquiredAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    lastDaily: { type: Date, default: null },
    lastWeekly: { type: Date, default: null },
    lastWork: { type: Date, default: null },
    lastXpGain: { type: Date, default: null },
    warningCount: { type: Number, default: 0 },
    blacklisted: { type: Boolean, default: false },
    blacklistReason: { type: String, default: "" },
    savedRoles: { type: [String], default: [] },
    messageCount: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.index({ userId: 1, guildId: 1 }, { unique: true });

export const UserModel = model("User", userSchema);
