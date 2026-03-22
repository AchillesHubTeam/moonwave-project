import { Schema, model, models } from "mongoose";

const guildConfigSchema = new Schema(
  {
    guildId: { type: String, required: true, unique: true, index: true },
    prefix: { type: String, default: "!" },
    moderationEnabled: { type: Boolean, default: true },
    autoModLevel: {
      type: String,
      enum: ["off", "low", "medium", "high"],
      default: "off",
    },
    customDomain: { type: String, default: "" },
    premiumTier: {
      type: String,
      enum: ["free", "basic", "pro", "enterprise"],
      default: "free",
    },
    antiRaidEnabled: { type: Boolean, default: true },
    antiRaidThreshold: { type: Number, default: 10 },
    antiRaidWindowMs: { type: Number, default: 10000 },
    antiRaidBanRaiders: { type: Boolean, default: false },
    antiRaidLockdownOnDetect: { type: Boolean, default: true },
    antiRaidWhitelist: { type: [String], default: [] },
    logChannels: {
      type: Map,
      of: String,
      default: {},
    },
    welcomeChannelId: { type: String, default: "" },
    welcomeMessage: { type: String, default: "" },
    leaveChannelId: { type: String, default: "" },
    leaveMessage: { type: String, default: "" },
    verificationRoleId: { type: String, default: "" },
    modRoles: { type: [String], default: [] },
    autoRoles: { type: [String], default: [] },
    stickyRoles: { type: Boolean, default: false },
    stickyRolesData: { type: Map, of: [String], default: {} },
    featureFlags: { type: Map, of: Boolean, default: {} },
    timezone: { type: String, default: "UTC" },
    language: { type: String, default: "en" },
    ticketCategoryId: { type: String, default: "" },
    ticketLogChannelId: { type: String, default: "" },
    ticketCounter: { type: Number, default: 0 },
    mutedRoleId: { type: String, default: "" },
    freeActivated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const GuildConfigModel = models.GuildConfig || model("GuildConfig", guildConfigSchema);
