import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const giveawaySchema = new Schema(
  {
    giveawayId: { type: String, default: () => uuidv4(), unique: true, index: true },
    guildId: { type: String, required: true, index: true },
    channelId: { type: String, required: true },
    messageId: { type: String, default: "" },
    hostId: { type: String, required: true },
    prize: { type: String, required: true },
    winnerCount: { type: Number, default: 1 },
    endsAt: { type: Date, required: true },
    ended: { type: Boolean, default: false },
    participants: { type: [String], default: [] },
    winners: { type: [String], default: [] },
    requiredRole: { type: String, default: "" },
    requiredLevel: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GiveawayModel = model("Giveaway", giveawaySchema);
