<!DOCTYPE html>
<html lang="fr">
<?php
$host = 'ServeurBdd';
$database = 'NomDataBase';
$username = 'NomUtilisateurPourBdd';
$password = 'MotDePasse';

?>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exemple livechat OBS overlay</title>
	<link rel="stylesheet" href="style.css">
</head>

<body onload="ChangeVideo()">
	<h1 id="texteVid">SALUT A TOUS</h1>
	<video muted id="video" src="https://cdn.discordapp.com/attachments/1076908168132694048/1077597865058242600/srdfgsdehuderhj.mp4">
	</video>
	<input id="btnMute" type="button" value="Unmute">
	<script>
		const video = document.getElementById("video");
		var btn = document.querySelector('input');
		var texteVideo = "";
		var time = 20000;
		var urlRecu = "https://cdn.discordapp.com/attachments/1076908168132694048/1077597865058242600/srdfgsdehuderhj.mp4";
		
		function Database() {
			var ajax = new XMLHttpRequest();
			var method = "GET";
			var url = "getValue.php";
			var asynchronous = true;

			ajax.open(method, url, asynchronous);
			ajax.send();
			ajax.onload = function() {
				if (this.responseText != urlRecu) {
					urlRecu = this.responseText;
					video.src = "" + urlRecu;
					video.load();
					video.play();

					setTimeout(
						function() {
							document.getElementById("btnMute").style.display = "block";
							clickButton();
						}, 1000);
				}
			}
		}

		function Clear() {
			console.log("clear");
			video.src = "";
			document.getElementById("texteVid").textContent = "";
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
				if (this.responseText != texteVideo) {
					texteVideo = this.responseText;
					document.getElementById("texteVid").textContent = texteVideo;
				}
			}
		}

		btn.addEventListener("click", function() {
			document.getElementById("btnMute").style.display = "none";
			video.muted = !video.muted;
			video.volume = 0.1;
			video.play();
		});

		// Simulate click function
		function clickButton() {
			btn.click();
		}


		function ChangeVideo() {

			const interval = setInterval(function() {
				Time();
				Database();
				AfficherTexte();
			}, 7000); //Délai de scrutation pour chaque video
		}
	</script>
</body>

</html>
