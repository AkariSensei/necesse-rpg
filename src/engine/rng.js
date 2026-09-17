/**
 * Test de probabilité.
 *
 * @param {number} chance - Probabilité de réussite, entre 0 et 1.
 * @returns {boolean} true si le jet réussit.
 *
 */
export function roll(chance) {
    return Math.random() < chance
}

/**
 * Tirage dans une liste.
 *
 * Chaque entrée porte un champ `weight` : plus il est élevé, plus l'entrée a
 * de chances de sortir.
 *
 * @param {Array<{weight: number}>} entries - Liste non vide d'entrées pondérées.
 * @returns {object} L'entrée tirée.
 *
 * Avec des poids 5, 2 et 1 (total 8), la première sort 5 fois sur 8.
 */
export function pickWeighted(entries) {
    const total = entries.reduce((sum, entry) => sum + entry.weight, 0)

    // On tire un point au hasard sur la somme des poids, puis on avance dans
    // la liste en retranchant chaque poids jusqu'à dépasser ce point.
    let cursor = Math.random() * total

    for (const entry of entries) {
        cursor -= entry.weight
        if (cursor < 0) return entry
    }

    // Filet de sécurité contre les erreurs d'arrondi en virgule flottante.
    return entries[entries.length - 1]
}