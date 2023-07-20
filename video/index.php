<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>LiveChat Video - Zefren</title>
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
		var height = 1080;
		var width = 1920;
		var urlRecu = "https://cdn.discordapp.com/attachments/1076908168132694048/1077597865058242600/srdfgsdehuderhj.mp4";
		
		function Database() {
			var ajax = new XMLHttpRequest();
			var method = "GET";
			var url = "getValue.php";
			var asynchronous = true;

			ajax.open(method, url, asynchronous);
			ajax.send();
			ajax.onload = function() {
				let messageRecu = this.responseText.split("$");
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
					video.src = "" + urlRecu;
					video.load();
					video.play();

					setTimeout(
						function() {
							document.getElementById("btnMute").style.display = "block";
							clickButton();
						}, 1000);
				}
				if (messageRecu[4] != texteVideo) {
					texteVideo = messageRecu[4];
					document.getElementById("texteVid").textContent = texteVideo;
				}
			}
		}

		function Clear() {
			console.log("clear");
			video.src = "";
			document.getElementById("texteVid").textContent = "";
			document.getElementById("btnMute").style.display = "none";
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
				Database();
			}, 7000); //Délai de scrutation pour chaque video
		}
	</script>
</body>

</html>
