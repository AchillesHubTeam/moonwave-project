import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new Schema(
  {
    ticketId: { type: String, default: () => uuidv4(), unique: true, index: true },
    ticketNumber: { type: Number, required: true },
    guildId: { type: String, required: true, index: true },
    channelId: { type: String, required: true },
    ownerId: { type: String, required: true },
    assignedTo: { type: String, default: "" },
    participants: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["open", "closed", "archived"],
      default: "open",
    },
    subject: { type: String, default: "Support Ticket" },
    transcript: { type: String, default: "" },
    closedAt: { type: Date, default: null },
    closedBy: { type: String, default: "" },
    closeReason: { type: String, default: "" },
  },
  { timestamps: true }
);

export const TicketModel = model("Ticket", ticketSchema);
