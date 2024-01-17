<?php
$bdd = new PDO();
$sql = 'DELETE FROM data LIMIT 1'; //on supprime la video / photo en cours

$statement = $bdd->prepare($sql);
$statement->execute();
?>
