import { ENEMIES } from '../data/enemies.js'
import { getEffectiveStats } from '../engine/statsEngine.js'
import { useCombatStore } from '../store/useCombatStore.js'
import ActionBar from '../components/combat/ActionBar.jsx'
import CombatLog from '../components/combat/CombatLog.jsx'
import EnemyPanel from '../components/combat/EnemyPanel.jsx'
import PlayerPanel from '../components/combat/PlayerPanel.jsx'

/** Verdicts de fin de combat. */
const OUTCOME = {
    victory: 'Vous êtes encore debout.',
    defeat: 'Vous n’irez pas plus loin aujourd’hui.',
    fled: 'Vous avez rompu le combat.',
}

export default function CombatScreen() {
    const combat = useCombatStore((state) => state.combat)
    const log = useCombatStore((state) => state.log)
    const start = useCombatStore((state) => state.start)
    const act = useCombatStore((state) => state.act)
    const reset = useCombatStore((state) => state.reset)

    if (!combat) {
        return <EnemyChoice onChoose={start} />
    }

    const stats = getEffectiveStats(combat.player)
    const combatOver = combat.status !== 'ongoing'

    return (
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-5 py-8">
            <EnemyPanel enemy={combat.enemy} />

            <CombatLog entries={log} />

            {combatOver ? (
                <div className="rounded-sm border border-edge bg-stone px-5 py-6 text-center">
                    <p className="font-chronicle text-xl text-bone">{OUTCOME[combat.status]}</p>
                    <button
                        type="button"
                        onClick={reset}
                        className="mt-4 rounded-sm border border-gold px-5 py-2 text-gold
                                   transition-colors hover:bg-gold hover:text-night"
                    >
                        Choisir un autre adversaire
                    </button>
                </div>
            ) : (
                <ActionBar combat={combat} stats={stats} onAct={act} />
            )}

            <PlayerPanel player={combat.player} stats={stats} turn={combat.turn} />
        </main>
    )
}

/** Choix de l'adversaire. Tient lieu d'exploration tant qu'elle n'existe pas. */
function EnemyChoice({ onChoose }) {
    return (
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-5 py-8">
            <header>
                <h1 className="font-chronicle text-3xl text-bone">Qui allez-vous affronter ?</h1>
                <p className="mt-2 max-w-[60ch] text-iron">
                    Banc d’essai du combat. L’exploration, l’équipement et les sauvegardes
                    viendront plus tard.
                </p>
            </header>

            <ul className="grid gap-3">
                {Object.values(ENEMIES).map((enemy) => (
                    <li key={enemy.id}>
                        <button
                            type="button"
                            onClick={() => onChoose(enemy.id)}
                            className="w-full rounded-sm border border-edge bg-stone px-5 py-4 text-left
                                       transition-colors hover:border-gold"
                        >
                            <span className="flex items-baseline justify-between gap-4">
                                <span className="font-chronicle text-lg text-bone">{enemy.name}</span>
                                <span className="text-sm text-iron">
                                    {enemy.hp} PV · armure {enemy.armor} · initiative {enemy.initiative}
                                </span>
                            </span>
                            <span className="mt-1 block max-w-[60ch] text-sm text-iron">
                                {enemy.description}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    )
}
