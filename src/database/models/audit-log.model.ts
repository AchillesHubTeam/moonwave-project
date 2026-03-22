import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const auditLogSchema = new Schema(
  {
    logId: { type: String, default: () => uuidv4(), unique: true },
    guildId: { type: String, required: true, index: true },
    actorId: { type: String, required: true },
    action: { type: String, required: true },
    targetId: { type: String, default: "" },
    targetType: { type: String, default: "" },
    metadata: { type: Schema.Types.Mixed, default: {} },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const AuditLogModel = model("AuditLog", auditLogSchema);
