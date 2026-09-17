import { ENEMIES } from '../../data/enemies.js'
import StatBar from './StatBar.jsx'

/** L'adversaire : son nom, ce qu'il reste de lui, et ce qu'il encaisse. */
export default function EnemyPanel({ enemy }) {
    const definition = ENEMIES[enemy.id]

    return (
        <section className="border-b border-edge pb-5">
            <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-chronicle text-2xl text-bone">{definition.name}</h2>
                <span className="text-sm text-iron">
                    niveau {definition.level} · armure {definition.armor}
                </span>
            </div>

            <div className="mt-4">
                <StatBar label="Points de vie" current={enemy.hp} max={enemy.maxHp} />
            </div>
        </section>
    )
}
