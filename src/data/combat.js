/**
 * Constantes d'équilibrage du combat.
 *
 * Toutes sont provisoires et destinées à être ajustées au playtest.
 */

/** Réduction des dégâts par l'armure : armure / (armure + ARMOR_SCALE) */
export const ARMOR_SCALE = 50

/** Un coup qui touche inflige toujours au moins ce nombre de dégâts. */
export const MIN_DAMAGE = 1

/** Endurance du joueur. */
export const STAMINA_MAX = 6
export const STAMINA_REGEN_PER_TURN = 2

/** Coût en endurance de chaque action. */
export const STAMINA_COST = {
    lightAttack: 1,
    heavyAttack: 3,
    dodge: 2,
    emergencyHeal: 1,
    flee: 2,
}

/**
 * Multiplicateur appliqué aux dégâts bruts selon l'attaque.
 * Dégâts bruts = (force du joueur + force de l'arme) * ce coefficient.
 */
export const DAMAGE_MULTIPLIER = {
    lightAttack: 1.0,
    heavyAttack: 2.0,
}

/**
 * Bonus de réussite accordé au prochain coup après une esquive réussie.
 * Dure un seul tour, ne se cumule pas.
 */
export const DODGE_SUCCESS_BONUS = 0.25