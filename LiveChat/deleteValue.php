<?php
$bdd = new PDO('mysql:host=localhost;dbname=livechat_test', "root", ""); //A remplacer par vos valeurs
//remplacer localhost par votre ip / nom de serveur
//livechat_test devrait etre bon si vous avez repris mon dump sql
//root par votre username bdd
//le dernier parametre "" par votre mot de passe bdd

$sql = "DELETE FROM data 
WHERE CreatedTime = (
    SELECT CreatedTime
    FROM data
    ORDER BY CreatedTime
    LIMIT 1
);"; //on supprime la video / photo la plus ancienne (celle en cours)

$statement = $bdd->prepare($sql);
$statement->execute();
?>
