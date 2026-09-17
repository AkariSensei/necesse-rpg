/**
 * Les objets du jeu, index\u00e9s par identifiant.
 *
 * `slot` indique l'emplacement d'\u00e9quipement occup\u00e9.
 * `stats` est libre : n'importe quelle caract\u00e9ristique peut y figurer,
 * en positif comme en n\u00e9gatif.
 */
export const ITEMS = {
    wooden_sword: {
        id: 'wooden_sword',
        name: '\u00c9p\u00e9e en bois',
        type: 'weapon',
        slot: 'mainHand',
        stats: { force: 2 },
    },
    leather_armor: {
        id: 'leather_armor',
        name: 'Armure de cuir',
        type: 'armor',
        slot: 'chest',
        stats: { armor: 4 },
    },
}
