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
	var urlImage = "MettezLeMemeUrlQueVotreImageAffichee";
	 function Database(){
	 var ajax = new XMLHttpRequest();
	 var method = "GET";
	 var url = "getValue.php";
	 var asynchronous = true;
	 
	 ajax.open(method, url, asynchronous);
	 ajax.send();
	 ajax.onload = function(){
		console.log("recu : " + this.responseText + " et url : " + urlImage);
		 if(this.responseText == urlImage){
		 
		 } else {
				 document.getElementById("video").src=""
			 urlImage = this.responseText;
        setTimeout(function () {document.getElementById("message").src=""+urlImage;
			 }, 5000);
		 }
	 }
 }
 
	function ChangeImage() {
		   
		const interval = setInterval(function() {
			Database();
   document.getElementById("message").src="";
 }, 1000);
	}
	</script>
	</body>
</html>