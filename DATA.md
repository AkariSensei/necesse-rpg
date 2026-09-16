# Necesse RPG — Structures de données

> Document de travail. Toute valeur chiffrée est provisoire et destinée à l'équilibrage.
> Périmètre actuel : **v0.1 — le combat**.

---

## Principes

1. **Un identifiant est définitif.** Jamais renommé, jamais réutilisé pour autre chose. On peut déprécier, jamais recycler.
2. **Les sauvegardes ne contiennent que des identifiants et des états**, jamais la définition d'un objet. Rééquilibrer une arme profite à toutes les parties existantes.
3. **`data/` est lisible sans contexte.** Quelqu'un qui ouvre `enemies.js` comprend sans lire le moteur.
4. **Aucune constante d'équilibrage dans le moteur.** Tout ce qui se règle vit dans `data/`.

---

## L'ennemi

| Champ | Type | Rôle |
|---|---|---|
| `id` | string | Identifiant définitif (`skeleton`) |
| `name` | string | Nom affiché |
| `level` | number | Niveau. Étiquette écrite à la main, pas une formule |
| `hp` | number | Points de vie |
| `armor` | number | Alimente la formule de réduction des dégâts |
| `xp` | number | XP accordée à la victoire |
| `crans` | number | Coût en temps de l'engagement |
| `attacks` | array | Liste d'attaques |

**Le niveau est une étiquette, pas une formule.** Les statistiques de chaque ennemi sont écrites à la main. Un squelette a 10 PV parce qu'on l'a décidé, pas parce qu'un calcul le dit. Ça donne le contrôle total de l'équilibrage et des ennemis qui ont chacun leur caractère.

**L'ennemi est asymétrique.** Il n'a pas d'endurance, ne choisit pas entre attaque légère et lourde, n'esquive pas et ne fuit pas. Toute la profondeur tactique est du côté du joueur.

**Une attaque ennemie ne rate jamais.** Seule l'esquive du joueur peut annuler un coup. Un seul jet, plus lisible.

---

## Une attaque ennemie

| Champ | Type | Rôle |
|---|---|---|
| `id` | string | Identifiant définitif |
| `name` | string | Nom de l'attaque |
| `damage` | number | Dégâts bruts. Peut valoir `0` |
| `weight` | number | Poids de tirage |
| `text` | string | Texte affiché dans le journal de combat |

### Le poids de tirage

Chaque tour, l'ennemi tire une attaque au hasard, pondérée par `weight`.

Exemple avec trois attaques de poids 5, 2 et 1 — total 8 :

| Attaque | Poids | Fréquence |
|---|---|---|
| Coup de hache | 5 | 62 % |
| Balayage | 2 | 25 % |
| Repositionnement | 1 | 12 % |

L'avantage sur des pourcentages écrits en dur : ajouter une quatrième attaque rééquilibre l'ensemble automatiquement, sans avoir à retoucher les autres valeurs.

### Les attaques sans dégâts

Une attaque peut valoir `damage: 0` — l'ennemi se repositionne, recule, observe. Ça donne du rythme et de la personnalité au combat.

Son `text` doit être écrit en conséquence : jamais *« le squelette vous frappe pour 0 dégât »*, mais *« le squelette recule d'un pas et vous jauge »*.

---

## Le calcul des dégâts

### Réduction par l'armure

```
réduction    = armure / (armure + 50)
dégâts subis = max(1, round(dégâts bruts × (1 − réduction)))
```

Courbe à rendement décroissant : chaque point d'armure apporte toujours quelque chose, mais de moins en moins. On n'atteint jamais l'invulnérabilité, donc aucun plafond n'est nécessaire.

| Armure | Réduction | 10 dégâts deviennent |
|---|---|---|
| 0 | 0 % | 10 |
| 10 | 17 % | 8 |
| 25 | 33 % | 7 |
| 50 | 50 % | 5 |
| 100 | 67 % | 3 |
| 200 | 80 % | 2 |

**Le `50` est le curseur d'équilibrage** : c'est la valeur d'armure à laquelle on atteint exactement 50 % de réduction. L'abaisser rend l'armure plus puissante, l'augmenter l'affaiblit. Il vit dans `data/`.

### Règles d'arrondi

- **L'arrondi ne se fait qu'à la toute fin.** Arrondir à chaque étape intermédiaire accumule les erreurs et rend l'équilibrage imprévisible.
- `Math.round`, sans biais pour l'attaquant ni pour le défenseur.
- **Plancher à 1 dégât.** Un coup qui touche fait toujours mal.

### Conservation des valeurs brutes

Les dégâts bruts sont conservés pour le journal de combat :

> *Le squelette frappe pour 8 — votre armure en absorbe 3 — vous encaissez 5.*

En textuel, le joueur ne voit pas de barre de vie descendre. Sans cette explication, il ne comprend pas pourquoi il prend 5 et non 8.

### Dégâts du joueur

```
dégâts bruts = Force du joueur + Force de l'arme
```

Un coefficient par action viendra s'appliquer par-dessus (l'attaque lourde frappe plus fort que la légère). Sa valeur sera fixée à l'équilibrage.

---

## Les constantes de combat

Toutes dans `data/`, aucune en dur dans le moteur.

| Constante | Valeur | Note |
|---|---|---|
| Paramètre d'armure | 50 | Dénominateur de la courbe de réduction |
| Plancher de dégâts | 1 | |
| Endurance max | à définir | |
| Régénération d'endurance par tour | à définir | |
| Coût — attaque légère | 1 | |
| Coût — attaque lourde | 3 | |
| Coût — esquive | 2 | |
| Coût — soin d'urgence | 1 | |
| Coût — fuite | 2 | |
| Bonus d'esquive réussie | +25 % | Un tour, non cumulable |
| Coefficient de dégâts — légère | à définir | |
| Coefficient de dégâts — lourde | à définir | |

---

## Fichiers concernés en v0.1

| Fichier | Contenu |
|---|---|
| `data/enemies.js` | Les trois ennemis et leurs attaques |
| `data/combat.js` | Les constantes ci-dessus |
| `data/items.js` | L'arme de départ, minimale |
| `engine/combatEngine.js` | Fonctions pures, aucun import React |
| `store/useCombatStore.js` | État du combat, appelle le moteur |

---

## Points ouverts

### Le plafond des taux de réussite

Les taux de réussite montent avec les caractéristiques du joueur. Sans garde-fou, un personnage de haut niveau atteint 100 % de réussite partout, et l'attaque lourde cesse d'être un risque — tout le système de décision s'effondre.

Deux solutions envisagées :

- **Le jet opposé** — la réussite compare la statistique du joueur à une défense de l'ennemi. Le taux reste dans une fourchette intéressante à tous les niveaux, mais demande une statistique défensive supplémentaire sur l'ennemi.
- **Le plafond dur** — le taux monte avec la caractéristique sans jamais dépasser une limite (75 % pour la lourde, par exemple). Plus simple, moins élégant.

Invisible en v0.1 (un seul niveau, trois ennemis), mais à trancher avant d'écrire beaucoup de données d'ennemis.

### Autres

- Formules exactes de conversion caractéristique → pourcentage de réussite
- Coefficients de dégâts par action
- Variance sur les dégâts (fourchette plutôt que valeur fixe)
- Structure de l'item complet — emplacements, statistiques, valeur marchande
- Table de butin et or accordé par l'ennemi (v0.2)
- Zones d'apparition des ennemis (v0.2)
- Structure du nœud d'exploration (v0.2)
- Structure de la sauvegarde et chaîne de migrations (v0.2)
