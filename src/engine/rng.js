/**
 * Tous les tirages al\u00e9atoires du jeu passent par ici.
 *
 * Le jour o\u00f9 l'on voudra rejouer une partie \u00e0 l'identique, il suffira de
 * remplacer Math.random par un g\u00e9n\u00e9rateur \u00e0 graine dans ce seul fichier.
 */

/**
 * Test de probabilit\u00e9.
 *
 * @param {number} chance - Probabilit\u00e9 de r\u00e9ussite, entre 0 et 1.
 * @returns {boolean} true si le jet r\u00e9ussit.
 */
export function roll(chance) {
    return Math.random() < chance
}

/**
 * Tirage pond\u00e9r\u00e9 dans une liste.
 *
 * Chaque entr\u00e9e porte un champ `weight` : plus il est \u00e9lev\u00e9, plus l'entr\u00e9e
 * a de chances de sortir. Les poids n'ont pas besoin de totaliser une valeur
 * particuli\u00e8re.
 *
 * @param {Array<{weight: number}>} entries - Liste non vide d'entr\u00e9es pond\u00e9r\u00e9es.
 * @returns {object} L'entr\u00e9e tir\u00e9e.
 */
export function pickWeighted(entries) {
    const total = entries.reduce((sum, entry) => sum + entry.weight, 0)

    // On tire un point au hasard sur la somme des poids, puis on avance dans
    // la liste en retranchant chaque poids jusqu'\u00e0 d\u00e9passer ce point.
    let cursor = Math.random() * total

    for (const entry of entries) {
        cursor -= entry.weight
        if (cursor < 0) return entry
    }

    // Filet de s\u00e9curit\u00e9 contre les erreurs d'arrondi en virgule flottante.
    return entries[entries.length - 1]
}
