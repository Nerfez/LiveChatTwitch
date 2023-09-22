const { Client, GatewayIntentBits } = require("discord.js");
const { createConnection } = require("mysql");

//LISTE DES COMMANDES A ECRIRE SUR DISCORD
const prefixImage = "!image";
const prefixVideo = "!video";
const prefixFullScreen = "!fullscreen";
const prefixStop = "!stop";
const prefixHelp = "!help";
const prefixAudio = "!audio";
const prefixTexte = "!texte";

const idChannelDiscord = "0003424000023312123"; //Remplacez par l'id de votre channel Discord
const TOKEN = "QZOIJSQ8fd394jdsdSE934.3424DSoze.324dsEROP.23REkdf"; //Remplacez par le Token de votre bot discord

//L'id discord et le token sont de fausses valeurs, ça ne fonctionnera pas en l'état

var isFullscreen = false; //Par défaut, l'envoi des images correspond à la taille définie de l'image

/*
 * Client discord
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

/*
 * Permet d'effectuer la connexion vers la base de donnée
 *
 * host: SERVEUR QUI HEBERGE LE SITE/BDD par exemple alwaysdata : mysql-username.alwaysdata.net
 * port: Le port d'écoute, à ne pas modifier
 * user: Utilisateur pour se connecter à votre bdd (doit avoir les accès admin)
 * password: Mot de passe du compte bdd
 * database: Nom de la base de donnée
 * charset: Encodage, à ne pas modifier
 */
let con = createConnection({
  host: "localhost", //A remplacer par le votre
  port: "3306",
  user: "root", //A remplacer par le votre
  password: "", //A remplacer par le votre
  database: "livechat_test", //A remplacer par le votre
  charset: "utf8mb4",
});

//Lancement du bot Discord
client.on("ready", () => {
  client.channels.fetch(idChannelDiscord).then((channel) => {
    let exampleEmbed = {
      title:
        "LiveChat opérationnel !help",
      color: 0x0099ff,
    };
    channel.send({ embeds: [exampleEmbed] });
  });
  console.log("LiveChat Prêt");
});

