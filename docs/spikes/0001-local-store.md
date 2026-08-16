# Spike 0001 — stockage local et synchronisation

## Objectif

Choisir le moteur de stockage local-first à partir d'un parcours représentatif
de Bobinarium, sans construire deux versions complètes de l'application.

LiveStore sera évalué en premier en raison de son intégration avec Effect,
React, Vite et Expo. PowerSync sera évalué sur le même parcours si LiveStore
échoue sur un critère bloquant ou demande de construire trop d'infrastructure
non métier.

Ce spike n'a pas vocation à produire l'interface définitive.

## Tranche verticale

Depuis l'interface React, un utilisateur local doit pouvoir :

1. créer une bibliothèque ;
2. ajouter manuellement le film « Alien » ;
3. créer une édition Blu-ray ;
4. ajouter un exemplaire de cette édition à la bibliothèque ;
5. retrouver le film dans une recherche locale ;
6. modifier le nom de l'édition ;
7. supprimer puis restaurer l'exemplaire.

Toutes ces opérations doivent réussir avec les outils réseau du navigateur
placés en mode hors ligne.

## Critères bloquants

- Les données survivent à un rechargement et à un redémarrage du navigateur.
- La lecture et l'écriture n'attendent jamais le réseau.
- Une requête réactive met l'interface à jour après une écriture locale.
- Les écritures créant une œuvre, une édition, son contenu et l'exemplaire sont
  atomiques.
- Les identifiants UUID v7 sont générés sur le client avec le service `Crypto`
  d'Effect.
- Une migration additive du schéma conserve les données existantes.
- Le moteur fonctionne dans les navigateurs mobiles ciblés par la PWA.
- Une future implémentation Expo ou React Native est officiellement supportée.
- Il est possible d'isoler les données et le flux de synchronisation par
  bibliothèque.
- Le serveur peut authentifier un utilisateur et contrôler son accès à une
  bibliothèque avant de lui envoyer ou accepter des données.

## Scénarios de synchronisation

Le prototype utilise deux profils de navigateur représentant deux appareils.

1. Le client A crée une entrée hors ligne puis se reconnecte : l'entrée apparaît
   sur le client B.
2. A et B modifient hors ligne deux champs différents : les deux changements
   sont conservés.
3. A et B modifient le même champ : le résultat est déterministe et observable.
4. A supprime une entrée pendant que B la modifie : la suppression gagne et
   l'entrée reste restaurable.
5. Un contributeur produit une modification hors ligne, puis perd son rôle
   avant de se reconnecter : le serveur refuse la modification sans la faire
   disparaître silencieusement du client.

## Éléments à mesurer

- quantité de code spécifique au moteur dans le domaine et dans React ;
- taille ajoutée au bundle web ;
- comportement sur Chrome Android et Safari iOS ;
- outils de diagnostic disponibles ;
- complexité des migrations et de la récupération après erreur ;
- capacité d'exporter une bibliothèque dans un format documenté ;
- maturité, licence et possibilité d'auto-héberger le serveur.

## Résultat attendu

Le spike se termine par une décision d'architecture acceptant un moteur ou
expliquant pourquoi aucun des candidats évalués ne convient. Le code jetable du
prototype ne sera pas intégré au produit tant que cette décision n'est pas
prise.
