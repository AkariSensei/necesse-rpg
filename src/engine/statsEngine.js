import { ITEMS } from '../data/items.js'

/**
 * Caract\u00e9ristiques r\u00e9elles du joueur : celles de base plus l'\u00e9quipement port\u00e9.
 *
 * Le r\u00e9sultat n'est jamais stock\u00e9 : on le recalcule \u00e0 chaque besoin, sinon
 * les bonus d'\u00e9quipement s'accumuleraient au fil des appels.
 *
 * @param {object} player
 * @returns {{force: number, initiative: number, armor: number}}
 */
export function getEffectiveStats(player) {
    const effective = {
        force: player.stats.force,
        initiative: player.stats.initiative,
        // L'armure ne vient que de l'\u00e9quipement, jamais des caract\u00e9ristiques.
        armor: 0,
    }

    for (const itemId of Object.values(player.equipment)) {
        if (!itemId) continue

        const item = ITEMS[itemId]
        for (const [stat, value] of Object.entries(item.stats)) {
            effective[stat] = (effective[stat] ?? 0) + value
        }
    }

    return effective
}
