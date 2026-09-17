import {
    ARMOR_SCALE,
    BASE_SUCCESS_RATE,
    BONUS_SUCCESS_PER_STAT_POINT,
    COUNTER_ATTACK_RATIO,
    DAMAGE_MULTIPLIER,
    DODGE_SUCCESS_BONUS,
    EMERGENCY_HEAL_AMOUNT,
    MIN_DAMAGE,
    STAMINA_COST,
    STAMINA_MAX,
    STAMINA_REGEN_PER_TURN,
} from '../data/combat.js'
import { ENEMIES } from '../data/enemies.js'
import { getMaxHp } from '../data/player.js'
import { pickWeighted, roll } from './rng.js'
import { getEffectiveStats } from './statsEngine.js'

/**
 * Moteur de combat.
 *
 * Aucune de ces fonctions n'importe React, ne touche au store, ni ne produit
 * de texte affichable. Elles prennent un \u00e9tat et retournent un nouvel \u00e9tat
 * accompagn\u00e9 d'une liste d'\u00e9v\u00e9nements d\u00e9crivant ce qui s'est pass\u00e9.
 *
 * La mise en fran\u00e7ais de ces \u00e9v\u00e9nements est le travail du narrateur
 * (services/combatNarrator.js).
 */

/** Caract\u00e9ristique qui gouverne la r\u00e9ussite de chaque action. */
const GOVERNING_STAT = {
    lightAttack: 'initiative',
    heavyAttack: 'force',
    dodge: 'initiative',
    flee: 'initiative',
}

/** Actions reconnues par le moteur. */
export const COMBAT_ACTIONS = ['lightAttack', 'heavyAttack', 'dodge', 'emergencyHeal', 'flee']

// ---------------------------------------------------------------------------
// Calculs \u00e9l\u00e9mentaires
// ---------------------------------------------------------------------------

/**
 * Probabilit\u00e9 de r\u00e9ussite d'une action, born\u00e9e entre 0 et 1.
 *
 * @param {object} stats - Caract\u00e9ristiques effectives du joueur.
 * @param {string} action - Identifiant de l'action.
 * @param {number} bonus - Bonus temporaire (esquive r\u00e9ussie au tour pr\u00e9c\u00e9dent).
 */
export function getSuccessRate(stats, action, bonus = 0) {
    const statValue = stats[GOVERNING_STAT[action]]
    const rate = BASE_SUCCESS_RATE[action] + statValue * BONUS_SUCCESS_PER_STAT_POINT + bonus

    return Math.min(1, Math.max(0, rate))
}

/**
 * D\u00e9g\u00e2ts avant r\u00e9duction par l'armure.
 *
 * @param {number} totalForce - Force effective (caract\u00e9ristique + arme).
 * @param {string} action - lightAttack ou heavyAttack.
 */
export function computeRawDamage(totalForce, action) {
    return totalForce * DAMAGE_MULTIPLIER[action]
}

/**
 * D\u00e9g\u00e2ts r\u00e9ellement encaiss\u00e9s, apr\u00e8s r\u00e9duction par l'armure.
 *
 * L'arrondi n'intervient qu'ici, \u00e0 la toute fin du calcul : arrondir \u00e0 chaque
 * \u00e9tape accumulerait les erreurs et rendrait l'\u00e9quilibrage impr\u00e9visible.
 */
export function applyArmor(rawDamage, armor) {
    const damageReduction = armor / (armor + ARMOR_SCALE)
    return Math.max(MIN_DAMAGE, Math.round(rawDamage * (1 - damageReduction)))
}

// ---------------------------------------------------------------------------
// Utilitaires internes
// ---------------------------------------------------------------------------

/** Copie de travail de l'\u00e9tat : le moteur ne modifie jamais l'\u00e9tat re\u00e7u. */
function cloneState(state) {
    return {
        ...state,
        player: { ...state.player },
        enemy: { ...state.enemy },
    }
}

/** D\u00e9finition compl\u00e8te de l'ennemi courant. */
export function getEnemyDefinition(state) {
    return ENEMIES[state.enemy.id]
}

// ---------------------------------------------------------------------------
// Ouverture du combat
// ---------------------------------------------------------------------------

/**
 * Cr\u00e9e un combat.
 *
 * L'ordre du tour est d\u00e9cid\u00e9 par l'initiative. En cas d'\u00e9galit\u00e9, le joueur
 * commence. Si l'ennemi est plus rapide, il frappe imm\u00e9diatement.
 *
 * @param {object} player - Le personnage, tel que d\u00e9fini dans data/player.js.
 * @param {string} enemyId - Identifiant de l'ennemi affront\u00e9.
 */
export function createCombat(player, enemyId) {
    const definition = ENEMIES[enemyId]
    const stats = getEffectiveStats(player)
    const maxHp = getMaxHp(player.level)

    let state = {
        player: {
            name: player.name,
            level: player.level,
            hp: player.hp ?? maxHp,
            maxHp,
            stamina: STAMINA_MAX,
            stats: player.stats,
            equipment: player.equipment,
            emergencyPotions: player.emergencyPotions,
        },
        enemy: {
            id: enemyId,
            hp: definition.hp,
            maxHp: definition.hp,
        },
        dodgeBonus: 0,
        dodging: false,
        turn: 1,
        status: 'ongoing',
    }

    const events = [{ type: 'combatStart', enemyId }]

    const playerIsFaster = stats.initiative >= definition.initiative
    events.push({ type: 'initiative', playerFirst: playerIsFaster })

    if (!playerIsFaster) {
        const opening = resolveEnemyTurn(state, stats)
        state = opening.state
        events.push(...opening.events)
    }

    return { state, events }
}

