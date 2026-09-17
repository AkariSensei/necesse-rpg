import { STAMINA_COST } from '../../data/combat.js'
import { getSuccessRate } from '../../engine/combatEngine.js'

/**
 * Les cinq actions du joueur.
 *
 * Les chances de réussite sont affichées : un jeu de décisions doit donner
 * au joueur de quoi décider. Sans le chiffre, l'attaque lourde n'est plus un
 * pari mais une devinette.
 */
const ACTIONS = [
    { id: 'lightAttack', label: 'Attaque légère', hint: 'Sûre, peu coûteuse' },
    { id: 'heavyAttack', label: 'Attaque lourde', hint: 'Riposte si elle rate' },
    { id: 'dodge', label: 'Esquive', hint: 'Prépare le coup suivant' },
    { id: 'emergencyHeal', label: 'Potion d’urgence', hint: 'Soin garanti' },
    { id: 'flee', label: 'Fuite', hint: 'Abandonne le combat' },
]

export default function ActionBar({ combat, stats, onAct }) {
    const { player, dodgeBonus, status } = combat
    const combatOver = status !== 'ongoing'

    return (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIONS.map((action) => {
                const cost = STAMINA_COST[action.id]
                const tooTired = player.stamina < cost
                const noPotion = action.id === 'emergencyHeal' && player.emergencyPotions <= 0
                const disabled = combatOver || tooTired || noPotion

                const chance =
                    action.id === 'emergencyHeal'
                        ? null
                        : Math.round(getSuccessRate(stats, action.id, dodgeBonus) * 100)

                return (
                    <button
                        key={action.id}
                        type="button"
                        onClick={() => onAct(action.id)}
                        disabled={disabled}
                        className="rounded-sm border border-edge bg-stone px-4 py-3 text-left
                                   transition-colors hover:border-gold disabled:cursor-not-allowed
                                   disabled:opacity-35 disabled:hover:border-edge"
                    >
                        <span className="flex items-baseline justify-between gap-3">
                            <span className="text-bone">{action.label}</span>
                            <span className="font-chronicle text-sm text-gold tabular-nums">
                                {chance === null ? 'sûr' : `${chance} %`}
                            </span>
                        </span>
                        <span className="mt-1 block text-xs text-iron">
                            {cost} endurance · {action.hint}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
