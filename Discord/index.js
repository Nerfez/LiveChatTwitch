const { Client, GatewayIntentBits, channelLink } = require("discord.js");
const { createConnection } = require("mysql");

const prefixImage = "!image";
const prefixVideo = "!video";
const prefixStop = "!stop";
const prefixHelp = "!help";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let con = createConnection({
  host: "NomServeur",
  port: "3306",
  user: "NomUtilisateur",
  password: "MotDePasse",
  database: "NomBaseDeDonnée",
  charset: "utf8mb4",
});

client.on("ready", (message) => {
    client.channels.fetch('IdDeVotreChannelDiscord')
    .then(channel => {
        channel.send("Je suis prêt, vous pouvez envoyez des images / vidéos. !help");
    })
  console.log("LiveChat Prêt");
});

client.on("messageCreate", (message) => {
  //on regarde uniquement un channel spécifique
  let myMessage = message.content.split(" ");

  if (
    (!myMessage[1]?.match("^[0-9]+$") &&
      isPrefixValid(myMessage[0]) &&
      message.channel.id === "IdDeVotreChannelDiscord") ||
    (isPrefixValid(myMessage[0]) &&
      message.channel.id === "IdDeVotreChannelDiscord" &&
      message.attachments.size <= 0)
  ) {
    console.log("Vérifiez la commande");
    message.channel.send(
      "Erreur dans la commande <@" +
        `${message.author.id}` +
        "> !help pour plus d'informations"
    );
  } else {
    if (myMessage[0] === prefixImage &&
      message.channel.id === "IdDeVotreChannelDiscord") {
      let splitMessage = message.content.split(" ");
      let image = message.attachments.first().url;
      let time = splitMessage[1] * 1000;
      let texte = message.content.substring(
        myMessage[0].length + myMessage[1].length + 2,
        message.content.length
      );
      console.log("nom image : " + image);
      console.log("time : " + time);
      console.log("texte : " + texte);
      con.connect((err) => {
        // return error
        if (err) {
          return console.log(err);
        }

        // No erorr
        console.log(`Connexion à la BDD!`);
      });

      //UPDATE de notre BDD
        con.query(`UPDATE Image SET url='${image}' WHERE 1`);
        con.query(`UPDATE Image SET ImageTime='${time}' WHERE 1`);
        con.query(`UPDATE Image SET ImageTexte='${texte}' WHERE 1`);
        console.log("image envoyée", image);
        console.log("texte envoyé", texte);
        console.log("time envoyé", time);
        message.channel.send(
          "L'image a été envoyée <@" + `${message.author.id}` + ">"
        );
    }

    if (myMessage[0] === prefixVideo &&
      message.channel.id === "IdDeVotreChannelDiscord") {
      let splitMessage = message.content.split(" ");
      let video = message.attachments.first().url;
      let time = splitMessage[1] * 1000;
      let texte = message.content.substring(
        myMessage[0].length + myMessage[1].length + 2,
        message.content.length
      );
      console.log("url video : " + video);
      console.log("time : " + time);
      console.log("texte : " + texte);
      con.connect((err) => {
        // return error
        if (err) {
          return console.log(err);
        }
        // No erorr
        console.log(`Connexion à la BDD!`);
      });

        //UPDATE de notre BDD
        con.query(`UPDATE Video SET VideoURL ='${video}' WHERE 1`);
        con.query(`UPDATE Video SET VideoTime='${time}' WHERE 1`);
        con.query(`UPDATE Video SET VideoTexte='${texte}' WHERE 1`);
        console.log("video envoyée", video);
        console.log("texte envoyé", texte);
        console.log("time envoyé", time);
        message.channel.send(
          "La vidéo a été envoyée <@" + `${message.author.id}` + ">"
        );
    }

    if (myMessage[0] === prefixStop &&
      message.channel.id === "IdDeVotreChannelDiscord") {
      con.connect((err) => {
        // return error
        if (err) {
          return console.log(err);
        }
        // No erorr
        console.log(`Connexion à la BDD!`);
      });

      //UPDATE de notre BDD
        con.query(`UPDATE Video SET VideoURL = '${"vide"}' WHERE 1`);
        con.query(`UPDATE Video SET VideoTexte = '${" "}' WHERE 1`);

        //UPDATE de notre BDD
        con.query(`UPDATE Image SET url = '${"vide"}' WHERE 1`);
        con.query(`UPDATE Image SET ImageTexte = '${" "}' WHERE 1`);
        message.channel.send(
          "Le stop a fonctionné <@" + `${message.author.id}` + ">"
        );
    }

    if (myMessage[0] === prefixHelp &&
      message.channel.id === "IdDeVotreChannelDiscord") {
      message.channel.send(
        "<@" +
          `${message.author.id}` +
          "> Un message doit contenir obligatoire une image ou une vidéo. La commande doit commencer par !image ou !video suivit d'un nombre qui représente le temps en secondes que l'image ou la vidéo va apparaître. Pour plus d'exemple rendez-vous sur : <https://github.com/Nerfez/LiveChatTwitch>"
      );
    }
  }
});

function isPrefixValid(message) {
  switch (message) {
    case prefixImage:
      return true;
    case prefixVideo:
      return true;
    default:
      return false;
  }
}

client.login(
  "RemplacerParLeTokenDeVotreBot"
);
