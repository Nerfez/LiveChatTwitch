<!DOCTYPE html>
<html lang="fr">
<?php
$host = 'mysql-NomServeur';
$database = 'NomDatabase';
$username = 'NomUtilisateur';
$password = 'MotDePasse';

?>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style.css">
	<title>Exemple livechat OBS overlay</title>
</head>

<body onload="ChangeImage()">
	<h1 id="texteIm">SALUT A TOUS</h1>
	<img id="message" width="1920" height="1080" src=" https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png">
	<script>
		var texteImage = "";
		var time = 20000;
		const img = document.getElementById("message");
		var urlRecu = "https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png";

		function Database() {
			var ajax = new XMLHttpRequest();
			var method = "GET";
			var url = "getValue.php";
			var asynchronous = true;

			ajax.open(method, url, asynchronous);
			ajax.send();
			ajax.onload = function() {
				console.log("recu : " + this.responseText + " et url : " + urlRecu);
				if (this.responseText != urlRecu) {
					urlRecu = this.responseText;
					img.src = "" + urlRecu;
				}
			}
		}

		function Clear() {
			console.log("clear");
			img.src = "https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png";
			document.getElementById("texteIm").textContent = "";
			document.getElementById("btnMute").style.display = "none";
		}

		function Time() {
			var ajax = new XMLHttpRequest();
			var method = "GET";
			var url = "getValueTime.php";
			var asynchronous = true;

			ajax.open(method, url, asynchronous);
			ajax.send();
			ajax.onload = function() {
				if (this.responseText != time) {
					time = this.responseText;
					setTimeout(
						function() {
							Clear();
						}, time);
				}
			}
		}

		function AfficherTexte() {
			var ajax = new XMLHttpRequest();
			var method = "GET";
			var url = "getValueText.php";
			var asynchronous = true;

			ajax.open(method, url, asynchronous);
			ajax.send();
			ajax.onload = function() {
				if (this.responseText != texteImage) {
					texteImage = this.responseText;
					document.getElementById("texteIm").textContent = texteImage;
				}
			}
		}

		function ChangeImage() {

			const interval = setInterval(function() {
				AfficherTexte();
				Database();
				Time();
			}, 7000);
		}
	</script>
</body>

</html>
