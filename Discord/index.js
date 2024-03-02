const { Client, GatewayIntentBits } = require("discord.js");
const { createConnection } = require("mysql2");

//LISTE DES COMMANDES A ECRIRE SUR DISCORD
const prefixTell = "!tell";
const prefixTellHide = "!tellhide";
const prefixFullScreen = "!fullscreen";
const prefixStop = "!stop";
const prefixHelp = "!help";
const prefixAudio = "!audio";

const idChannelDiscord = process.env.ID_CHANNEL_DISCORD;
const TOKEN = process.env.DISCORD_TOKEN;

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
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
  insecureAuth: true,
});


con.connect((err) => {
  if (err) {
    console.error(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME)
    console.error("Erreur de connexion à la base de donnée:", err);
  } else {
    console.log("Connexion à la base de donnée établie.");
  }
});

//Lancement du bot Discord
client.on("ready", () => {
  client.channels.fetch(idChannelDiscord).then((channel) => {
    let exampleEmbed = {
      title: "LiveChat opérationnel !help",
      color: 0x0099ff,
    };
    channel.send({ embeds: [exampleEmbed] });
  });
  console.log("LiveChat Prêt");
});

//Le bot est mis sur écoute
client.on("messageCreate", (message) => {
  let myMessage = message.content.split(" ");

  if (isCommandValid(myMessage, message)) {
    handleCommands(myMessage, message);
  }
});

function isCommandValid(myMessage, message) {
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
    const exampleEmbed = {
      title: "Erreur dans la commande !",
      color: 0xff0000,
    };
    message.channel.send({ embeds: [exampleEmbed] });
    return false;
  }
  return true;
}

function handleCommands(myMessage, message) {
  if (myMessage[0] === prefixTell && message.channel.id === idChannelDiscord) {
    handleTellCommand(message, myMessage);
  }

  if (myMessage[0] === prefixStop && message.channel.id === idChannelDiscord) {
    con.query(`DELETE FROM data
    ORDER BY CreatedTime
    LIMIT 1
    `);
  }

  if (
    myMessage[0] === prefixTellHide &&
    message.channel.id === idChannelDiscord
  ) {
    handleTellHideCommand(message, myMessage);
  }

  if (
    myMessage[0] === prefixFullScreen &&
    message.channel.id === idChannelDiscord
  ) {
    handleFullScreen(message);
  }

  if (
    myMessage[0] === prefixAudio &&
    message.channel.id === idChannelDiscord &&
    message.attachments.first()
  ) {
    handleAudioCommand(message, myMessage);
  }

  if (myMessage[0] === prefixHelp && message.channel.id === idChannelDiscord) {
    handleHelpCommand(message);
  }
}

function handleFullScreen(message) {
  if (isFullscreen === false) {
    let exampleEmbed = {
      title: "Fullscreen activé !",
      color: 0x008000,
    };
    message.channel.send({ embeds: [exampleEmbed] });
    isFullscreen = true;
  } else if (isFullscreen === true) {
    let exampleEmbed = {
      title: "Fullscreen désactivé !",
      color: 0xff0000,
    };
    message.channel.send({ embeds: [exampleEmbed] });
    isFullscreen = false;
  }
}

function handleHelpCommand(message) {
  const exampleEmbed = {
    title:
      "Liste des commandes : \n!tell {time} {message} - envoi d'une video/image\n!tellhide {time} {message} - envoi d'une vidéo/image sans pseudo\n!fullscreen - activer/désactiver\n!stop - retirer l'image/vidéo/texte à l'écran",
    color: 0xffffff,
  };
  message.channel.send({ embeds: [exampleEmbed] });
}

function handleTellCommand(message, myMessage) {
  const username = message.author.username;
  const avatar = message.author.displayAvatarURL();

  checkIfContainsMedia(avatar, username, message, myMessage);
}

function handleTellHideCommand(message, myMessage) {
  const username = "";
  const avatar =
    "https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png";

  checkIfContainsMedia(avatar, username, message, myMessage);
}

