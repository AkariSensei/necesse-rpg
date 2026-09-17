/**
 * Les ennemis du jeu, indexés par identifiant.
 *
 * Le niveau est une étiquette, pas une formule : les statistiques sont
 * écrites à la main pour garder le contrôle total de l'équilibrage.
 *
 * `baseDamage` ne sert qu'à la contre-attaque déclenchée par une attaque
 * lourde ratée du joueur. Les dégâts réels viennent toujours de `attacks`.
 */
export const ENEMIES = {
    skeleton: {
        id: 'skeleton',
        name: 'Squelette',
        level: 1,
        hp: 18,
        armor: 5,
        initiative: 3,
        baseDamage: 4,
        xp: 8,
        crans: 2,
        description: "Des os tenus par une volonté qui n'est plus la sienne.",
        attacks: [
            {
                id: 'skeleton_axe',
                name: 'Coup de hache',
                damage: 3,
                weight: 2,
                text: 'Le squelette abat sa hache rouillée.',
            },
            {
                id: 'skeleton_jump',
                name: 'Bond',
                damage: 4,
                weight: 5,
                text: 'Le squelette bondit sur vous dans un claquement d\u2019os.',
            },
            {
                id: 'skeleton_retreat',
                name: 'Repli',
                damage: 0,
                weight: 1,
                text: 'Le squelette recule d\u2019un pas et vous jauge en silence.',
            },
        ],
    },

    bog_slime: {
        id: 'bog_slime',
        name: 'Gluant des tourbi\u00e8res',
        level: 2,
        hp: 34,
        armor: 14,
        initiative: 1,
        baseDamage: 3,
        xp: 12,
        crans: 3,
        description: 'Lent, mou, et bien plus difficile \u00e0 entamer qu\u2019il n\u2019y para\u00eet.',
        attacks: [
            {
                id: 'bog_slime_engulf',
                name: 'Engloutissement',
                damage: 3,
                weight: 6,
                text: 'Le gluant se r\u00e9pand sur vos jambes et serre.',
            },
            {
                id: 'bog_slime_acid',
                name: 'Projection acide',
                damage: 7,
                weight: 2,
                text: 'Le gluant expulse une gerbe acide en sifflant.',
            },
            {
                id: 'bog_slime_settle',
                name: 'Affaissement',
                damage: 0,
                weight: 2,
                text: 'Le gluant s\u2019affaisse sur lui-m\u00eame et reprend sa forme.',
            },
        ],
    },

    night_bat: {
        id: 'night_bat',
        name: 'Chauve-souris nocturne',
        level: 1,
        hp: 9,
        armor: 0,
        initiative: 9,
        baseDamage: 5,
        xp: 6,
        crans: 1,
        description: 'Rapide, fragile, et toujours l\u00e0 avant vous.',
        attacks: [
            {
                id: 'night_bat_dive',
                name: 'Piqu\u00e9',
                damage: 6,
                weight: 4,
                text: 'La chauve-souris plonge droit sur votre visage.',
            },
            {
                id: 'night_bat_bite',
                name: 'Morsure',
                damage: 3,
                weight: 3,
                text: 'La chauve-souris vous mord la nuque.',
            },
            {
                id: 'night_bat_circle',
                name: 'Vol circulaire',
                damage: 0,
                weight: 3,
                text: 'La chauve-souris tournoie hors de port\u00e9e.',
            },
        ],
    },
}