// ---------------------------------------------------------------------------
// Tour du joueur
// ---------------------------------------------------------------------------

/**
 * R\u00e9sout un tour complet : l'action du joueur, puis la riposte de l'ennemi.
 *
 * @param {object} state - \u00c9tat courant du combat.
 * @param {string} action - Identifiant de l'action choisie.
 * @returns {{state: object, events: Array}}
 */
export function playerTurn(state, action) {
    if (state.status !== 'ongoing') {
        return { state, events: [] }
    }

    const cost = STAMINA_COST[action]

    // Une action impossible ne consomme pas le tour : le joueur rejoue.
    if (state.player.stamina < cost) {
        return { state, events: [{ type: 'notEnoughStamina', action, cost }] }
    }

    if (action === 'emergencyHeal' && state.player.emergencyPotions <= 0) {
        return { state, events: [{ type: 'noPotion' }] }
    }

    const stats = getEffectiveStats(state.player)
    let next = cloneState(state)
    const events = []

    next.player.stamina -= cost
    next.dodging = false

    resolvePlayerAction(next, stats, action, events)

    if (next.enemy.hp <= 0) {
        next.enemy.hp = 0
        next.status = 'victory'
        events.push({ type: 'enemyDefeated', xp: getEnemyDefinition(next).xp })
        return { state: next, events }
    }

    if (next.status === 'ongoing') {
        const enemyPhase = resolveEnemyTurn(next, stats)
        next = enemyPhase.state
        events.push(...enemyPhase.events)
    }

    if (next.status === 'ongoing') {
        next.player.stamina = Math.min(STAMINA_MAX, next.player.stamina + STAMINA_REGEN_PER_TURN)
        next.turn += 1
        next.dodging = false
    }

    return { state: next, events }
}

/** Applique l'action choisie par le joueur. Mute `next`, remplit `events`. */
function resolvePlayerAction(next, stats, action, events) {
    const enemy = getEnemyDefinition(next)

    if (action === 'lightAttack' || action === 'heavyAttack') {
        const bonus = next.dodgeBonus
        const rate = getSuccessRate(stats, action, bonus)
        const success = roll(rate)

        // Le bonus d'esquive se consomme d\u00e8s qu'un coup est tent\u00e9,
        // qu'il touche ou non.
        next.dodgeBonus = 0

        if (success) {
            const raw = computeRawDamage(stats.force, action)
            const dealt = applyArmor(raw, enemy.armor)
            next.enemy.hp -= dealt

            events.push({
                type: 'playerAttack',
                action,
                success: true,
                rate,
                bonus,
                raw: Math.round(raw),
                absorbed: Math.round(raw) - dealt,
                dealt,
            })
            return
        }

        events.push({ type: 'playerAttack', action, success: false, rate, bonus })

        // Seule l'attaque lourde rat\u00e9e expose \u00e0 une contre-attaque.
        if (action === 'heavyAttack') {
            const raw = enemy.baseDamage * COUNTER_ATTACK_RATIO
            const dealt = applyArmor(raw, stats.armor)
            next.player.hp -= dealt

            events.push({
                type: 'counterAttack',
                raw: Math.round(raw),
                absorbed: Math.round(raw) - dealt,
                dealt,
            })

            if (next.player.hp <= 0) {
                next.player.hp = 0
                next.status = 'defeat'
                events.push({ type: 'playerDefeated' })
            }
        }
        return
    }

    if (action === 'dodge') {
        const rate = getSuccessRate(stats, action)
        const success = roll(rate)

        next.dodging = success
        // Non cumulable : on affecte, on n'additionne pas.
        next.dodgeBonus = success ? DODGE_SUCCESS_BONUS : 0

        events.push({ type: 'dodge', success, rate })
        return
    }

    if (action === 'emergencyHeal') {
        const before = next.player.hp
        next.player.hp = Math.min(next.player.maxHp, before + EMERGENCY_HEAL_AMOUNT)
        next.player.emergencyPotions -= 1

        events.push({
            type: 'emergencyHeal',
            healed: next.player.hp - before,
            remaining: next.player.emergencyPotions,
        })
        return
    }

    if (action === 'flee') {
        const rate = getSuccessRate(stats, action)
        const success = roll(rate)

        events.push({ type: 'flee', success, rate })

        if (success) {
            next.status = 'fled'
        }
        // Une fuite rat\u00e9e ne co\u00fbte rien de plus : l'ennemi frappe
        // normalement lors de sa phase.
    }
}

// ---------------------------------------------------------------------------
// Tour de l'ennemi
// ---------------------------------------------------------------------------

/**
 * Fait agir l'ennemi.
 *
 * L'ennemi est asym\u00e9trique : il n'a ni endurance, ni esquive, ni fuite,
 * et ses attaques ne ratent jamais. Seule l'esquive du joueur peut annuler
 * un coup.
 */
function resolveEnemyTurn(state, stats) {
    const next = cloneState(state)
    const events = []
    const definition = getEnemyDefinition(next)
    const attack = pickWeighted(definition.attacks)

    if (attack.damage === 0) {
        events.push({ type: 'enemyAttack', attack, harmless: true })
        return { state: next, events }
    }

    if (next.dodging) {
        events.push({ type: 'enemyAttack', attack, dodged: true })
        return { state: next, events }
    }

    const dealt = applyArmor(attack.damage, stats.armor)
    next.player.hp -= dealt

    events.push({
        type: 'enemyAttack',
        attack,
        raw: attack.damage,
        absorbed: attack.damage - dealt,
        dealt,
    })

    if (next.player.hp <= 0) {
        next.player.hp = 0
        next.status = 'defeat'
        events.push({ type: 'playerDefeated' })
    }

    return { state: next, events }
}
