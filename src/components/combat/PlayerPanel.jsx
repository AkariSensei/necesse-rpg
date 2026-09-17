import { STAMINA_MAX } from '../../data/combat.js'
import StatBar from './StatBar.jsx'

/** L'état du joueur : ce qu'il lui reste pour tenir le tour suivant. */
export default function PlayerPanel({ player, stats, turn }) {
    return (
        <section className="border-t border-edge pt-5">
            <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-chronicle text-xl text-bone">{player.name}</h2>
                <span className="text-sm text-iron">tour {turn}</span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <StatBar label="Points de vie" current={player.hp} max={player.maxHp} />
                <StatBar
                    label="Endurance"
                    current={player.stamina}
                    max={STAMINA_MAX}
                    color="bg-moss"
                />
            </div>

            <p className="mt-4 text-sm text-iron">
                force {stats.force} · initiative {stats.initiative} · armure {stats.armor} ·
                potions d’urgence {player.emergencyPotions}
            </p>
        </section>
    )
}
