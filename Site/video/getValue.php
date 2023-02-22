<?php
$bdd = new PDO('mysql:host=NomDuServeur;dbname=NomBaseDeDonnee', "UserName", "MotDePasse");

$sql = "SELECT VideoURL FROM Video"; //requete pour l url 

$stmt = $bdd->prepare($sql);
$stmt->execute();
$row = $stmt->fetchColumn();

echo $row;
?>