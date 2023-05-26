const { Client, GatewayIntentBits, channelLink } = require("discord.js");
const { createConnection } = require('mysql');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let con = createConnection({
  host: 'VotreNomDeServeur',
  port: '3306',
  user: 'VotreUsername',
  password: 'VotreMDP',
  database: 'NomBaseDonnee',
  charset: 'utf8mb4'
});

client.on("ready", () => {
    console.log("LiveChat Prêt");
});

client.on("messageCreate", message => {
    //on regarde uniquement un channel spécifique
    if (message.channel.id === "IdDeVotreChannelDiscord" && message.content[0] === prefix) {
        let splitMessage = message.content.split(" ");
        let image = message.attachments.first().url;
        let time = splitMessage[1] * 1000;
        let texte = message.content.substring(splitMessage[0].length + splitMessage[1].length + 2, message.content.length);
        console.log("nom image : " + image);
        console.log("time : " + time);
        console.log("texte : " + texte);
        con.connect(err => {
            // return error
            if (err) return console.log(err);

            // No erorr
            console.log(`Connexion à la BDD!`);
        });
        //UPDATE de notre BDD
        con.query(`UPDATE Image SET url = '${image}' WHERE 1`);
        console.log("image envoyée");

        con.query(`UPDATE Image SET ImageTexte = '${texte}' WHERE 1`);
        console.log("texte envoyé");

        con.query(`UPDATE Image SET ImageTime = '${time}' WHERE 1`);
        console.log("time envoyé");
    }

    if (message.channel.id === "IdDeVotreChannelDiscord" && message.content[0] === prefix) {
        let splitMessage = message.content.split(" ");
        let video = message.attachments.first().url;
        let time = splitMessage[1] * 1000;
        let texte = message.content.substring(splitMessage[0].length + splitMessage[1].length + 2, message.content.length);
        console.log("url video : " + video);
        console.log("time : " + time);
        console.log("texte : " + texte);
        con.connect(err => {
            // return error
            if (err) return console.log(err);

            // No erorr
            console.log(`Connexion à la BDD!`);
        });
        //UPDATE de notre BDD
        con.query(`UPDATE Video SET VideoURL = '${video}' WHERE 1`);
        console.log("video envoyée");

        con.query(`UPDATE Video SET VideoTexte = '${texte}' WHERE 1`);
        console.log("texte envoyé");

        con.query(`UPDATE Video SET VideoTime = '${time}' WHERE 1`);
        console.log("time envoyé");
    }

});

client.login("Votre-Token-Du-Bot");
