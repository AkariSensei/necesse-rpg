/**
 * Constantes d'équilibrage du combat.
 *
 * Aucune de ces valeurs ne doit être écrite en dur dans le moteur.
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
 * Dégâts bruts = force effective du joueur * ce coefficient.
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

/** Taux de réussite de base, avant bonus de caractéristique. */
export const BASE_SUCCESS_RATE = {
    lightAttack: 0.85,
    heavyAttack: 0.5,
    dodge: 0.45,
    flee: 0.35,
}

/** Réussite gagnée par point de la caractéristique qui gouverne l'action. */
export const BONUS_SUCCESS_PER_STAT_POINT = 0.02

/**
 * Part des dégâts de base de l'ennemi infligée en contre-attaque
 * lorsque l'attaque lourde du joueur échoue.
 */
export const COUNTER_ATTACK_RATIO = 0.5

/** PV rendus par une potion d'urgence. */
export const EMERGENCY_HEAL_AMOUNT = 10
