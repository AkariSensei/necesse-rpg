import { create } from 'zustand'
import { createCombat, playerTurn } from '../engine/combatEngine.js'
import { STARTING_PLAYER } from '../data/player.js'
import { narrate } from '@/service/combatNarrator.js';

/**
 * \u00c9tat du combat courant.
 *
 * Le store n'ex\u00e9cute aucune r\u00e8gle : il appelle le moteur, conserve l'\u00e9tat
 * qu'il retourne, et empile les lignes de journal produites par le narrateur.
 */
export const useCombatStore = create((set, get) => ({
    /** \u00c9tat du combat, ou null si aucun combat n'est en cours. */
    combat: null,

    /** Lignes de journal, de la plus ancienne \u00e0 la plus r\u00e9cente. */
    log: [],

    /** Lance un combat contre l'ennemi donn\u00e9. */
    start(enemyId) {
        const { state, events } = createCombat(STARTING_PLAYER, enemyId)
        set({ combat: state, log: narrate(events) })
    },

    /** Joue une action du joueur et r\u00e9sout le tour complet. */
    act(action) {
        const { combat, log } = get()
        if (!combat || combat.status !== 'ongoing') return

        const { state, events } = playerTurn(combat, action)
        set({ combat: state, log: [...log, ...narrate(events)] })
    },

    /** Quitte le combat et revient \u00e0 l'\u00e9cran de s\u00e9lection. */
    reset() {
        set({ combat: null, log: [] })
    },
}))
