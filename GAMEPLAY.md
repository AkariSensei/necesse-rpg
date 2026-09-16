# Necesse RPG — Document de game design

> Projet de fan, non affilié aux développeurs de Necesse.
> Document de travail — toute valeur chiffrée est provisoire et destinée à l'équilibrage.

---

## 1. Vision

Revivre la progression de Necesse — paliers d'équipement, boss, exploration — sous forme de **décisions** plutôt que de réflexes.

**Ce qu'on garde :** la structure de progression, l'univers, les créatures, la sensation de préparation avant un affrontement.

**Ce qu'on abandonne :** le combat action, le placement de blocs, l'exploration libre de la carte, le multijoueur.

**Règles de conception :**

1. Chaque écran pose une question au joueur. Pas d'écran qui se contente d'afficher.
2. Le tour par tour est intégral. Aucun timer sur le combat, l'exploration ou le loot.
3. Un identifiant de donnée n'est jamais renommé ni réutilisé.
4. Solo définitif, tout tourne dans le navigateur.

---

## 2. Ouverture

Le joueur arrive en ville en tant que voyageur. Il entre dans une taverne, lieu de rassemblement, pour se renseigner sur ce monde.

Il y rencontre un vieil homme. La discussion sert trois objectifs :

- **Récupérer le pseudo du joueur.**
- **Planter le boss final** — une menace située à un endroit précis de la carte, évoquée sans être détaillée.
- **Poser les règles implicites** via deux ou trois conseils du PNJ :
  - l'or est rare et servira vite,
  - on ne revient jamais sur ses pas,
  - la nuit est dangereuse.

La conversation doit amener naturellement le joueur à demander s'il existe des aventuriers dans ce monde. Le vieil homme confirme et l'oriente vers **la croisée des chemins** pour débuter.

Fin de l'ouverture, début de la boucle de jeu.

> La ville est un **prologue**. Le joueur n'y revient pas.

---

## 3. Exploration

### Principe

Avancée **nodale** : le joueur progresse de nœud en nœud, sans retour en arrière possible. Ce qu'il ne fouille pas est perdu définitivement.

Deux natures de nœuds coexistent :

- **Générés** — chemins, clairières, ruines, rencontres. Ils assurent le renouvellement et le mystère.
- **Fixes** — donjons, boss, marchands ambulants, lieux écrits à la main. Ils marquent la progression et constituent ce que la communauté peut se raconter.

### Les deux formes de nœud

Un nœud pose soit une **question d'action**, soit une **question de direction**. Jamais les deux en même temps, pour éviter la monotonie.

**Question d'action** — le joueur décide de son investissement sur place :

| Action | Effet |
|---|---|
| Avancer | Passe au nœud suivant |
| Fouiller la zone | Butin possible, risque de rencontre |
| Poser son campement | Conditionnel au cycle jour/nuit |

**Question de direction** — le joueur choisit sa route :

> *Le chemin se sépare en deux. Celui de droite semble dégagé ; celui de gauche s'enfonce dans les fourrés.*
>
> → Aller à droite · Aller à gauche

Les branches doivent avoir une **couleur différente**, indiquée au joueur. Deux chemins équivalents ne constituent pas un choix.

---

## 4. Le temps

### Cycle

La journée se compose de **12 crans**, la nuit également. Un cran est l'unité de temps du jeu.

### Coût des actions

Toutes les actions ne coûtent pas de temps.

| Action | Coût |
|---|---|
| Avancer | Gratuit (sauf obstacle difficile) |
| Fouiller | 2 crans |
| Engager un combat | Variable, selon le niveau de l'ennemi et celui du joueur |
| Poser le campement | Passe la nuit |

Le coût variable du combat est un levier d'équilibrage : un ennemi coûteux en temps est dangereux même quand il est facile à battre.

### Jour et nuit

Le **jour** est la période d'avancée normale.

La **nuit** est plus dangereuse : les créatures sont présentes sur la quasi-totalité des nœuds, mais le butin y est plus généreux. C'est un pari assumé.

L'action **poser son campement** devient disponible dès les **deux derniers crans du jour** et reste accessible toute la nuit.

---

## 5. Points de vie

Les PV sont le cœur de la difficulté. Ils fonctionnent comme dans la vie réelle : on ne récupère pas en marchant.

- Ils ne remontent **jamais** naturellement.
- Ils remontent au **campement**, pendant une phase de repos.
- Une **potion rare**, coûteuse, garantit un soin — c'est la seule qui fonctionne en plein combat.

