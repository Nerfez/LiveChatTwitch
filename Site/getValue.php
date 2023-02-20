<?php
$bdd = new PDO('mysql:host=NomDuServeur;dbname=NomBaseDonnee', "VotreUser", "VotreMDP");

$sql = "SELECT url FROM Image"; //votre requête, ici on a besoin de lire qu'une seule ligne

$stmt = $bdd->prepare($sql);
$stmt->execute();
$row = $stmt->fetchColumn();

echo $row;
?>