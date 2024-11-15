"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinySandboxPatternDefinition = exports.destinySackRewardItemListDefinition = exports.destinyRecordDefinition = exports.destinyProgressionLevelRequirementDefinition = exports.destinyProgressionDefinition = exports.destinyPresentationNodeDefinition = exports.destinyPowerCapDefinition = exports.destinyPlugSetDefinition = exports.destinySandboxPerkDefinition = exports.destinyObjectiveDefinition = exports.destinyMetricDefinition = exports.destinyMaterialRequirementSetDefinition = exports.destinyLoreDefinition = exports.destinyLocationDefinition = exports.destinyLoadoutNameDefinition = exports.destinyLoadoutIconDefinition = exports.destinyLoadoutColorDefinition = exports.destinyItemTierTypeDefinition = exports.destinyInventoryItemDefinition = exports.destinyStatDefinition = exports.destinyFireteamFinderOptionGroupDefinition = exports.destinyFireteamFinderOptionDefinition = exports.destinyFireteamFinderLabelGroupDefinition = exports.destinyFireteamFinderLabelDefinition = exports.destinyFireteamFinderActivitySetDefinition = exports.destinyFireteamFinderActivityGraphDefinition = exports.destinyEventCardDefinition = exports.destinyEquipmentSlotDefinition = exports.destinyDestinationDefinition = exports.destinyCollectibleDefinition = exports.destinyBondDefinition = exports.destinyActivityInteractableDefinition = exports.destinyActivityGraphDefinition = exports.destinyAchievementDefinition = exports.destinyMedalTierDefinition = exports.destinyActivityModeDefinition = exports.destinyDamageTypeDefinition = exports.destinyItemCategoryDefinition = exports.destinyRewardSourceDefinition = exports.destinyVendorGroupDefinition = exports.destinyFactionDefinition = exports.destinyStatGroupDefinition = exports.destinyUnlockDefinition = exports.destinyRaceDefinition = exports.destinyInventoryBucketDefinition = exports.destinyGenderDefinition = exports.destinyClassDefinition = exports.destinyActivityTypeDefinition = exports.destinyActivityDefinition = exports.destinyPlaceDefinition = void 0;
exports.destinyHistoricalStatsDefinition = exports.destinyGlobalConstantsDefinition = exports.destinyFireteamFinderConstantsDefinition = exports.destinyLoadoutConstantsDefinition = exports.destinyGuardianRankConstantsDefinition = exports.destinyGuardianRankDefinition = exports.destinySocialCommendationNodeDefinition = exports.destinyEnergyTypeDefinition = exports.destinyChecklistDefinition = exports.destinyBreakerTypeDefinition = exports.destinyArtifactDefinition = exports.destinyReportReasonCategoryDefinition = exports.destinyActivityModifierDefinition = exports.destinyMilestoneDefinition = exports.destinyVendorDefinition = exports.destinyTraitDefinition = exports.destinySocketTypeDefinition = exports.destinySocketCategoryDefinition = exports.destinySocialCommendationDefinition = exports.destinySeasonPassDefinition = exports.destinySeasonDefinition = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.destinyPlaceDefinition = (0, sqlite_core_1.sqliteTable)("DestinyPlaceDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyActivityDefinition = (0, sqlite_core_1.sqliteTable)("DestinyActivityDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyActivityTypeDefinition = (0, sqlite_core_1.sqliteTable)("DestinyActivityTypeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyClassDefinition = (0, sqlite_core_1.sqliteTable)("DestinyClassDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyGenderDefinition = (0, sqlite_core_1.sqliteTable)("DestinyGenderDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyInventoryBucketDefinition = (0, sqlite_core_1.sqliteTable)("DestinyInventoryBucketDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyRaceDefinition = (0, sqlite_core_1.sqliteTable)("DestinyRaceDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyUnlockDefinition = (0, sqlite_core_1.sqliteTable)("DestinyUnlockDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyStatGroupDefinition = (0, sqlite_core_1.sqliteTable)("DestinyStatGroupDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyFactionDefinition = (0, sqlite_core_1.sqliteTable)("DestinyFactionDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyVendorGroupDefinition = (0, sqlite_core_1.sqliteTable)("DestinyVendorGroupDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyRewardSourceDefinition = (0, sqlite_core_1.sqliteTable)("DestinyRewardSourceDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyItemCategoryDefinition = (0, sqlite_core_1.sqliteTable)("DestinyItemCategoryDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyDamageTypeDefinition = (0, sqlite_core_1.sqliteTable)("DestinyDamageTypeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyActivityModeDefinition = (0, sqlite_core_1.sqliteTable)("DestinyActivityModeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyMedalTierDefinition = (0, sqlite_core_1.sqliteTable)("DestinyMedalTierDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyAchievementDefinition = (0, sqlite_core_1.sqliteTable)("DestinyAchievementDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyActivityGraphDefinition = (0, sqlite_core_1.sqliteTable)("DestinyActivityGraphDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyActivityInteractableDefinition = (0, sqlite_core_1.sqliteTable)("DestinyActivityInteractableDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyBondDefinition = (0, sqlite_core_1.sqliteTable)("DestinyBondDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyCollectibleDefinition = (0, sqlite_core_1.sqliteTable)("DestinyCollectibleDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyDestinationDefinition = (0, sqlite_core_1.sqliteTable)("DestinyDestinationDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyEquipmentSlotDefinition = (0, sqlite_core_1.sqliteTable)("DestinyEquipmentSlotDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyEventCardDefinition = (0, sqlite_core_1.sqliteTable)("DestinyEventCardDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyFireteamFinderActivityGraphDefinition = (0, sqlite_core_1.sqliteTable)("DestinyFireteamFinderActivityGraphDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyFireteamFinderActivitySetDefinition = (0, sqlite_core_1.sqliteTable)("DestinyFireteamFinderActivitySetDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyFireteamFinderLabelDefinition = (0, sqlite_core_1.sqliteTable)("DestinyFireteamFinderLabelDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyFireteamFinderLabelGroupDefinition = (0, sqlite_core_1.sqliteTable)("DestinyFireteamFinderLabelGroupDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyFireteamFinderOptionDefinition = (0, sqlite_core_1.sqliteTable)("DestinyFireteamFinderOptionDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyFireteamFinderOptionGroupDefinition = (0, sqlite_core_1.sqliteTable)("DestinyFireteamFinderOptionGroupDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyStatDefinition = (0, sqlite_core_1.sqliteTable)("DestinyStatDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyInventoryItemDefinition = (0, sqlite_core_1.sqliteTable)("DestinyInventoryItemDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyItemTierTypeDefinition = (0, sqlite_core_1.sqliteTable)("DestinyItemTierTypeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyLoadoutColorDefinition = (0, sqlite_core_1.sqliteTable)("DestinyLoadoutColorDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyLoadoutIconDefinition = (0, sqlite_core_1.sqliteTable)("DestinyLoadoutIconDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyLoadoutNameDefinition = (0, sqlite_core_1.sqliteTable)("DestinyLoadoutNameDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyLocationDefinition = (0, sqlite_core_1.sqliteTable)("DestinyLocationDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyLoreDefinition = (0, sqlite_core_1.sqliteTable)("DestinyLoreDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyMaterialRequirementSetDefinition = (0, sqlite_core_1.sqliteTable)("DestinyMaterialRequirementSetDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyMetricDefinition = (0, sqlite_core_1.sqliteTable)("DestinyMetricDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyObjectiveDefinition = (0, sqlite_core_1.sqliteTable)("DestinyObjectiveDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySandboxPerkDefinition = (0, sqlite_core_1.sqliteTable)("DestinySandboxPerkDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyPlugSetDefinition = (0, sqlite_core_1.sqliteTable)("DestinyPlugSetDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyPowerCapDefinition = (0, sqlite_core_1.sqliteTable)("DestinyPowerCapDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyPresentationNodeDefinition = (0, sqlite_core_1.sqliteTable)("DestinyPresentationNodeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyProgressionDefinition = (0, sqlite_core_1.sqliteTable)("DestinyProgressionDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyProgressionLevelRequirementDefinition = (0, sqlite_core_1.sqliteTable)("DestinyProgressionLevelRequirementDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyRecordDefinition = (0, sqlite_core_1.sqliteTable)("DestinyRecordDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySackRewardItemListDefinition = (0, sqlite_core_1.sqliteTable)("DestinySackRewardItemListDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySandboxPatternDefinition = (0, sqlite_core_1.sqliteTable)("DestinySandboxPatternDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySeasonDefinition = (0, sqlite_core_1.sqliteTable)("DestinySeasonDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySeasonPassDefinition = (0, sqlite_core_1.sqliteTable)("DestinySeasonPassDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySocialCommendationDefinition = (0, sqlite_core_1.sqliteTable)("DestinySocialCommendationDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySocketCategoryDefinition = (0, sqlite_core_1.sqliteTable)("DestinySocketCategoryDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySocketTypeDefinition = (0, sqlite_core_1.sqliteTable)("DestinySocketTypeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyTraitDefinition = (0, sqlite_core_1.sqliteTable)("DestinyTraitDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyVendorDefinition = (0, sqlite_core_1.sqliteTable)("DestinyVendorDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyMilestoneDefinition = (0, sqlite_core_1.sqliteTable)("DestinyMilestoneDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyActivityModifierDefinition = (0, sqlite_core_1.sqliteTable)("DestinyActivityModifierDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyReportReasonCategoryDefinition = (0, sqlite_core_1.sqliteTable)("DestinyReportReasonCategoryDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyArtifactDefinition = (0, sqlite_core_1.sqliteTable)("DestinyArtifactDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyBreakerTypeDefinition = (0, sqlite_core_1.sqliteTable)("DestinyBreakerTypeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyChecklistDefinition = (0, sqlite_core_1.sqliteTable)("DestinyChecklistDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyEnergyTypeDefinition = (0, sqlite_core_1.sqliteTable)("DestinyEnergyTypeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinySocialCommendationNodeDefinition = (0, sqlite_core_1.sqliteTable)("DestinySocialCommendationNodeDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyGuardianRankDefinition = (0, sqlite_core_1.sqliteTable)("DestinyGuardianRankDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyGuardianRankConstantsDefinition = (0, sqlite_core_1.sqliteTable)("DestinyGuardianRankConstantsDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyLoadoutConstantsDefinition = (0, sqlite_core_1.sqliteTable)("DestinyLoadoutConstantsDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyFireteamFinderConstantsDefinition = (0, sqlite_core_1.sqliteTable)("DestinyFireteamFinderConstantsDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyGlobalConstantsDefinition = (0, sqlite_core_1.sqliteTable)("DestinyGlobalConstantsDefinition", {
    id: (0, sqlite_core_1.integer)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
exports.destinyHistoricalStatsDefinition = (0, sqlite_core_1.sqliteTable)("DestinyHistoricalStatsDefinition", {
    key: (0, sqlite_core_1.text)().primaryKey().notNull(),
    json: (0, sqlite_core_1.blob)().default((0, drizzle_orm_1.sql) `(null)`),
});
