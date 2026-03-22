export interface EnvironmentVariables {
  DISCORD_TOKEN: string;
  DISCORD_CLIENT_ID: string;
  MONGODB_URI: string;
  OWNER_IDS: string[];
  ENTERPRISE_GUILD_IDS: string[];
  BOT_NAME: string;
  BOT_VERSION: string;
  BOT_SUPPORT_SERVER: string;
  BOT_INVITE_URL: string;
  AVATAR_URL: string;
  BANNER_URL: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;
  FREE_TIER_ENABLED: boolean;
  PAYMENTS_ENABLED: boolean;
  ANTI_RAID_ENABLED: boolean;
  ANTI_RAID_JOIN_THRESHOLD: number;
  ANTI_RAID_JOIN_WINDOW_MS: number;
  ANTI_RAID_BAN_RAIDERS: boolean;
  ANTI_RAID_LOCKDOWN_ON_DETECT: boolean;
  ANTI_RAID_ALERT_CHANNEL_ID: string;
  ANTI_RAID_MIN_ACCOUNT_AGE_DAYS: number;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
  MAINTENANCE_MODE: boolean;
  MAINTENANCE_MESSAGE: string;
  LOG_LEVEL: string;
  LOG_FORMAT: string;
  LOG_CHANNEL_ID: string;
  REDIS_URL: string;
  GOOGLE_APPLICATION_CREDENTIALS: string;
  ECONOMY_DAILY_AMOUNT: number;
  ECONOMY_WEEKLY_AMOUNT: number;
  ECONOMY_WORK_MIN: number;
  ECONOMY_WORK_MAX: number;
  ECONOMY_CURRENCY_SYMBOL: string;
  ECONOMY_CURRENCY_NAME: string;
  XP_PER_MESSAGE: number;
  XP_COOLDOWN_SECONDS: number;
  XP_LEVEL_MULTIPLIER: number;
  TICKET_CATEGORY_ID: string;
  TICKET_LOG_CHANNEL_ID: string;
  TICKET_MAX_OPEN: number;
  WEBHOOK_PORT: number;
  WEBHOOK_SECRET: string;
  SENTRY_DSN: string;
}

export interface AntiRaidConfig {
  enabled: boolean;
  joinThreshold: number;
  joinWindowMs: number;
  banRaiders: boolean;
  lockdownOnDetect: boolean;
  alertChannelId: string;
  minAccountAgeDays: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface OwnerConfig {
  ownerIds: string[];
}

export interface SystemConfig {
  botName: string;
  botVersion: string;
  avatarUrl: string;
  bannerUrl: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  paymentsEnabled: boolean;
  maintenanceMode: boolean;
}

export interface GuildConfig {
  guildId: string;
  prefix: string;
  moderationEnabled: boolean;
  autoModLevel: "off" | "low" | "medium" | "high";
  customDomain: string;
  premiumTier: "free" | "basic" | "pro" | "enterprise";
  antiRaidEnabled: boolean;
  antiRaidThreshold: number;
  antiRaidWindowMs: number;
  logChannels: Record<string, string>;
  welcomeChannelId: string;
  leaveChannelId: string;
  verificationRoleId: string;
  modRoles: string[];
  autoRoles: string[];
  stickyRoles: boolean;
  featureFlags: Record<string, boolean>;
  timezone: string;
  language: string;
}

export interface TierLimits {
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
