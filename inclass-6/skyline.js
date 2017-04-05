'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3
	var x0_arr = new Array();
	var height_Arr = new Array();
	var width_Arr = new Array();
	var numOfBuilding = 0;
	var updateTimer = setInterval(updateInfo, 300);
	var sunpos = 0;
	var carpos = 10;

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		x0_arr[numOfBuilding] = x0;
		height_Arr[numOfBuilding] = blgHeight;
		width_Arr[numOfBuilding] = blgWidth;
		numOfBuilding++;

		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"
		var count = 0
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				if (count % 3 == 0) {
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight);
				}	
				count++;
			}
		}
	}

	function drawsun(xpos) {
		c.beginPath();
		c.arc(xpos, 80, 30, 0, 2*Math.PI);
		c.fillStyle="#ff6600";
		c.closePath();
		c.fill();
	}

	function drawcar(xpos) {
		c.fillStyle='#669999';
		c.fillRect(xpos, floor - 20, 30, 20);
		c.fillStyle='#ff3300';
		c.fillRect(xpos + 5, floor - 30, 20, 10);
	}

	function updateInfo() {
		c.fillStyle="white"
		c.fillRect(0, 0, canvas.width, floor)
		drawsun(sunpos);
		drawcar(carpos);
		sunpos = (sunpos + 3) % canvas.width;
		carpos = (carpos + 20) % canvas.width;
		for (var i = 0; i < numOfBuilding; i++) {
			c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
			c.fillRect(x0_arr[i], floor - height_Arr[i], width_Arr[i], height_Arr[i])
			c.fillStyle="yellow"
			var count = 0
			for (var y = floor - floorSpacing; y > floor - height_Arr[i]; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < width_Arr[i] - windowWidth; x += windowSpacing + windowWidth) {
					if (count % 3 == 0) {
						c.fillRect(x0_arr[i] + x, y - windowHeight, windowWidth, windowHeight);
					}	
					count++;
				}
			}
		}
	}

	var currCanvas = document.getElementById('currcanvas');
	var currdiv = document.getElementById('mydiv');
	currCanvas.addEventListener('click', findPosition);
	function findPosition(event) {
		var x = event.x;
		var y = event.y;
		var posY1 = currdiv.offsetTop;
		var posY2 = currCanvas.offsetTop;
		y = y - posY1 - posY2;
		var posX1 = currdiv.offsetLeft;
		var posX2 = currCanvas.offsetLeft;
		x = x - posX1 - posX2;
		for (var i = 0; i < numOfBuilding; i++) {
			if (x > x0_arr[i] && x < x0_arr[i] + width_Arr[i] && y > floor - height_Arr[i] && y < floor) {
				height_Arr[i] += 30;
			}
		}
	}

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}

