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
Puis diriger vous dans le dossier Discord où figure le fichier ```index.js``` depuis votre terminal et entrez les commandes suivantes :

```nodejs
npm init
```

```nodejs
npm i discord.js
```

```nodejs
npm i mysql
```

Effectuez tous les changements nécessaires (token, mot de passe, nom de base de donnée, identifiant de channel etc...). Si vous n'avez pas idée de ce que représente un token ou
si vous n'êtes pas à l'aise avec la création d'un bot discord, je vous renvoie à cette vidéo qui explique parfaitement la création d'un bot discord : 
https://www.youtube.com/watch?v=IErYPx-meD4&

Puis lancer le fichier ```index.js``` depuis visual studio code.

Maintenant, il vous faut hébergez le site avec les pages ```.php et .css```, à titre personnel j'utilise alwaysdata qui permet d'héberger gratuitement (nécéssite de se créer un compte).

Si tout cela est fait et vous avez bien remplacer chaque identifiants/mdp etc correspondant à vos propre identifants alors ouvrez Streamlabs et ajoutez 2 nouvelles sources navigateur, entrez pour chacune
d'entre elle l'url correspondant ```https://*****index.php``` pour l'image et pour la vidéo ```https://*****/Video/index.php``` et cochez "raffraichir le navigateur lorsque la source est active".

---

## 🆘 Problèmes

En cas d'erreur, n'hésitez pas à [créer une demande](https://github.com/Nerfez/LiveChatTwitch/issues) avec les détails qui conviennent pour que je puisse le corriger.
Ou à me contacter sur twitter : @Zefren_

En ce qui concerne le projet en lui-même, vous pouvez tout reprendre pour l'améliorer et en faire ce que vous voulez.