function handleAudioCommand(message, myMessage) {
  if (message.attachments.first()) {
    const audio = message.attachments.first().url;
    const time = myMessage[1] * 1000;
    let texte = message.content.substring(
      myMessage[0]?.length + myMessage[1]?.length + 2,
      message.content.length
    );
    texte = checkTexte(texte);
  createdTime = formatDateForDatabase(new Date());
  console.log("affichage de :", time, texte, audio);
    con.query(
      `INSERT INTO data (url, Time, Texte, Width, Height, Audio, username, avatar, CreatedTime) VALUES ('','${time}','${texte}','','','${audio}','','', '${createdTime}')`
    );
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
    case prefixTellHide:
    case prefixHelp:
    case prefixStop:
    case prefixFullScreen:
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
function checkIfContainsMedia(avatar, username, message, myMessage) {
  if (message.attachments.first()) {
    handleMediaAttachment(message, myMessage, avatar, username);
  } else {
    handleTextOnlyMessage(message, myMessage, avatar, username);
  }
}

function handleMediaAttachment(message, myMessage, avatar, username) {
  let height = message.attachments.first().height;
  let width = message.attachments.first().width;

  if (isFullscreen === true) {
    width = 1920;
    height = 1080;
  }

  const mediaURL = message.attachments.first().url;
  const time = myMessage[1] * 1000;
  let texte = message.content.substring(
    myMessage[0].length + myMessage[1].length + 2,
    message.content.length
  );
  texte = checkTexte(texte);

  if (message.attachments.first().contentType.startsWith("image")) {
    handleImageInsertion(
      mediaURL,
      time,
      texte,
      width,
      height,
      username,
      avatar
    );
  } else if (message.attachments.first().contentType.startsWith("video")) {
    handleVideoInsertion(
      mediaURL,
      time,
      texte,
      width,
      height,
      username,
      avatar
    );
  }
}

function handleImageInsertion(
  imageURL,
  time,
  texte,
  width,
  height,
  username,
  avatar
) {
  createdTime = formatDateForDatabase(new Date());
  console.log("affichage de :", time, texte, avatar, username);
  con.query(
    `INSERT INTO data (url, Time, Texte, Width, Height, Audio, username, avatar, CreatedTime) VALUES ('${imageURL}','${time}','${texte}','${width}','${height}','','${username}','${avatar}', '${createdTime}')`
  );
}

function handleVideoInsertion(
  videoURL,
  time,
  texte,
  width,
  height,
  username,
  avatar
) {
  createdTime = formatDateForDatabase(new Date());
  console.log("affichage de :", time, texte, avatar, username);
  con.query(
    `INSERT INTO data (url, Time, Texte, Width, Height, Audio, username, avatar, CreatedTime) VALUES ('${videoURL}','${time}','${texte}','${width}','${height}','','${username}','${avatar}', '${createdTime}')`
  );
}

function handleTextOnlyMessage(message, myMessage, avatar, username) {
  const time = myMessage[1] * 1000;
  let texte = message.content.substring(
    myMessage[0]?.length + myMessage[1]?.length + 2,
    message.content.length
  );
  texte = checkTexte(texte);
  console.log("affichage de :", time, texte, avatar, username);
  createdTime = formatDateForDatabase(new Date());
  con.query(
    `INSERT INTO data (url, Time, Texte, Width, Height, Audio, username, avatar, CreatedTime) VALUES ('ttps://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png','${time}','${texte}','','','','${username}','${avatar}', '${createdTime}')`
  );
}

function formatDateForDatabase(date) {

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

/*
Permet de supprimer les ' car cela provoque des erreurs dans la requete
*/
function checkTexte(message) {
  return message.replaceAll(`'`, ` `);
}

/*
 * Connexion du bot discord grâce au Token
 * C'est un faux token donc ça ne marchera pas, créez votre propre bot discord
 * et pensez à bien remplacer par votre Token en haut du fichier (ligne 13)
 */
client.login(TOKEN);



