export type SubscriptionTier = "free" | "basic" | "pro" | "enterprise";

export type PaymentProvider = "stripe" | "paypal" | "free";

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "expired"
  | "free";

export interface SubscriptionRecord {
  guildId: string;
  provider: PaymentProvider;
  externalId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  freeActivated: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TierFeatures {
  maxCustomCommands: number;
  maxAutoModRules: number;
  maxTickets: number;
  customDomain: boolean;
  analyticsRetentionDays: number;
  prioritySupport: boolean;
  antiRaid: boolean;
  economy: boolean;
  xpSystem: boolean;
  advancedLogging: boolean;
}

export const TIER_FEATURES: Record<SubscriptionTier, TierFeatures> = {
  free: {
    maxCustomCommands: 10,
    maxAutoModRules: 5,
    maxTickets: 5,
    customDomain: false,
    analyticsRetentionDays: 7,
    prioritySupport: false,
    antiRaid: true,
    economy: true,
    xpSystem: true,
    advancedLogging: false,
  },
  basic: {
    maxCustomCommands: 50,
    maxAutoModRules: 20,
    maxTickets: 20,
    customDomain: false,
    analyticsRetentionDays: 30,
    prioritySupport: false,
    antiRaid: true,
    economy: true,
    xpSystem: true,
    advancedLogging: true,
  },
  pro: {
    maxCustomCommands: 200,
    maxAutoModRules: 100,
    maxTickets: 100,
    customDomain: true,
    analyticsRetentionDays: 90,
    prioritySupport: true,
    antiRaid: true,
    economy: true,
    xpSystem: true,
    advancedLogging: true,
  },
  enterprise: {
    maxCustomCommands: Infinity,
    maxAutoModRules: Infinity,
    maxTickets: Infinity,
    customDomain: true,
    analyticsRetentionDays: 365,
    prioritySupport: true,
    antiRaid: true,
    economy: true,
    xpSystem: true,
    advancedLogging: true,
  },
};
