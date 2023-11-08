const { Client, GatewayIntentBits } = require("discord.js");
const { createConnection } = require("mysql");

//LISTE DES COMMANDES A ECRIRE SUR DISCORD
const prefixTell = "!tell";
const prefixTellHide = "!tellhide";
const prefixFullScreen = "!fullscreen";
const prefixStop = "!stop";
const prefixHelp = "!help";
const prefixAudio = "!audio";

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


con.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de donnée:", err);
  } else {
    console.log("Connexion à la base de donnée établie.");
  }
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
      myMessage[0] === prefixTell &&
      message.channel.id === idChannelDiscord
    ) {
      const username = message.author.username;
      const avatar = message.author.displayAvatarURL();

      checkIfContainsMedia(avatar, username, message, myMessage);
    }

    if (
      myMessage[0] === prefixTellHide &&
      message.channel.id === idChannelDiscord
    ) {
      const username = "";
      const avatar = "https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png";

      checkIfContainsMedia(avatar, username, message, myMessage);
    }
  }

  if (myMessage[0] === prefixAudio && message.channel.id === idChannelDiscord && message.attachments.first()) {
    {
      //Si c'est un audio
      let audio = message.attachments.first().url;
      let time = myMessage[1] * 1000;
      let texte = message.content.substring(
        myMessage[0]?.length + myMessage[1]?.length + 2,
        message.content.length
      );
      texte = checkTexte(texte);

      //UPDATE de notre BDD TABLE Image
      con.query(`UPDATE image SET Audio='${audio}' WHERE 1`);
      con.query(`UPDATE image SET ImageTime='${time}' WHERE 1`);
      con.query(`UPDATE image SET ImageTexte='${texte}' WHERE 1`);//FIN UPDATE
    }
  }

  if (myMessage[0] === prefixStop && message.channel.id === idChannelDiscord) {

    //UPDATE de notre BDD TABLE Data
    con.query(`UPDATE data SET url = '${""}' WHERE 1`);
    con.query(`UPDATE data SET Texte = '${" "}' WHERE 1`);
    con.query(`UPDATE data SET Audio='${""}' WHERE 1`);
    con.query(`UPDATE data SET url = '${"https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png"}' WHERE 1`);
  }
  if (myMessage[0] === prefixHelp && message.channel.id === idChannelDiscord) {
    let exampleEmbed = {
      title:
        "Liste des commandes : \n!tell {time} {message} - envoi d'une video ou image en affichant son avatar et pseudo\n!tellhide {time} {message} - pareil mais on cache l identité\n!fullscreen - activer/désactiver\n!stop - retirer l'image/vidéo/texte à l'écran",
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
 * Permet de vérifier si le message entré dans le channel discord commence par l'une de nos commandes
 *
 * @param message Le message reçu sur le channel discord
 * @return True si le message commence par une commande
 */
function isPrefixValid(message) {
  switch (message) {
    case prefixTell:
      return true;
    case prefixTellHide:
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
 * Permet de vérifier si le message contient un média
 *
 * @param avatar image, username String pseudo
 */
function checkIfContainsMedia(avatar, username, message, myMessage){
  if(message.attachments.first()){      
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

      //UPDATE de notre BDD TABLE data
      con.query(`UPDATE data SET url='${image}' WHERE 1`);
      con.query(`UPDATE data SET Time='${time}' WHERE 1`);
      con.query(`UPDATE data SET Texte='${texte}' WHERE 1`);
      con.query(`UPDATE data SET Width='${width}' WHERE 1`);
      con.query(`UPDATE data SET Height='${height}' WHERE 1`);
      con.query(`UPDATE data SET avatar='${avatar}' WHERE 1`);
      con.query(`UPDATE data SET username='${username}' WHERE 1`);

    } //FIN CONDITION IMAGE
    else if(message.attachments.first().contentType.startsWith("video")){
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

      //UPDATE de notre BDD TABLE data
      con.query(`UPDATE data SET url='${video}' WHERE 1`);
      con.query(`UPDATE data SET Time='${time}' WHERE 1`);
      con.query(`UPDATE data SET Texte='${texte}' WHERE 1`);
      con.query(`UPDATE data SET Width='${width}' WHERE 1`);
      con.query(`UPDATE data SET Height='${height}' WHERE 1`);
      con.query(`UPDATE data SET avatar='${avatar}' WHERE 1`);
      con.query(`UPDATE data SET username='${username}' WHERE 1`);//FIN UPDATE
    }
  } else {
    let time = myMessage[1] * 1000;
    let texte = message.content.substring(
      myMessage[0]?.length + myMessage[1]?.length + 2,
      message.content.length
    );
    texte = checkTexte(texte);

      //UPDATE de notre BDD TABLE data
      con.query(`UPDATE data SET Time='${time}' WHERE 1`);
      con.query(`UPDATE data SET Texte='${texte}' WHERE 1`);
      con.query(`UPDATE data SET avatar='${avatar}' WHERE 1`);
      con.query(`UPDATE data SET username='${username}' WHERE 1`);
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


