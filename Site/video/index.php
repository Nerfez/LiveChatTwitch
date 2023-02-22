<!DOCTYPE html>
<html lang="fr">
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exemple livechat OBS overlay</title>
	<link rel="stylesheet" href="style.css">
	</head>
	<body onload="ChangeVideo()">
	<video muted id="video" src="urlMP4">
	</video>
	<input id="btnMute" type="button" value="Unmute">
	<script>
	const video = document.getElementById("video");
	var btn = document.querySelector('input');
	var urlRecu = "urlMP4";
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
		 video.src="";
		 document.getElementById("btnMute").style.display = "none";
		 } 
		 else {
			 console.log("on affiche la vidéo");
			 urlRecu = this.responseText;
			 video.src=""+urlRecu;
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
 }, 7000);
	}
	</script>
	</body>
</html>