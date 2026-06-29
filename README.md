# Pointage Horaires — Guide d'installation (sans coder)

Application pour noter vos horaires de travail quotidiens, calculer le temps
travaillé, et envoyer un récapitulatif mensuel en PDF à votre employeur.

Vous allez faire 3 choses, dans l'ordre : **1) Firebase** (stockage de vos
données), **2) GitHub** (hébergement de l'appli), **3) Installer l'appli sur
votre téléphone**.

---

## 1. Créer la base de données (Firebase) — gratuit

1. Allez sur https://console.firebase.google.com et connectez-vous avec un
   compte Google.
2. Cliquez **« Ajouter un projet »**. Donnez-lui un nom, ex. `pointage-jean`.
   Désactivez Google Analytics (pas nécessaire). Cliquez **Créer**.
3. Dans le menu de gauche, cliquez **Build > Firestore Database**, puis
   **Créer une base de données**. Choisissez une région proche de vous
   (ex. `eur3 (europe-west)`), puis démarrez en **mode production**.
4. Allez dans l'onglet **Règles** de Firestore et collez ceci, puis
   **Publier** :

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

   (Cela autorise toute personne *authentifiée anonymement par l'appli* à
   lire/écrire — suffisant pour un usage personnel/familial simple.)

5. Dans le menu de gauche, cliquez **Build > Authentication**, puis
   **Get started**. Dans l'onglet **Sign-in method**, activez
   **Anonymous** (Anonyme).

6. Toujours dans Firebase, cliquez sur la roue dentée en haut à gauche
   (⚙️) > **Paramètres du projet**. Dans la section **Vos applications**,
   cliquez sur l'icône **</> (Web)**. Donnez un nom (ex. `pointage-web`),
   puis **Enregistrer l'application**. Firebase vous affiche un bloc de
   code `firebaseConfig = { ... }` : **copiez ces valeurs**, vous en aurez
   besoin à l'étape suivante.

---

## 2. Mettre votre code en ligne (GitHub Pages) — gratuit

1. Créez un compte sur https://github.com si vous n'en avez pas.
2. Cliquez **New repository**. Nom : `pointage-horaires`. Cochez **Public**.
   Cliquez **Create repository**.
3. Cliquez **Add file > Upload files**, puis déposez les 3 fichiers fournis :
   `index.html`, `manifest.json`, `sw.js`.
4. Ouvrez `index.html` dans l'éditeur GitHub (cliquez sur le fichier, puis le
   crayon ✏️ « Edit »). Recherchez ce bloc (vers la moitié du fichier) :

   ```js
   const firebaseConfig = {
     apiKey: "VOTRE_API_KEY",
     authDomain: "VOTRE_PROJET.firebaseapp.com",
     projectId: "VOTRE_PROJET",
     storageBucket: "VOTRE_PROJET.firebasestorage.app",
     messagingSenderId: "VOTRE_SENDER_ID",
     appId: "VOTRE_APP_ID"
   };
   ```

   Remplacez chaque valeur par celles copiées à l'étape Firebase 6.
   Cliquez **Commit changes**.
5. Allez dans **Settings > Pages** (menu de gauche du dépôt). Dans
   **Branch**, choisissez `main` et `/ (root)`, cliquez **Save**.
6. Attendez 1-2 minutes, puis rafraîchissez cette page : un lien apparaît,
   du type `https://votre-nom.github.io/pointage-horaires/`. C'est l'adresse
   de votre application !

---

## 3. Installer l'appli sur votre téléphone

1. Ouvrez le lien ci-dessus dans le navigateur de votre téléphone
   (Chrome ou Safari).
2. **Android (Chrome)** : menu ⋮ en haut à droite > **Ajouter à l'écran
   d'accueil**.
   **iPhone (Safari)** : bouton de partage 📤 > **Sur l'écran d'accueil**.
3. Une icône ⏱️ « Pointage » apparaît sur votre écran d'accueil, comme une
   vraie application.

Au premier lancement, l'appli vous demande votre nom et le nom de
l'exploitation : c'est normal, c'est la mise en route (« onboarding »).

---

## Comment ça marche

- **Chaque jour** : onglet « Pointage », notez heure d'arrivée le matin,
  heure de fin de matinée, heure de début d'après-midi, heure de fin de
  journée. Si vous ne prenez pas de pause, mettez la même heure pour
  « fin de matinée » et « début après-midi » (ex. 12h00 / 12h00).
- Le temps de pause et le temps travaillé se calculent automatiquement.
- Toute journée peut être **modifiée** ou **supprimée** depuis
  l'historique (icônes crayon / corbeille).
- **Onglet « Récap mensuel »** : choisissez le mois, vérifiez le tableau,
  puis :
  - **Télécharger** : enregistre le PDF sur votre téléphone.
  - **Partager / Email** : ouvre le menu de partage de votre téléphone
    (Mail, SMS, WhatsApp...) avec le PDF déjà joint, si votre téléphone le
    permet. Sinon, le PDF est téléchargé et un brouillon d'email s'ouvre :
    il suffit d'y joindre le fichier téléchargé.
- **Onglet « Config »** : votre nom, votre ID salarié, vos exploitations.
  Le bouton **« Créer une entreprise »** permet d'ajouter une autre
  exploitation si vous changez ou cumulez des employeurs ; vous choisissez
  ensuite l'exploitation active.

## Vos identifiants

- Votre **ID salarié** est visible dans Config. Il est créé une seule fois
  et conservé sur votre téléphone (et dans la base en ligne).
- Chaque **exploitation** a aussi son propre ID, visible dans Config.
- Si vous changez de téléphone, vos données restent dans Firebase, mais
  vous devrez ressaisir manuellement votre ID salarié pour les retrouver
  (fonctionnalité possible à ajouter plus tard si besoin).

## Besoin d'aide ?

Si quelque chose ne fonctionne pas (page blanche, erreur de connexion),
vérifiez en priorité :
1. Que les valeurs `firebaseConfig` sont bien copiées sans erreur.
2. Que l'authentification **Anonyme** est bien activée dans Firebase.
3. Que les règles Firestore ont bien été **publiées**.
