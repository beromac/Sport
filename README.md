# FitSanté

Application Android (installable depuis Chrome) pour **perdre du poids, s'assouplir et se muscler en douceur**, pensée pour une **sciatique** et un **ménisque fissuré**.

- 19 exercices avec illustrations animées, étapes détaillées, version plus facile, signaux d'arrêt et lien vidéo
- 4 séances guidées (douce, A, B, C) avec chrono, temps de repos, écran qui reste allumé et bips (fin du chrono, changement de côté)
- Check-in de douleur quotidien : l'application propose la séance douce ou le repos si la douleur est trop forte
- Suivi : poids, tour de ventre (graphique, variation depuis la mesure précédente et depuis le début), douleurs, historique des séances
- Activités libres hors séances (exercice choisi dans la liste, séries, répétitions, durée, charge), choix marche / vélo d'extérieur / vélo d'intérieur / piscine
- Résultats réellement faits par série (par exemple 1 × 15 s au lieu de 2 × 20 s prévues) et onglet Progrès avec courbes
- Échauffements illustrés au début de chaque séance (marche sur place, cercles d'épaules, bascule du bassin…), adaptés à chaque appli
- Mon matériel : cochez ce que vous avez (tapis, haltères, élastique, vélo, piscine…) ou ajoutez le vôtre ; les exercices passent automatiquement en version « sans matériel » si besoin, avec choix manuel avec/sans
- Suivi du corps : poids, IMC, taux de graisse corporelle, masse musculaire, indice de graisse viscérale, masse osseuse (saisie facultative sauf le poids, courbes par mesure, repères de lecture, variation depuis la mesure précédente)
- Équilibre & cheville (après rupture du tendon d'Achille) : 11 exercices et 2 séances (niveau 1 et niveau 2), à commencer avec l'accord du chirurgien ou du kiné
- Séance D : tendon d'Achille et genoux (extension du genou, chaise au mur, montée de marche, montées lentes chargées, descentes sur une marche)
- Programme canicross de 12 semaines avec un chien (marche rapide, puis trot très doux si le médecin ou le kiné l'autorise), chrono d'intervalles et conseils pour le chien
- Au travail : 2 séances discrètes (5 et 10 min, assis, sans bruit ni matériel) pour le dos et la sangle abdominale
- Fonctionne hors-ligne, données stockées sur le téléphone (export/import JSON)

> Cette application ne remplace pas un avis médical. Montrez les exercices à votre médecin ou kiné avant de commencer.

## Mettre l'application en ligne avec GitHub (sans rien installer)

1. Sur [github.com](https://github.com), créez un compte puis **New repository** (nom : `fitsante`, public).
2. Cliquez **uploading an existing file**, glissez-y **tout le contenu de ce dossier** (le dossier `docs` avec ses fichiers, et `README.md`), puis **Commit changes**.
3. Allez dans **Settings → Pages**. Sous *Build and deployment* : Source **Deploy from a branch**, Branch **main**, dossier **/docs**, puis **Save**.
4. Attendez 1 à 2 minutes. L'adresse apparaît en haut de la page : `https://VOTRE-NOM.github.io/fitsante/`.
5. Sur votre téléphone Android, ouvrez cette adresse dans **Chrome**, puis menu ⋮ → **Installer l'application** (ou **Ajouter à l'écran d'accueil**).

## Modifier l'application

- Exercices et séances : `docs/data.js`
- Apparence : `docs/style.css`
- Logique : `docs/app.js`
- Après une modification, changez `VERSION` dans `docs/sw.js` (ex. `fitsante-v2`) pour que les téléphones se mettent à jour.

## Transformer en fichier APK (facultatif)

Une fois l'adresse GitHub Pages en ligne, le site [pwabuilder.com](https://www.pwabuilder.com) permet de générer un APK Android à partir de cette adresse.

## Mettre à jour l'application (nouvelle version)

1. Ouvrez votre dépôt sur github.com, puis le dossier `docs`.
2. **Add file → Upload files**, glissez les fichiers modifiés (`app.js`, `data.js`, `style.css`, `sw.js`) et **Commit changes**.
3. Attendez 1 à 2 minutes, puis rouvrez l'application. Dans l'onglet Profil, le bas de page affiche le numéro de version.
