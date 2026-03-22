import mongoose from "mongoose";
import { logError } from "../utils/logger.js";

export async function connectDatabase(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    logError(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
