var button = document.getElementById("clickbutton");
var wonstatus = document.getElementById("congrats");
var mark = false;

window.addEventListener("keyup", addListener);
function addListener() {
	if (!mark) {
		button.addEventListener("mouseover", moveaway);
	}	
}

window.addEventListener("keydown", removeListener);
function removeListener() {
    if (event.shiftKey) {
        button.removeEventListener("mouseover", moveaway);
    }
}

button.addEventListener("mouseover", moveaway);
function clickme(){
	if (!mark){
		button.innerHTML="Play again";
		wonstatus.style.display="block";
		button.removeEventListener("mouseover", moveaway);
		mark = true;
	}
	else {
		button.innerHTML="Click Me";
		wonstatus.style.display="none";
		mark = false;
		button.addEventListener("mouseover", moveaway);
	}
}
function moveaway() {
	button.style.left = Math.random() * (window.innerWidth - 50) + "px";
	button.style.top = Math.random() * (window.innerHeight - 50) + "px";
}




