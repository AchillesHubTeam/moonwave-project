import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reminderSchema = new Schema(
  {
    reminderId: { type: String, default: () => uuidv4(), unique: true, index: true },
    userId: { type: String, required: true, index: true },
    guildId: { type: String, default: "" },
    channelId: { type: String, default: "" },
    message: { type: String, required: true },
    remindAt: { type: Date, required: true, index: true },
    delivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const ReminderModel = model("Reminder", reminderSchema);
