# ADR 0001 — architecture local-first

- Statut : accepté
- Date : 2026-08-09

## Contexte

Bobinarium doit rester rapide et entièrement utilisable lorsque le réseau est
absent ou instable. Une même bibliothèque peut être partagée entre plusieurs
utilisateurs et consultée depuis plusieurs appareils.

Ajouter ultérieurement une couche de cache à une application dépendante du
serveur ne répondrait pas à cette exigence. La persistance locale et la
synchronisation influencent le modèle de données, les identifiants, les
permissions, les suppressions et les migrations.

## Décision

La base locale est la source opérationnelle utilisée par l'interface. Lire ou
modifier une collection ne doit pas nécessiter un aller-retour réseau.

Chaque modification est d'abord enregistrée localement, puis synchronisée en
arrière-plan. Le serveur conserve l'état partagé, contrôle les autorisations et
diffuse les changements aux autres appareils. Le mécanisme exact de convergence
dépendra du moteur de synchronisation retenu.

La bibliothèque est l'unité principale de partage, d'autorisation et de
synchronisation. Toutes les données textuelles nécessaires pour afficher son
contenu sont disponibles localement. Les images sont mises en cache séparément.

## Garantie hors ligne

Après un premier chargement réussi de l'application et d'une bibliothèque, un
utilisateur peut sans réseau :

- rouvrir l'application ;
- consulter, rechercher, filtrer et trier la bibliothèque ;
- ajouter manuellement une œuvre, une saison, une édition ou un coffret ;
- ajouter, modifier et supprimer un exemplaire ;
- consulter les images déjà mises en cache ;
- voir si des changements attendent une synchronisation.

Les changements survivent à la fermeture et au redémarrage de l'application.
La synchronisation reprend automatiquement lorsque le réseau revient.

## Opérations nécessitant le réseau

- première connexion sur un nouvel appareil ;
- téléchargement initial d'une bibliothèque ;
- recherche dans un catalogue externe ;
- téléchargement d'une image absente du cache ;
- invitation, changement de rôle ou révocation d'un membre ;
- réception des changements effectués sur d'autres appareils ;
- récupération d'un compte.

La saisie manuelle reste disponible lorsque la recherche externe ne l'est pas.

## Principes de synchronisation

- Les identifiants métier sont des UUID v7 générés localement. Ils restent
  globalement uniques sans coordination avec le serveur et améliorent la
  localité des index lors de leur insertion.
- L'horodatage encodé dans un UUID v7 ne remplace pas une date métier et ne
  participe pas seul à la résolution des conflits, car l'horloge d'un appareil
  peut être incorrecte.
- Les opérations envoyées au serveur sont idempotentes.
- Une suppression est synchronisée explicitement afin qu'un ancien client ne
  puisse pas recréer involontairement la donnée.
- Les données manuelles ont priorité sur les enrichissements externes.
- Les doublons ne sont jamais fusionnés automatiquement.
- Le moteur doit supporter des clients restés hors ligne pendant une longue
  période et des migrations de schéma entre versions.

## Politique initiale de conflits

- Deux modifications portant sur des champs différents sont conservées.
- Pour deux modifications concurrentes du même champ scalaire, la dernière
  modification ordonnée par le système gagne et l'historique permet d'examiner
  ou restaurer l'ancienne valeur.
- Deux ajouts concurrents au contenu d'un coffret sont conservés.
- Une suppression gagne contre une modification concurrente, mais reste
  récupérable pendant une durée à déterminer.
- Les permissions sont validées par le serveur. Une modification produite hors
  ligne peut être refusée si les droits de son auteur ont été révoqués entre
  temps ; elle ne doit pas disparaître sans explication pour l'utilisateur.

## Répartition des responsabilités

- **React** gère le rendu et l'état visuel temporaire.
- **Effect** porte le domaine, les cas d'usage, les erreurs et les services.
- **Le moteur local-first** fournit la base locale réactive et la
  synchronisation.
- **Le service worker** conserve le code et les ressources nécessaires au
  démarrage hors ligne de l'application web.
- **Le backend Effect** gère notamment l'authentification, les invitations, les
  autorisations de synchronisation et les fournisseurs de métadonnées.

## Conséquences

Le frontend ne sera pas construit autour d'une API CRUD distante. Ses cas
d'usage écriront dans une abstraction locale, provisoirement appelée
`LibraryStore`.

Le choix entre LiveStore, PowerSync ou une autre solution sera pris après un
prototype validant au minimum : persistance, deux clients concurrents,
suppression hors ligne, plusieurs bibliothèques, autorisation et migration de
schéma.

Une révocation empêche les synchronisations futures, mais ne peut pas garantir
l'effacement d'octets déjà copiés par un membre sur un appareil qu'il contrôle.
