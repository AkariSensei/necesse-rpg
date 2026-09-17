# TODO

Tout ce qui n'est pas dans le palier courant atterrit ici.
Ne jamais corriger en cours de séance : noter et continuer.

## Équilibrage du combat (relevé sur 5000 simulations)
- [ ] L'attaque légère domine : 99,6 % de victoire en la spammant.
  Pistes : coefficient de la lourde à 2.5/3, ou taux de base de la légère à 0.70
- [ ] L'esquive ne sert à rien : « esquive puis lourde » fait 84,8 % contre 84,2 %
  pour la lourde seule. Taux de base à 0.30 pour limiter les séries.
  La télégraphie de la 0.3 devrait la sauver.
- [ ] Les potions d'urgence cassent la tension : +44 points de victoire avec deux
  potions. Pistes : soin à 6 au lieu de 10, coût à 3 d'endurance, une seule au départ.
- [ ] Plafond des taux de réussite : sans garde-fou, un haut niveau atteint 100 %
  partout et la lourde cesse d'être un risque. Jet opposé ou plafond dur.

## Technique
- [ ] Installer TypeScript (registry npm à tester)
- [ ] Vérifier http.sslVerify avec le service informatique
- [ ] npm install --package-lock-only pour resynchroniser le lock

## Design en attente
- [ ] Contacter les développeurs de Necesse pour l'autorisation
- [ ] Caractéristique gouvernant l'efficacité de la fouille
- [ ] Classes de personnage
- [ ] Seconde option défensive si l'esquive reste faible