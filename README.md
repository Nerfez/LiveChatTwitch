# LiveChatTwitch

Le but de ce projet est de reproduire le LiveChat qu'utilisent la CACABOX (streamers HugoDélire,Grimkujow,Potatoz,Terracid,etc..).
Lorsque l'on envoi une image/vidéo dans un channel discord, elle s'affiche sur leur live.

Pour faire fonctionner le projet il vous faudra des connaissances en :

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)]()
[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)]()
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)]()
[![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)]()
[![Twitch](https://img.shields.io/badge/Twitch-9347FF?style=for-the-badge&logo=twitch&logoColor=white)]()


## 📌 Présentation

### 🔧 Configuration

Pour faire fonctionner LiveChat, il faut d'abord télécharger le [zip](https://github.com/Nerfez/LiveChatTwitch/archive/refs/heads/main.zip) du projet.
Pensez à extraire le fichier zip puis dirigez vous dans le dossier Discord où figure le fichier ```index.js``` depuis votre terminal et entrez la commande suivante :

```nodejs
npm i
```

Effectuez tous les changements nécessaires (token, mot de passe, nom de base de donnée, identifiant de channel etc...). Si vous n'avez pas idée de ce que représente un token ou
si vous n'êtes pas à l'aise avec la création d'un bot discord, je vous renvoie à cette vidéo qui explique parfaitement la création d'un bot discord : 
https://www.youtube.com/watch?v=IErYPx-meD4&

Puis lancer le fichier ```index.js``` depuis visual studio code. (Run -> Start Debugging) Si vous voulez plus de libertés et lancer le fichier depuis cmd au lieu de passer à chaque fois par visual studio, puis entrez la commande `node .`. Si vous ajoutez dans le fichier `package.json` dans les scripts :

```nodejs
"start": "node ."
```

Vous pourrez alors lancer votre fichier avec la commande ```npm run start```

Maintenant, il vous faut hébergez le site avec les pages ```.php et .css```, à titre personnel j'utilise alwaysdata qui permet d'héberger gratuitement (nécéssite de se créer un compte, vous aurez des mails de rappel de la part de alwaysdata indiquant si votre compte arrive à expiration, auquel cas il suffira de se connecter pour prolonger la durée de mise en service de 120j).

Depuis AlwaysData, vous avez la possibilité de créer votre Base de donnée MySQL, ajouter une nouvelle base avec un utilisateur disposant de tous les droits, créez 2 tables soit :

| url     | ImageTexte | ImageTime | Width | Height | Audio |
|-----------------|--------|---------|---------|---------|--|
|                 |        |         |          |         |  |

pour la table `Image`

| VideoURL     | VideoTexte | VideoTime | Width | Height |
|-----------------|--------|---------|---------|---------|
|                 |        |         |         |         |

pour la table `Video`

Si vous le souhaitez, vous pouvez importer directement le fichier `livechat_test.sql` à votre base, celà permettra d'avoir les 2 tables identiques avec le code. (mais naturellement pas le même host, dbName, user, pass)

Si tout cela est fait et vous avez bien remplacer chaque identifiants/mdp etc correspondant à vos propre identifants alors ouvrez Streamlabs et ajoutez 2 nouvelles sources navigateur, entrez pour chacune
d'entre elle l'url correspondant ```https://*****index.php``` pour l'image et pour la vidéo ```https://*****/Video/index.php``` et cochez "raffraichir le navigateur lorsque la source est active".

### 🔧 Commandes

- Les commandes à exécuter sur discord pour une image :

```discord
!image {Nombre} {text}
```
Par exemple : ```!image 13 voici mon texte``` ou encore ```!image 6```


- Les commandes à exécuter sur discord pour une vidéo :

```discord
!video {Nombre} {text}
```
Par exemple : ```!video 25 voicidutexte``` ou encore ```!video 1```

- Les commandes à exécuter sur discord pour le fullscreen :

```discord
!fullscreen
```
Cela permet d'activer / désactiver l'envoi d'image en plein écran, autrement les dimensions prises en compte sont celles de l'image.

- Les commandes à exécuter sur discord pour un audio :

```discord
!audio {Nombre} {text}
```
Cela permet d'envoyer un audio mp3, par exemple : ```!audio 11 voicidutexte``` ou encore ```!audio 7```

- Les commandes à exécuter sur discord pour du texte :

```discord
!texte {Nombre} {text}
```
Cela permet d'envoyer un texte, par exemple : ```!texte 5 voicidutexte``` ou encore ```!texte 12```

- Enfin, voici la commande à exécuter pour retirer du texte ou une url d'image / vidéo qui ne disparaît pas de l'écran :

```discord
!stop
```
*Gardez bien à l'esprit que le nombre est obligatoire car il permet de déterminer pendant combien de temps on laisse afficher l'image / vidéo.*

---

## 🆘 Problèmes

En cas d'erreur, n'hésitez pas à [créer une demande](https://github.com/Nerfez/LiveChatTwitch/issues) avec les détails qui conviennent pour que je puisse le corriger.
Ou à me contacter sur twitter : @Zefren_ (sauf si c'est pour que je vous setup de A à Z le bot)

Vérifiez bien que tous vos fichiers contiennent les bons identifiants, mdp, token etc car le bot fonctionne à 100%.
Par ailleurs, vérifiez que vous n'avez pas de VPN actif ou de proxy, celà engendre des problèmes d'update à la base de donnée.

En ce qui concerne le projet en lui-même, vous pouvez tout reprendre pour l'améliorer et en faire ce que vous voulez. Je compte pas être très actif sur les mises à jour.
