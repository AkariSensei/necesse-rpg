import { ENEMIES } from '../data/enemies.js'

/**
 * Narrateur de combat.
 *
 * Seul endroit du code qui transforme un \u00e9v\u00e9nement du moteur en phrase
 * fran\u00e7aise. Le moteur ignore tout de l'affichage, et changer une formulation
 * ne demande jamais d'y toucher.
 *
 * Chaque entr\u00e9e retourn\u00e9e porte un `tone` qui pilote sa couleur dans le
 * journal : neutral, good, bad, critical.
 */

const ACTION_LABEL = {
    lightAttack: 'attaque l\u00e9g\u00e8re',
    heavyAttack: 'attaque lourde',
    dodge: 'esquive',
    emergencyHeal: 'potion d\u2019urgence',
    flee: 'fuite',
}

/** Transforme une liste d'\u00e9v\u00e9nements en lignes de journal. */
export function narrate(events) {
    return events.map(narrateEvent).filter(Boolean)
}

function narrateEvent(event) {
    switch (event.type) {
        case 'combatStart': {
            const enemy = ENEMIES[event.enemyId]
            return {
                tone: 'critical',
                text: `${enemy.name} vous barre le passage. ${enemy.description}`,
            }
        }

        case 'initiative':
            return {
                tone: 'neutral',
                text: event.playerFirst
                    ? 'Vous r\u00e9agissez le premier.'
                    : 'Il est plus rapide que vous.',
            }

        case 'notEnoughStamina':
            return {
                tone: 'bad',
                text: `Pas assez d\u2019endurance pour une ${ACTION_LABEL[event.action]} (${event.cost} requis).`,
            }

        case 'noPotion':
            return { tone: 'bad', text: 'Vous n\u2019avez plus de potion d\u2019urgence.' }

        case 'playerAttack': {
            if (!event.success) {
                return {
                    tone: 'bad',
                    text: `Votre ${ACTION_LABEL[event.action]} fend l\u2019air.`,
                }
            }
            const absorbed = event.absorbed > 0
                ? ` Son armure en absorbe ${event.absorbed}.`
                : ''
            return {
                tone: 'good',
                text: `Votre ${ACTION_LABEL[event.action]} porte pour ${event.raw}.${absorbed} Il encaisse ${event.dealt}.`,
            }
        }

        case 'counterAttack': {
            const absorbed = event.absorbed > 0
                ? ` Votre armure en absorbe ${event.absorbed}.`
                : ''
            return {
                tone: 'critical',
                text: `D\u00e9s\u00e9quilibr\u00e9, vous encaissez sa riposte : ${event.raw}.${absorbed} Vous perdez ${event.dealt} PV.`,
            }
        }

        case 'dodge':
            return event.success
                ? { tone: 'good', text: 'Vous vous d\u00e9robez. Le prochain coup partira mieux.' }
                : { tone: 'bad', text: 'Votre d\u00e9robade part trop tard.' }

        case 'emergencyHeal':
            return {
                tone: 'good',
                text: `Vous videz une potion d\u2019urgence : ${event.healed} PV. Il vous en reste ${event.remaining}.`,
            }

        case 'flee':
            return event.success
                ? { tone: 'good', text: 'Vous rompez le combat et disparaissez dans les fourr\u00e9s.' }
                : { tone: 'bad', text: 'Vous cherchez une ouverture, sans la trouver.' }

        case 'enemyAttack': {
            if (event.harmless) {
                return { tone: 'neutral', text: event.attack.text }
            }
            if (event.dodged) {
                return { tone: 'good', text: `${event.attack.text} Vous n\u2019\u00eates plus l\u00e0.` }
            }
            const absorbed = event.absorbed > 0
                ? ` Votre armure en absorbe ${event.absorbed}.`
                : ''
            return {
                tone: 'bad',
                text: `${event.attack.text} ${event.raw} de d\u00e9g\u00e2ts.${absorbed} Vous perdez ${event.dealt} PV.`,
            }
        }

        case 'enemyDefeated':
            return { tone: 'good', text: `Il s\u2019effondre. ${event.xp} XP.` }

        case 'playerDefeated':
            return { tone: 'critical', text: 'Vos jambes l\u00e2chent. Le noir se referme.' }

        default:
            return null
    }
}
