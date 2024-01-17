# LiveChatTwitch

Le but de ce projet est de reproduire le LiveChat qu'utilisent la CACABOX (streamers HugoDélire,Grimkujow,Potatoz,Terracid,etc..).
Lorsque l'on envoi une image/vidéo dans un channel discord, elle s'affiche sur leur live.

Je rappelle que c'est un projet que j'ai fais tout seul sur mon temps libre et que si à tout moment l'un des membres me contacte pour supprimer ce projet je le ferai, j'ai décidé de partager mon code
uniquement car je pense que c'est un outil très marrant entre amis.

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

Effectuez tous les changements nécessaires (token, mot de passe, nom de base de donnée, identifiant de channel etc...).

```
Fichier index.js du dossier Discord, lignes à modifier :
ligne 12 : idChannelDiscord
ligne 13 : TOKEN 
ligne 42 à  46 : host user password database
```

Si vous n'avez pas idée de ce que représente un token ou
si vous n'êtes pas à l'aise avec la création d'un bot discord, je vous renvoie à cette vidéo qui explique parfaitement la création d'un bot discord : 
https://www.youtube.com/watch?v=IErYPx-meD4&

Puis lancer le fichier ```index.js``` avec la commande suivante dans votre terminal :

```nodejs
node index.js
```

Maintenant, il vous faut hébergez le site avec les pages ```.html, .php et .css```, à titre personnel j'utilise alwaysdata qui permet d'héberger gratuitement (nécéssite de se créer un compte, vous aurez des mails de rappel de la part de alwaysdata indiquant si votre compte arrive à expiration, auquel cas il suffira de se connecter pour prolonger la durée de mise en service de 120j).
Sur alwaysdata vous aurez une base de donnée à disposition qu'il faudra créer et en même temps y déposer nos fichiers du dossier `LiveChat, pour ça j'utilise à titre personnel le client `Filezilla`, vous trouverez vos identifiants user host et mot de passe dans l'onglet FTP de alwaysdata pour vous connecter à votre serveur. afin d'y déposer les fichiers. Naturellement, changez bien vos identifiants de connexions dans les fichiers php soit :

```
ligne 2 des fichiers deleteValue et getValue : mysql:host= dbname= user password
```

Depuis AlwaysData, vous avez la possibilité de créer votre Base de donnée MySQL, ajouter une nouvelle base avec un utilisateur disposant de tous les droits, créez 1 table ```data``` soit :

| url     | Texte | Time | Width | Height | Audio | avatar | username|
|-----------------|--------|---------|---------|---------|--|-------|-----|
|                 |        |         |          |         |  |  | |


Si vous le souhaitez, vous pouvez importer directement le fichier `livechat_test.sql` à votre base, celà permettra d'avoir la table identique avec le code. (mais naturellement pas le même host, dbName, user, pass)

Si tout cela est fait et vous avez bien remplacer chaque identifiants/mdp etc correspondant à vos propre identifants alors ouvrez Streamlabs et ajoutez 2 nouvelles sources navigateur, entrez pour chacune
d'entre elle l'url correspondant ```https://*****index.html``` pour l'image et pour la vidéo ```https://*****/Video/index.html``` et cochez "raffraichir le navigateur lorsque la source est active".
Les url correspondent à votre site et vous n'êtes pas certain de connaitre le nom de votre site, vous pouvez le retrouver dans l'onglet Web -> Sites.

### 🔧 Commandes

Pour connaître les commandes vous pouvez faire `!help` sinon les voici :

- Les commandes à exécuter sur discord pour afficher du texte, image ou vidéo avec votre avatar et pseudo affiché :

```discord
!tell {Nombre} {text}
```
Par exemple : ```!tell 13 voici mon texte``` ou encore ```!tell 6```


- Les commandes à exécuter sur discord pour afficher du texte, image ou vidéo **MAIS** sans votre avatar et pseudo affiché :

```discord
!tellhide {Nombre} {text}
```
Par exemple : ```!tellhide 25 voicidutexte``` ou encore ```!tellhide 1```

- La commande à exécuter sur discord pour le fullscreen :

```discord
!fullscreen
```
Cela permet d'activer / désactiver l'envoi d'image en plein écran, autrement les dimensions prises en compte sont celles de l'image.

- Les commandes à exécuter sur discord pour un audio :

```discord
!audio {Nombre} {text}
```
Cela permet d'envoyer un audio mp3, par exemple : ```!audio 11 voicidutexte``` ou encore ```!audio 7```

- Enfin, voici la commande à exécuter pour retirer du texte ou une url d'image / vidéo qui ne disparaît pas de l'écran :

```discord
!stop
```
*Gardez bien à l'esprit que le nombre est obligatoire car il permet de déterminer pendant combien de temps on laisse afficher l'image / vidéo.*

---

## 🆘 Problèmes

En cas d'erreur, n'hésitez pas à [créer une demande](https://github.com/Nerfez/LiveChatTwitch/issues) avec les détails qui conviennent pour que je puisse le corriger.
Ou à me contacter sur twitter : @Zefren_ (sauf si c'est pour que je vous setup de A à Z le bot car comprenez bien que ça me prend du temps personnel mais si vous êtes vraiment bloqué envoyez un message)

Vérifiez bien que tous vos fichiers contiennent les bons identifiants, mdp c'est 90% du temps dû à ça.
Par ailleurs, vérifiez que vous n'avez pas de VPN actif ou de proxy, celà engendre des problèmes d'update à la base de donnée.

En ce qui concerne le projet en lui-même, vous pouvez tout reprendre pour l'améliorer et en faire ce que vous voulez. J'ai réussi à reproduire le système de file d'attente mais pour l'instant les images et les vidéos sont dissociés, c'est à dire qu'en théorie on peut envoyer une vidéo ET une image en même temps, je veillerai dans une prochaine MAJ de corriger ça.
