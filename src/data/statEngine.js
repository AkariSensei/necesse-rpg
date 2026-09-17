import { ITEMS } from './items.js';

/**
 * Caractéristiques réelles du joueur : celles de base + équipement.
 * @param player
 * @returns {{force: number, initiative: *, armor: number}}
 */
export function getEffectiveStats(player) {
    const effective = {
        force: player.stats.force,
        initiative: player.stats.initiative,
        armor: 0,
    }

    for (const itemId of Object.values(player.equipment)) {
        if (!itemId) continue

        const item = ITEMS[itemId]
        for (const [stat, value] of Object.entries(item.stats)) {
            effective[stat] = (effective[stat] ?? 0) + value;
        }
    }

    return effective
}