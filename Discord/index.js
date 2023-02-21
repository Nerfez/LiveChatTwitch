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
    //on regarde uniquement un channel spécifique et execute la requete uniquement si le message n'a pas de message
    if(message.channel.id === "Copiez-Lidentifiant-De-Votre-Channel" && message.content == ""){
    let image = message.attachments.first().url;
    console.log("nom image : " + image);
    con.connect(err => {
    // return error
    if (err) return console.log(err);

    // No erorr
    console.log(`Connexion à la BDD!`);
});
//UPDATE de notre BDD, on envoit l'url 
con.query(`UPDATE Image SET url = '${image}' WHERE 1`);
    console.log("message envoyé");
}
});

client.login("Votre-Token-Du-Bot");
