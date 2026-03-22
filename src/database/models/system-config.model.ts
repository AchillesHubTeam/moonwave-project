import { Schema, model } from "mongoose";

const systemConfigSchema = new Schema(
  {
    botName: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    bannerUrl: { type: String, default: "" },
    clientId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const SystemConfigModel = model("SystemConfig", systemConfigSchema);
