<!DOCTYPE html>
<html lang="fr">
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exemple livechat OBS overlay</title>
	</head>
	<body onload="ChangeImage()">
	<img id="message width="1920" height="1080""
     src="urlduneimage">
	<script>
	const img = document.getElementById("message");
	var urlRecu = "vide.png";
	 function Database(){
	 var ajax = new XMLHttpRequest();
	 var method = "GET";
	 var url = "getValue.php";
	 var asynchronous = true;
	 
	 ajax.open(method, url, asynchronous);
	 ajax.send();
	 ajax.onload = function(){
		console.log("recu : " + this.responseText + " et url : " + urlRecu);
		 if(this.responseText == urlRecu){
		 img.src="vide.png"; //on affiche une image 1920 x 1080 png
		 } 
		 else {
			 console.log("on affiche l'image");
			 urlRecu = this.responseText;
			 img.src=""+urlRecu;
		 }
	 }
 }
 
	function ChangeImage() {
		   
		const interval = setInterval(function() {
			Database();   
 }, 4000); //requête toutes les 4 secondes, c'est aussi la durée d'apparition de l'image
	}
	</script>
	</body>
</html>
