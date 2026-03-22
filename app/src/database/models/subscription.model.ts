import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    guildId: { type: String, required: true, unique: true, index: true },
    provider: {
      type: String,
      enum: ["stripe", "paypal", "free"],
      default: "free",
    },
    externalId: { type: String, default: "" },
    tier: {
      type: String,
      enum: ["free", "basic", "pro", "enterprise"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "canceled", "past_due", "trialing", "expired", "free"],
      default: "free",
    },
    freeActivated: { type: Boolean, default: false },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const SubscriptionModel = model("Subscription", subscriptionSchema);
