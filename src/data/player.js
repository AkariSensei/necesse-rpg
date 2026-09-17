/**
 * Personnage de d\u00e9part.
 *
 * Cod\u00e9 en dur pour la v0.1 : ni cr\u00e9ation de personnage, ni sauvegarde.
 * Le prologue et la mont\u00e9e de niveau viendront en v0.4.
 */

/** PV de base, avant le bonus de niveau. */
export const PLAYER_BASE_HP = 20

export const STARTING_PLAYER = {
    name: 'Voyageur',
    level: 1,
    xp: 0,
    stats: {
        force: 3,
        initiative: 4,
    },
    equipment: {
        mainHand: 'wooden_sword',
        chest: 'leather_armor',
        head: null,
        legs: null,
    },
    /** Potions d'urgence, seules utilisables en plein combat. */
    emergencyPotions: 2,
}

/** PV maximum d'un personnage \u00e0 un niveau donn\u00e9. */
export function getMaxHp(level) {
    return PLAYER_BASE_HP + level
}
