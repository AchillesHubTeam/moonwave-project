import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true },
    guildId: { type: String, required: true, index: true },
    ownerId: { type: String, required: true },
    content: { type: String, required: true },
    uses: { type: Number, default: 0 },
    aliases: { type: [String], default: [] },
  },
  { timestamps: true }
);

tagSchema.index({ name: 1, guildId: 1 }, { unique: true });

export const TagModel = model("Tag", tagSchema);
