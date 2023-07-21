const { Client, GatewayIntentBits } = require("discord.js");
const { createConnection } = require("mysql");

//LISTE DES COMMANDES A ECRIRE SUR DISCORD
const prefixImage = "!image";
const prefixVideo = "!video";
const prefixFullScreen = "!fullscreen";
const prefixStop = "!stop";
const prefixHelp = "!help";

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
    channel.send(
      "Je suis prêt, vous pouvez envoyez des images / vidéos. !help"
    );
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
    console.log("Vérifiez la commande");
    message.channel.send(
      "Erreur dans la commande <@" +
        `${message.author.id}` +
        "> !help pour plus d'informations"
    );
  } else {
    //Si le message reçu correspond à l'une des commandes alors on vérifie de quelle commande il s'agit
    if (
      myMessage[0] === prefixImage &&
      message.channel.id === idChannelDiscord
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

        message.channel.send(
          "L'image a été envoyée <@" + `${message.author.id}` + ">"
        );
      } //FIN CONDITION IMAGE
    }

    if (
      myMessage[0] === prefixVideo &&
      message.channel.id === idChannelDiscord
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
        con.query(`UPDATE video SET Height='${height}' WHERE 1`);
        message.channel.send(
          "La vidéo a été envoyée <@" + `${message.author.id}` + ">"
        ); //FIN UPDATE
      }
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
    con.query(`UPDATE image SET url = '${""}' WHERE 1`);
    con.query(`UPDATE image SET ImageTexte = '${" "}' WHERE 1`);
    message.channel.send(
      "Le stop a fonctionné <@" + `${message.author.id}` + ">"
    );
  }
  if (myMessage[0] === prefixHelp && message.channel.id === idChannelDiscord) {
    message.channel.send(
      "<@" +
        `${message.author.id}` +
        "> Un message doit contenir obligatoirement une image ou une vidéo. La commande doit commencer par !image ou !video suivit d'un nombre qui représente le temps en secondes que l'image ou la vidéo va apparaître.\n !stop pour réinitialiser l'image / vidéo \n !fullscreen pour activer / desactiver l'affiche image plein écran \nPour plus d'exemple rendez-vous sur : <https://github.com/Nerfez/LiveChatTwitch>"
    );
  }

  if (
    myMessage[0] === prefixFullScreen &&
    message.channel.id === idChannelDiscord
  ) {
    if (isFullscreen === false) {
      message.channel.send(
        "<@" +
          `${message.author.id}` +
          "> Désormais, les photos et vidéos seront envoyées en plein écran. (1920x1080)"
      );
      isFullscreen = true;
    } else if (isFullscreen === true) {
      message.channel.send(
        "<@" +
          `${message.author.id}` +
          "> Désormais, la taille des photos et vidéos envoyées correspondront à leurs tailles définies."
      );
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
    default:
      return false;
  }
}

/*
 * Connexion du bot discord grâce au Token
 * C'est un faux token donc ça ne marchera pas, créez votre propre bot discord
 * et pensez à bien remplacer par votre Token en haut du fichier (ligne 12)
 */
client.login(TOKEN);
