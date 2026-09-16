export const ENEMIES = {
    skeleton: {
        id: 'skeleton',
        name: 'Skeleton',
        level: 1,
        hp: 18,
        armor: 5,
        xp: 8,
        crans: 2,
        attacks: [
            {
                id: 'skeleton_axe',
                name: 'axe blow',
                damage: 3,
                weight: 2,
                text: 'The skeleton throws its axe at you.'
            },
            {
                id: 'skeleton_jump',
                name: 'axe jump',
                damage: 4,
                weight: 5,
                text: 'The skeleton jump on you.'
            },
            {
                id: 'skeleton_retreat',
                name: 'retreat',
                damage: 0,
                weight: 1,
                text: 'The skeleton just go back and look at you.'
            },
        ]
    }
}