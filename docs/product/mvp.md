# Bobinarium — périmètre fonctionnel du MVP

## Vision

Bobinarium permet à une personne ou à un groupe de répertorier les films et
séries qu'il possède, de retrouver les éditions physiques correspondantes et de
partager une bibliothèque privée avec d'autres personnes.

Le MVP est un inventaire de possessions. Le suivi des visionnages, les notes,
les recommandations et les fonctions sociales ne font pas partie de ce premier
périmètre.

## Bibliothèques et rôles

Un utilisateur peut appartenir à plusieurs bibliothèques. Une bibliothèque est
privée par défaut et possède toujours au moins un propriétaire.

- **Propriétaire** : gère la bibliothèque, ses membres et leurs rôles. Il peut
  modifier son contenu, transférer sa propriété et la supprimer.
- **Contributeur** : ajoute, modifie et supprime toutes les entrées de la
  bibliothèque.
- **Lecteur** : consulte uniquement la bibliothèque.

Le rôle est associé à l'adhésion d'un utilisateur à une bibliothèque. Un même
utilisateur peut donc avoir un rôle différent dans chaque bibliothèque.

## Modèle métier

- Une **œuvre** représente un film ou une série.
- Une **saison** appartient à une série.
- Une **édition** représente un produit physique précis : DVD, Blu-ray, Blu-ray
  UHD, VHS ou autre support.
- Le **contenu d'une édition** relie cette édition à une ou plusieurs œuvres ou
  saisons. Un coffret peut donc contenir plusieurs films ou plusieurs saisons.
- Un **exemplaire possédé** représente une copie physique de cette édition dans
  une bibliothèque.

Deux exemplaires physiques distincts sont enregistrés séparément. Ils ne sont
pas représentés par un compteur partagé, ce qui facilite leur évolution et leur
synchronisation.

## Parcours principal

Le parcours prioritaire permet de :

1. ouvrir une bibliothèque ;
2. ajouter manuellement une œuvre et son édition ;
3. compléter le contenu d'un coffret ;
4. consulter et rechercher la collection ;
5. modifier ou supprimer un exemplaire.

La saisie manuelle doit toujours rester disponible, même lorsqu'un fournisseur
de métadonnées externe est configuré. Pour un ajout rapide, seuls le titre, le
type d'œuvre et le format physique sont nécessaires. Une entrée incomplète peut
être enrichie plus tard.

Une donnée saisie manuellement ne doit jamais être remplacée silencieusement
par une donnée externe. Les doublons produisent un avertissement mais ne
bloquent pas l'ajout.

## Inclus dans le MVP

- authentification ;
- création de plusieurs bibliothèques ;
- invitations et rôles ;
- films, séries, saisons, éditions physiques et coffrets ;
- ajout manuel fluide ;
- enrichissement facultatif depuis un catalogue externe ;
- recherche d'une œuvre, y compris lorsqu'elle se trouve dans un coffret ;
- filtres par type, année et format ;
- fonctionnement local-first décrit dans la décision d'architecture 0001 ;
- interface responsive mobile-first utilisable sur ordinateur.

## Hors MVP

- supports numériques ;
- emplacement physique des exemplaires ;
- prêts ;
- suivi des visionnages ;
- notes et critiques ;
- recommandations ;
- scan de codes-barres ;
- réseau social public ;
- livres et autres catégories ;
- chiffrement de bout en bout ;
- application React Native.

Ces éléments restent des évolutions possibles et le modèle ne doit pas les
rendre inutilement difficiles à introduire.
