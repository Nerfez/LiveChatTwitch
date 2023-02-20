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
    if(message.channel.id === "CopiezLidentifiantDeVotreChannel"){
    let image = message.attachments.first().url;
    console.log("nom image : " + image);
    con.connect(err => {
    // return error
    if (err) return console.log(err);

    // No erorr
    console.log(`Connexion à la BDD!`);
});
//UPDATE de notre BDD
con.query(`UPDATE Image SET url = '${image}' WHERE 1`);
    console.log("message envoyé");
}
});

client.login("VotreTokenDuBot");