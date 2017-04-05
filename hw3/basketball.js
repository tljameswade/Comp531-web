
var myring = new Image();
myring.src="ring.jpg";
var ballimg = new Image();
ballimg.src = 'ball.png';
var level = 1;
var targetscore = 1;
var score = 0;
var accuracy = 0;
var shootcount = 0;
var totalscore = 0;
var initX = 500;
var initY = 250;
var gravity = -0.2;
var background = new Image();
background.src = 'background.png';
var leftbound = 300;
var topbound = 80;
var shootregion = new Image();
shootregion.src = 'shootregion.jpg';
var ringX = 840;
var ringY = 176;
var curryimg = new Image();
curryimg.src = 'curry.jpg';

// Function to set the cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get the cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
    return "";
}

//The function to start the game
function initgame() {
	canvas = document.querySelector("canvas");
	// Hide the start game button
	document.getElementById("startgame").style = "display:none";
	document.getElementById("playagain").style = "display: none";
	document.getElementById("nextlevel").style = "display: none";
	document.getElementById("congrats").style = "display: none";
	document.getElementById("bestacc").style = "display: none";
	document.getElementById("youracc").style = "display: none";
	var c = canvas.getContext("2d");
	var mycanvas = document.getElementById("currcanvas");
	var leftOffset = mycanvas.offsetLeft;
	var topOffset = mycanvas.offsetTop;

	// The new ball object
	var ball = new basketball(initX, initY, gravity);
	var ballradius = 10;
	score = 0;
	document.getElementById("score").innerHTML = score;

	// Different levels corresponds to different target score to pass this level
	if (level == 1) {
		targetscore = 1;
	}
	else if (level == 2) {
		targetscore = 3;
	}
	else {
		targetscore = 5;
	}

	document.getElementById("currlevel").innerHTML = level;
	document.getElementById("targetscore").innerHTML = targetscore;

	// The highest score in a single game
	var recordscore = getCookie("maxscore");

	if (recordscore == "" || recordscore == 0) {
		document.getElementById("record").innerHTML = 0;
	}
	else {
		document.getElementById("record").innerHTML = recordscore;
	}

	// The highest accuracy ever
	var bestacc = getCookie("bestaccuracy");

	// Draw the ground
	var ground = canvas.height/2;
	var colorgrad = c.createLinearGradient(0, ground, 0, canvas.height);
	colorgrad.addColorStop(0, "black");
	colorgrad.addColorStop(1, "white");
	c.fillStyle = colorgrad;
	c.fillRect(0, ground, canvas.width, canvas.height);

	// Create a basketball object
	function basketball(x, y, gravity) {
		this.x = x;
		this.y = y;
		this.preX = 0;
		this.preY = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.gravity = gravity;

		this.drawball = function() {
			c.drawImage(ballimg, this.x, this.y, 20, 20);
		}

		this.updatepos = function() {
			this.speedY += this.gravity;
			this.preX = this.x;
			this.preY = this.y;
			this.y -= this.speedY;
			this.x += this.speedX;
		}
	}

	// Set the timer
	var timer = setInterval(countdown, 1000);
	var timeremain = 40000;
	function countdown() {
		document.getElementById("time").innerHTML = timeremain / 1000;
		timeremain = timeremain - 1000;

		if (timeremain < 0) {
			resetgame();
		}
	}

	// Function to restart the game
	function resetgame() {

		var accoutput1;
		var accoutput2;

		// Update the cookie if we have new highest score
		if (recordscore == "" || score > recordscore) {
			setCookie("maxscore", score, 30);
		}
		clearInterval(timer);
		if (score < targetscore) {
			document.getElementById("playagain").style = "display: block";
			accuracy = totalscore / shootcount;
			totalscore = 0;
			shootcount = 0;
			level = 1;
			// Update the best accuracy and set the cookie when a game finishes
			if (bestacc == "" || accuracy > bestacc) {
				setCookie("bestaccuracy", accuracy, 30);
				accoutput1 = Number(accuracy).toFixed(2) * 100 + "%";
				console.log(document.getElementById("bestacc"));
				document.getElementById("bestacc").style = "display: block";
				document.getElementById("youracc").style = "display: block";
				document.getElementById("accuracy1").innerHTML = accoutput1;
				document.getElementById("accuracy2").innerHTML = accoutput1;
			}
			// Do not update the best accuracy
			else {
				accoutput1 = Number(bestacc).toFixed(2) * 100 + "%";
				accoutput2 = Number(accuracy).toFixed(2) * 100 + "%";
				document.getElementById("bestacc").style = "display: block";
				document.getElementById("youracc").style = "display: block";
				document.getElementById("accuracy1").innerHTML = accoutput1;
				document.getElementById("accuracy2").innerHTML = accoutput2;
			}
		}
		else if (level < 3) {
			document.getElementById("nextlevel").style = "display: block";
			level++;
		}
		else {
			c.clearRect(0, 0, canvas.width, canvas.height / 2);
			// The player has passed all levels
			document.getElementById("congrats").style = "display: block";
			document.getElementById("playagain").style = "display: block";
			accuracy = totalscore / shootcount;
			totalscore = 0;
			shootcount = 0;
			level = 1;
			// Update the accuracy
			if (bestacc == "" || accuracy > bestacc) {
				console.log(document.getElementById("bestacc"));
				setCookie("bestaccuracy", accuracy, 30);
				accoutput1 = accuracy.toFixed(2) * 100 + "%";
				document.getElementById("bestacc").style = "display: block";
				document.getElementById("youracc").style = "display: block";
				document.getElementById("accuracy1").innerHTML = accoutput1;
				document.getElementById("accuracy2").innerHTML = accoutput1;
			}

			// Do not update the accuracy
			else {
				accoutput1 = Number(bestacc).toFixed(2) * 100 + "%";
				accoutput2 = accuracy.toFixed(2) * 100 + "%";
				document.getElementById("bestacc").style = "display: block";
				document.getElementById("youracc").style = "display: block";
				document.getElementById("accuracy1").innerHTML = accoutput1;
				document.getElementById("accuracy2").innerHTML = accoutput2;
			}
		}
	}

	// Function to initiate shooting the ball
	function shootball() {
		if (timeremain < 0) {
			return;
		}
		mycanvas.addEventListener('click', getInitspeed);
		var y1 = 0;
		var y2 = 0;
		var moveball;
		
		// Draw the background
		c.drawImage(background, leftbound, 60, 1000 - leftbound, canvas.height / 2 - 60);

		// Draw the rim
		c.drawImage(myring, ringX, ringY, 45, 40);
		
		// Draw the ball
		ball.drawball();

		// Draw the shoot region
		c.drawImage(shootregion, leftbound, ball.y, ball.x - leftbound, canvas.height / 2 - ball.y);

		// Draw the figure (Stephen Curry) to shoot the ball
		c.drawImage(curryimg, ball.x - 30, ball.y, 30, canvas.height / 2 - ball.y);
		// drawshootregion(ball.x, ball.y);

		// Calculate the initiative speed based on the clicking position
		function getInitspeed(event) {
			var x = event.x - leftOffset;
			var y = event.y - topOffset;

			// Determine whether the click event is in the shoot region
			if (x >= leftbound && x <= ball.x && y >= ball.y && y <= canvas.height / 2) {
				ball.speedX = 0;
				ball.speedY = 0;
				ball.speedX = (ball.x - x) / 8;
				ball.speedY = (y - ball.y) / 8;
				shootcount++;
				moveball = setInterval(ballMove, 25);
			}		
		}

		//move the ball to the original position when one shooting movement finishes
		function resetball() {
			ball.speedX = 0;
			ball.speedY = 0;
			ball.x = Math.random() * (900 - leftbound - 200) + leftbound + 100;
			ball.y = Math.random() * (topOffset + canvas.height / 2 - topbound - 150) + topbound + 50;
			clearInterval(moveball);
			c.clearRect(0, 0, canvas.width, canvas.height / 2);
			c.drawImage(background, leftbound, 60, 1000 - leftbound, canvas.height / 2 - 60);
			c.drawImage(myring, ringX, ringY, 45, 40);			
			ball.drawball();
			c.drawImage(shootregion, leftbound, ball.y, ball.x - leftbound, canvas.height / 2 - ball.y);
			c.drawImage(curryimg, ball.x - 30, ball.y, 30, canvas.height / 2 - ball.y);
			mycanvas.addEventListener('click', getInitspeed);
		}

		// Update the position of the ball and determine whether to reset the ball depending on
		// whether the ball is out of bounds or the player has scored
		function ballMove() {
			// determine whether the ball will go through the rim and score
			if (timeremain < 0) {
				resetball();
				return;
			}
			if (ball.preX < ringX + ballradius - 8 && ball.x > ringX + ballradius - 8) {
				y1 = ball.y;
			}
			if (ball.preX < ringX + 45 - ballradius && ball.x > ringX + 45 - ballradius) {
				y2 = ball.preY;
			}

			// The ball goes through the rim and we update the score by 1
			if (y1 < ringY && y2 > ringY) {
				score = score + 1;
				totalscore++;
				y1 = 0;
				y2 = 0;
				document.getElementById("score").innerHTML = score;
				resetball();
				return;
			}			

			// The ball does not goes through the rim and before it goes out of bounds we are 
			// going to reset the position of the ball to its original position
			if (ball.x >= canvas.width + leftOffset - 20 || ball.x <= leftOffset + 20 || ball.y >= canvas.height / 2 + topOffset - 30 
				|| ball.y <= topOffset + 5) {
				resetball();
				return;
			}
			c.clearRect(0, 0, canvas.width, canvas.height / 2);
			c.drawImage(background, leftbound, 60, 1000 - leftbound, canvas.height / 2 - 60);
			c.drawImage(myring, ringX, ringY, 45, 40);			
			ball.drawball();
			ball.updatepos();
			mycanvas.removeEventListener('click', getInitspeed);
		}
	}

	shootball();
}