import { useEffect, useRef } from 'react'

/**
 * Le journal de combat.
 *
 * C'est le cœur de l'écran : dans un jeu textuel, l'action se passe ici et
 * nulle part ailleurs. Il occupe la plus grande surface, se lit en serif, et
 * garde toujours la dernière ligne en vue.
 */
const TONE_CLASS = {
    neutral: 'text-iron',
    good: 'text-bone',
    bad: 'text-ember',
    critical: 'text-ember font-medium',
}

export default function CombatLog({ entries }) {
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: 'end' })
    }, [entries])

    return (
        <div
            className="h-72 overflow-y-auto rounded-sm bg-stone/60 px-5 py-4 sm:h-80"
            aria-live="polite"
        >
            <ol className="flex flex-col gap-2 font-chronicle text-[15px] leading-relaxed">
                {entries.map((entry, index) => (
                    <li
                        key={index}
                        className={`${TONE_CLASS[entry.tone]} max-w-[70ch]`}
                    >
                        {entry.text}
                    </li>
                ))}
            </ol>
            <div ref={bottomRef} />
        </div>
    )
}
