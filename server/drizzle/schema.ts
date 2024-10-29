import { sqliteTable, AnySQLiteColumn, integer, blob, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const destinyPlaceDefinition = sqliteTable("DestinyPlaceDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyActivityDefinition = sqliteTable("DestinyActivityDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyActivityTypeDefinition = sqliteTable("DestinyActivityTypeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyClassDefinition = sqliteTable("DestinyClassDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyGenderDefinition = sqliteTable("DestinyGenderDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyInventoryBucketDefinition = sqliteTable("DestinyInventoryBucketDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyRaceDefinition = sqliteTable("DestinyRaceDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyUnlockDefinition = sqliteTable("DestinyUnlockDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyStatGroupDefinition = sqliteTable("DestinyStatGroupDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyFactionDefinition = sqliteTable("DestinyFactionDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyVendorGroupDefinition = sqliteTable("DestinyVendorGroupDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyRewardSourceDefinition = sqliteTable("DestinyRewardSourceDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyItemCategoryDefinition = sqliteTable("DestinyItemCategoryDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyDamageTypeDefinition = sqliteTable("DestinyDamageTypeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyActivityModeDefinition = sqliteTable("DestinyActivityModeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyMedalTierDefinition = sqliteTable("DestinyMedalTierDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyAchievementDefinition = sqliteTable("DestinyAchievementDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyActivityGraphDefinition = sqliteTable("DestinyActivityGraphDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyActivityInteractableDefinition = sqliteTable("DestinyActivityInteractableDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyBondDefinition = sqliteTable("DestinyBondDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyCollectibleDefinition = sqliteTable("DestinyCollectibleDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyDestinationDefinition = sqliteTable("DestinyDestinationDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyEquipmentSlotDefinition = sqliteTable("DestinyEquipmentSlotDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyEventCardDefinition = sqliteTable("DestinyEventCardDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyFireteamFinderActivityGraphDefinition = sqliteTable("DestinyFireteamFinderActivityGraphDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyFireteamFinderActivitySetDefinition = sqliteTable("DestinyFireteamFinderActivitySetDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyFireteamFinderLabelDefinition = sqliteTable("DestinyFireteamFinderLabelDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyFireteamFinderLabelGroupDefinition = sqliteTable("DestinyFireteamFinderLabelGroupDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyFireteamFinderOptionDefinition = sqliteTable("DestinyFireteamFinderOptionDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyFireteamFinderOptionGroupDefinition = sqliteTable("DestinyFireteamFinderOptionGroupDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyStatDefinition = sqliteTable("DestinyStatDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyInventoryItemDefinition = sqliteTable("DestinyInventoryItemDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyItemTierTypeDefinition = sqliteTable("DestinyItemTierTypeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyLoadoutColorDefinition = sqliteTable("DestinyLoadoutColorDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyLoadoutIconDefinition = sqliteTable("DestinyLoadoutIconDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyLoadoutNameDefinition = sqliteTable("DestinyLoadoutNameDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyLocationDefinition = sqliteTable("DestinyLocationDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyLoreDefinition = sqliteTable("DestinyLoreDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyMaterialRequirementSetDefinition = sqliteTable("DestinyMaterialRequirementSetDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyMetricDefinition = sqliteTable("DestinyMetricDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyObjectiveDefinition = sqliteTable("DestinyObjectiveDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySandboxPerkDefinition = sqliteTable("DestinySandboxPerkDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyPlugSetDefinition = sqliteTable("DestinyPlugSetDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyPowerCapDefinition = sqliteTable("DestinyPowerCapDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyPresentationNodeDefinition = sqliteTable("DestinyPresentationNodeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyProgressionDefinition = sqliteTable("DestinyProgressionDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyProgressionLevelRequirementDefinition = sqliteTable("DestinyProgressionLevelRequirementDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyRecordDefinition = sqliteTable("DestinyRecordDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySackRewardItemListDefinition = sqliteTable("DestinySackRewardItemListDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySandboxPatternDefinition = sqliteTable("DestinySandboxPatternDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySeasonDefinition = sqliteTable("DestinySeasonDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySeasonPassDefinition = sqliteTable("DestinySeasonPassDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySocialCommendationDefinition = sqliteTable("DestinySocialCommendationDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySocketCategoryDefinition = sqliteTable("DestinySocketCategoryDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySocketTypeDefinition = sqliteTable("DestinySocketTypeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyTraitDefinition = sqliteTable("DestinyTraitDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyVendorDefinition = sqliteTable("DestinyVendorDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyMilestoneDefinition = sqliteTable("DestinyMilestoneDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyActivityModifierDefinition = sqliteTable("DestinyActivityModifierDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyReportReasonCategoryDefinition = sqliteTable("DestinyReportReasonCategoryDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyArtifactDefinition = sqliteTable("DestinyArtifactDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyBreakerTypeDefinition = sqliteTable("DestinyBreakerTypeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyChecklistDefinition = sqliteTable("DestinyChecklistDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyEnergyTypeDefinition = sqliteTable("DestinyEnergyTypeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinySocialCommendationNodeDefinition = sqliteTable("DestinySocialCommendationNodeDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyGuardianRankDefinition = sqliteTable("DestinyGuardianRankDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyGuardianRankConstantsDefinition = sqliteTable("DestinyGuardianRankConstantsDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyLoadoutConstantsDefinition = sqliteTable("DestinyLoadoutConstantsDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyFireteamFinderConstantsDefinition = sqliteTable("DestinyFireteamFinderConstantsDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyGlobalConstantsDefinition = sqliteTable("DestinyGlobalConstantsDefinition", {
	id: integer().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

export const destinyHistoricalStatsDefinition = sqliteTable("DestinyHistoricalStatsDefinition", {
	key: text().primaryKey().notNull(),
	json: blob().default(sql`(null)`),
});

