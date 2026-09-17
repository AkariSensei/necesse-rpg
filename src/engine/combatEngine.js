import { ARMOR_SCALE, DAMAGE_MULTIPLIER, MIN_DAMAGE } from '../data/combat.js';

/**
 * Dégâts avant la réduction de l'armure.
 * @param playerStrength
 * @param weaponStrength
 * @param attackChoose
 * @returns {number}
 */
export function computeRawDamage(playerStrength, weaponStrength, attackChoose) {
    return (playerStrength + weaponStrength) * DAMAGE_MULTIPLIER[attackChoose];
}


/**
 * Dégâts pris par le joueur
 * @param rawDamage
 * @param armor
 * @returns {number}
 */
export function applyArmor(rawDamage, armor) {
    const damageReduction = armor / (armor + ARMOR_SCALE)
    return Math.max(MIN_DAMAGE, Math.round(rawDamage * (1 - damageReduction)));
}