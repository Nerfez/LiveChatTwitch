<?php
$bdd = new PDO('mysql:host=localhost;dbname=livechat_test', "root", ""); //A remplacer par vos valeurs

$sql = "SELECT * FROM image"; //votre requête, ici on va lire toutes nos valeurs

$stmt = $bdd->query($sql)->fetchAll();

foreach($stmt as $row){
    echo $row['ImageTime']."$".$row['Width']."$".$row['Height']."$".$row['url']."$".$row['ImageTexte']."$".$row['Audio'];
}//pareil vos Colonnes doivent correspondre aux noms dans votre Table
?>
