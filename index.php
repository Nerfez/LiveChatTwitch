<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="style.css">
	<title>LiveChat Image - Zefren</title>
</head>

<body onload="ChangeImage()">
	<h1 id="texteIm">SALUT A TOUS</h1>
	<img id="message" width="1920" height="1080" src=" https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png">
	<script>
		var texteImage = "";
		var time = 20000;
		var width = 1920;
		var height = 1080;
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
				let messageRecu = this.responseText.split("$");
				console.log("message:",messageRecu);
				if (messageRecu[0] != time) {
					time = messageRecu[0];
					setTimeout(
						function() {
							Clear();
						}, time);
				}

				if (messageRecu[1] != width) {
					width = messageRecu[1];
					img.width = width;
				}

				if (messageRecu[2] != height) {
					height = messageRecu[2];
					img.height = height;
				}

				if (messageRecu[3] != urlRecu) {
					urlRecu = messageRecu[3];
					img.src = "" + urlRecu;
				}
				
				if (messageRecu[4] != texteImage) {
					texteImage = messageRecu[4];
					document.getElementById("texteIm").textContent = texteImage;
				}
			}//FIN FONCTION AJAX
		}

		function Clear() {
			console.log("clear");
			img.src = "https://cdn.discordapp.com/attachments/1076908168132694048/1077592007175831562/vide.png";
			img.width = 1920;
			img.height = 1080;
			document.getElementById("texteIm").textContent = "";
			document.getElementById("btnMute").style.display = "none";
		}

		function ChangeImage() {

			const interval = setInterval(function() {
				Database();
			}, 7000);
		}
	</script>
</body>

</html>