> Aucune potion ordinaire n'est utilisable en combat. C'est cette absence de filet qui donne son poids à chaque engagement.

---

## 6. Le campement

Base mobile du joueur. Il permet de :

- se reposer et récupérer des PV,
- passer la nuit en sécurité,
- trier son inventaire (impossible ailleurs).

**Évolutions prévues :** forge, création de potions, améliorations du campement lui-même.

---

## 7. L'or

Monnaie unique du jeu. **Rare et précieuse**, puisque la ville n'est plus accessible.

Elle se dépense uniquement auprès des **marchands ambulants**, qui apparaissent comme un type de nœud à part entière. Leur fréquence est un paramètre d'équilibrage sensible : trop rares, le joueur se retrouve sans potions et décroche.

---

## 8. La mort

Le joueur revient à la vie **sur place**.

| Conservé | Perdu |
|---|---|
| Équipement porté (armes, habits) | Contenu de l'inventaire |
| Niveau et XP | Or |

**Évolution prévue — les blessures.** La mort laissera une trace durable jusqu'à ce qu'elle soit soignée : malus sur les taux de réussite, réduction des PV max. Les blessures s'accumulent, ce qui crée une pression progressive plutôt qu'un coup sec.

---

## 9. Fin de partie

Le **boss final** est évoqué dès le prologue et intégré au lore. Il fait l'objet d'une quête dédiée, déclenchée lorsque le joueur remplit les conditions requises.

Une fois le boss vaincu : **crédits**, puis le monde reste ouvert. Le joueur peut continuer à explorer.

---

## 10. Combat

### Cadre

- Tour par tour.
- Engager un combat **coûte des crans**. Une fois dedans, le temps ne s'écoule plus.
- L'ordre du tour est déterminé par l'**Initiative**. En cas d'égalité, le joueur commence.
- Un seul ennemi à la fois dans un premier temps.

### Les cinq actions

| Action | Endurance | Réussite | Échec |
|---|---|---|---|
| **Attaque légère** | −1 | Initiative | Rien |
| **Attaque lourde** | −3 | Force | Contre-attaque encaissée |
| **Esquive** | −2 | Initiative | Dégâts encaissés |
| **Soin d'urgence** | −1 | Garantie (potion rare) | — |
| **Fuite** | −2 | Initiative | Dégâts encaissés |

### Détail de l'esquive

- Coût : 2 d'endurance, quel que soit le résultat.
- Régénération d'endurance du tour : normale.
- **Réussie** : aucun dégât subi, et le prochain coup du joueur gagne **+25 % de réussite**.
- **Ratée** : dégâts encaissés, endurance perdue, pas de bonus.

Le bonus dure **un seul tour** et ne se cumule pas.

### Évolution prévue — la télégraphie

À terme, l'ennemi annoncera son action avant de la jouer (*« le squelette lève sa hache »*). L'esquive prend alors tout son sens, et chaque ennemi devient reconnaissable à son comportement.

---

## 11. Le personnage

### Identité

Nom (saisi au prologue), niveau, XP.

### Caractéristiques

Valeurs **stables**. Les valeurs stockées sont celles de base ; les valeurs effectives se recalculent à la volée en ajoutant l'équipement porté.

| Caractéristique | Rôle | Progression |
|---|---|---|
| **Force** | Dégâts infligés, réussite de l'attaque lourde | +1 par niveau |
| **Initiative** | Ordre du tour, réussite de la légère, de l'esquive et de la fuite | +1 par niveau |
| **Armure** | Réduction des dégâts subis | Équipement uniquement |

### Jauges de combat

| Jauge | Comportement |
|---|---|
| **PV** | Max = `pvBase + niveau`. Ne remontent qu'au campement ou à la potion rare |
| **Endurance** | Se régénère chaque tour |

### Possessions

- Équipement par emplacement *(à détailler)*
- Inventaire, illimité pour l'instant
- Or

### État

- Position sur la grille
- Cran courant, jour courant
- Flags : quêtes, boss vaincus, jalons franchis

---

## 12. Points ouverts

- Formules exactes de conversion caractéristique → pourcentage de réussite
- Emplacements d'équipement
- Classes de personnage
- Craft et forge
- Biomes et variation de difficulté
- Carte du monde remise au joueur
- Caractéristique supplémentaire pour l'efficacité de la fouille
- Mode hardcore
