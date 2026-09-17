/**
 * Jauge horizontale : PV, endurance, et tout ce qui se vide.
 *
 * La valeur chiffrée est toujours affichée à côté de la barre : en textuel,
 * le joueur compte ses points, il ne les estime pas à l'œil.
 */
export default function StatBar({ label, current, max, color = 'bg-ember' }) {
    const ratio = max > 0 ? Math.max(0, current / max) : 0

    return (
        <div>
            <div className="flex items-baseline justify-between text-sm">
                <span className="text-iron">{label}</span>
                <span className="font-chronicle text-bone tabular-nums">
                    {current} / {max}
                </span>
            </div>
            <div
                className="mt-1 h-2 w-full overflow-hidden rounded-sm bg-edge"
                role="progressbar"
                aria-label={label}
                aria-valuenow={current}
                aria-valuemin={0}
                aria-valuemax={max}
            >
                <div
                    className={`h-full ${color} transition-[width] duration-300`}
                    style={{ width: `${ratio * 100}%` }}
                />
            </div>
        </div>
    )
}