//Le bot est mis sur écoute
client.on("messageCreate", (message) => {
  //On décompose le message reçu
  let myMessage = message.content.split(" ");

  //On vérifie qu'il s'agit d'une commande
  if (
    (isPrefixValid(myMessage[0]) &&
      message.channel.id === idChannelDiscord &&
      message.attachments.size <= 0 &&
      myMessage[1]?.length <= 0) ||
    (isPrefixValid(myMessage[0]) &&
      message.channel.id === idChannelDiscord &&
      message.attachments.size > 0 &&
      myMessage[1]?.match("/^d+$/") &&
      myMessage[1]?.length <= 3)
  ) {
    let exampleEmbed = {
      title:
        "Erreur dans la commande !",
      color: 0xff0000,
    };
    message.channel.send({ embeds: [exampleEmbed] });
  } else {
    //Si le message reçu correspond à l'une des commandes alors on vérifie de quelle commande il s'agit
    if (
      myMessage[0] === prefixImage &&
      message.channel.id === idChannelDiscord && message.attachments.first()
    ) {
      //Si c'est une image
      let height = message.attachments.first().height;
      let width = message.attachments.first().width;

      //Si la condition fullscreen est active
      if (isFullscreen === true) {
        width = 1920;
        height = 1080;
      }
      let image = message.attachments.first().url;
      let time = myMessage[1] * 1000;
      let texte = message.content.substring(
        myMessage[0].length + myMessage[1].length + 2,
        message.content.length
      );
      texte = checkTexte(texte);
      if (message.attachments.first().contentType.startsWith("image")) {
        con.connect((err) => {
          //En cas d'erreur
          if (err) {
            return console.log(err);
          }

          //Si il n'y a aucune erreur
          console.log(`Connexion à la BDD!`);
        });

        //UPDATE de notre BDD TABLE Image
        con.query(`UPDATE image SET url='${image}' WHERE 1`);
        con.query(`UPDATE image SET ImageTime='${time}' WHERE 1`);
        con.query(`UPDATE image SET ImageTexte='${texte}' WHERE 1`);
        con.query(`UPDATE image SET Width='${width}' WHERE 1`);
        con.query(`UPDATE image SET Height='${height}' WHERE 1`);
      } //FIN CONDITION IMAGE
    }

    if (
      myMessage[0] === prefixVideo &&
      message.channel.id === idChannelDiscord && message.attachments.first()
    ) {
      //Si c'est une vidéo
      let video = message.attachments.first().url;
      let width = message.attachments.first().width;
      let height = message.attachments.first().height;

      //Si la condition fullscreen est active
      if (isFullscreen === true) {
        width = 1920;
        height = 1080;
      }
      let time = myMessage[1] * 1000;
      let texte = message.content.substring(
        myMessage[0]?.length + myMessage[1]?.length + 2,
        message.content.length
      );
      texte = checkTexte(texte);

      if (message.attachments.first().contentType.startsWith("video")) {
        con.connect((err) => {
          //En cas d'erreur
          if (err) {
            return console.log(err);
          }
          //Si il n'y a pas d'erreur
          console.log(`Connexion à la BDD!`);
        });

        //UPDATE de notre BDD TABLE Video
        con.query(`UPDATE video SET VideoURL='${video}' WHERE 1`);
        con.query(`UPDATE video SET VideoTime='${time}' WHERE 1`);
        con.query(`UPDATE video SET VideoTexte='${texte}' WHERE 1`);
        con.query(`UPDATE video SET Width='${width}' WHERE 1`);
        con.query(`UPDATE video SET Height='${height}' WHERE 1`);//FIN UPDATE
      }
    }
  }

  if (myMessage[0] === prefixTexte && message.channel.id === idChannelDiscord) {
    {
      //Si c'est du texte
      let time = myMessage[1] * 1000;
      let texte = message.content.substring(
        myMessage[0]?.length + myMessage[1]?.length + 2,
        message.content.length
      );
      texte = checkTexte(texte);
      con.connect((err) => {
        //En cas d'erreur
        if (err) {
          return console.log(err);
        }
        //Si il n'y a pas d'erreur
        console.log(`Connexion à la BDD!`);
      });

      //UPDATE de notre BDD TABLE Image
      con.query(`UPDATE image SET ImageTime='${time}' WHERE 1`);
      con.query(`UPDATE image SET ImageTexte='${texte}' WHERE 1`);//FIN UPDATE
    }
  }

  if (myMessage[0] === prefixAudio && message.channel.id === idChannelDiscord && message.attachments.first()) {
    {
      //Si c'est un audio
      let audio = message.attachments.first().url;
      console.log("audio: ", audio);
      let time = myMessage[1] * 1000;
      let texte = message.content.substring(
        myMessage[0]?.length + myMessage[1]?.length + 2,
        message.content.length
      );
      texte = checkTexte(texte);
      con.connect((err) => {
        //En cas d'erreur
        if (err) {
          return console.log(err);
        }
        //Si il n'y a pas d'erreur
        console.log(`Connexion à la BDD!`);
      });

      //UPDATE de notre BDD TABLE Image
      con.query(`UPDATE image SET Audio='${audio}' WHERE 1`);
      con.query(`UPDATE image SET ImageTime='${time}' WHERE 1`);
      con.query(`UPDATE image SET ImageTexte='${texte}' WHERE 1`);//FIN UPDATE
    }
  }

  if (myMessage[0] === prefixStop && message.channel.id === idChannelDiscord) {
    con.connect((err) => {
      //en cas d'erreur
      if (err) {
        return console.log(err);
      }
      //Si il n'y a pas d'erreur
      console.log(`Connexion à la BDD!`);
    });

    //UPDATE de notre BDD TABLE Video
    con.query(`UPDATE video SET VideoURL = '${""}' WHERE 1`);
    con.query(`UPDATE video SET VideoTexte = '${" "}' WHERE 1`);

    //UPDATE de notre BDD TABLE Image
    con.query(`UPDATE image SET Audio='${""}' WHERE 1`);
    con.query(`UPDATE image SET url = '${"https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png"}' WHERE 1`);
    con.query(`UPDATE image SET ImageTexte = '${" "}' WHERE 1`);
  }
  if (myMessage[0] === prefixHelp && message.channel.id === idChannelDiscord) {
    let exampleEmbed = {
      title:
        "Liste des commandes : \n!video {time} {message} - envoi d'une video\n!image {time} {message} - envoi d'une image\n!texte {time} {message} - envoi d'un message\n!fullscreen - activer/désactiver\n!stop - retirer l'image/vidéo/texte à l'écran",
      color: 0xffffff,
    };
    message.channel.send({ embeds: [exampleEmbed] });
  }

  if (
    myMessage[0] === prefixFullScreen &&
    message.channel.id === idChannelDiscord
  ) {
    if (isFullscreen === false) {
      let exampleEmbed = {
        title:
          "Fullscreen activé !",
        color: 0x008000,
      };
      message.channel.send({ embeds: [exampleEmbed] });
      isFullscreen = true;
    } else if (isFullscreen === true) {
      let exampleEmbed = {
        title:
          "Fullscreen désactivé !",
        color: 0xff0000,
      };
      message.channel.send({ embeds: [exampleEmbed] });
      isFullscreen = false;
    }
  }
});

/*
 * Permet de vérifier si le message entré dans le channel discord commence par l'une de nos commandes
 *
 * @param message Le message reçu sur le channel discord
 * @return True si le message commence par une commande
 */
function isPrefixValid(message) {
  switch (message) {
    case prefixImage:
      return true;
    case prefixVideo:
      return true;
    case prefixHelp:
      return true;
    case prefixStop:
      return true;
    case prefixFullScreen:
      return true;
    case prefixAudio:
      return true;
    default:
      return false;
  }
}

/*
Permet de supprimer les ' car cela provoque des erreurs dans la requete
*/
function checkTexte(message) {
  return (message.replaceAll(`'`, ` `));
}

/*
 * Connexion du bot discord grâce au Token
 * C'est un faux token donc ça ne marchera pas, créez votre propre bot discord
 * et pensez à bien remplacer par votre Token en haut du fichier (ligne 12)
 */
client.login(TOKEN);


