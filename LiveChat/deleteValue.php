<?php
$bdd = new PDO('mysql:host=localhost;dbname=livechat_test', "root", ""); //A remplacer par vos valeurs
//remplacer localhost par votre ip / nom de serveur
//livechat_test devrait etre bon si vous avez repris mon dump sql
//root par votre username bdd
//le dernier parametre "" par votre mot de passe bdd

$sql = 'DELETE FROM data LIMIT 1'; //on supprime la video / photo en cours

$statement = $bdd->prepare($sql);
$statement->execute();
?>