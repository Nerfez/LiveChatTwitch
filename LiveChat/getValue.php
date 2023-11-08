<?php
$bdd = new PDO('mysql:host=localhost;dbname=livechat_test', "root", ""); //A remplacer par vos valeurs
//remplacer localhost par votre ip / nom de serveur
//livechat_test devrait etre bon si vous avez repris mon dump sql
//root par votre username bdd
//le dernier parametre "" par votre mot de passe bdd

$sql = "SELECT * FROM data"; //votre requête, ici on va lire toutes nos valeurs

$stmt = $bdd->query($sql)->fetchAll();

foreach($stmt as $row){
    echo $row['Time']."$".$row['Width']."$".$row['Height']."$".$row['url']."$".$row['Texte']."$".$row['Audio']."$".$row['avatar']."$".$row['username'];
}//pareil vos Colonnes doivent correspondre aux noms dans votre Table
?>
