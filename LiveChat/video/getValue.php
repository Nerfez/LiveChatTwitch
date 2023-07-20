<?php
$bdd = new PDO('mysql:host=localhost;dbname=livechat_test', "root", ""); //A remplacer par vos valeurs

$sql = "SELECT * FROM video"; //votre requête, ici on va lire toutes nos valeurs

$stmt = $bdd->query($sql)->fetchAll();

foreach($stmt as $row){
    echo $row['VideoTime']."$".$row['Width']."$".$row['Height']."$".$row['VideoURL']."$".$row['VideoTexte'];
}//pareil vos Colonnes doivent correspondre aux noms dans votre Table
?>