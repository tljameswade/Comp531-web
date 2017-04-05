function loadImg() {

	var base1 = 1;
	var mark1 = base1;
	function changeImage1() {
		var currImage = document.getElementById("yw1");
		base1 = (base1 + 9) % 27;
		currImage.src = "yw" + base1 + ".jpg";
	}

	var imageChange1 = setInterval(changeImage1, Math.random() * 4000 + 1000);

	document.getElementById("button1").onclick = function() {
		if (button1.value == "Stop") {
			button1.value = "Start";
			mark1 = base1;
			clearInterval(imageChange1);
		}
		else {
			button1.value = "Stop";
			base1 = mark1;
			imageChange1 = setInterval(changeImage1, Math.random() * 4000 + 1000);
		}
	}

	var base2 = 2;
	var mark2 = base2;
	function changeImage2() {
		var currImage = document.getElementById("yw2");
		base2 = (base2 + 9) % 27;
		currImage.src = "yw" + base2 + ".jpg";
	}

	var imageChange2 = setInterval(changeImage2, Math.random() * 4000 + 1000);

	document.getElementById("button2").onclick = function() {
		if (button2.value == "Stop") {
			button2.value = "Start";
			mark2 = base2;
			clearInterval(imageChange2);
		}
		else {
			button2.value = "Stop";
			base2 = mark2;
			imageChange2 = setInterval(changeImage2, Math.random() * 4000 + 1000);
		}
	}

	var base3 = 3;
	var mark3 = base3;
	function changeImage3() {
		var currImage = document.getElementById("yw3");
		base3 = (base3 + 9) % 27;
		currImage.src = "yw" + base3 + ".jpg";		
	}

	var imageChange3 = setInterval(changeImage3, Math.random() * 4000 + 1000);

	document.getElementById("button3").onclick = function() {
		if (button3.value == "Stop") {
			button3.value = "Start";
			mark3 = base3;
			clearInterval(imageChange3);
		}
		else {
			button3.value = "Stop";
			base3 = mark3;
			imageChange1 = setInterval(changeImage3, Math.random() * 4000 + 1000);
		}
	}

	var base4 = 4;
	var mark4 = base4;
	function changeImage4() {
		var currImage = document.getElementById("yw4");
		base4 = (base4 + 9) % 27;
		currImage.src = "yw" + base4 + ".jpg";
	}

	var imageChange4 = setInterval(changeImage4, Math.random() * 4000 + 1000);

	document.getElementById("button4").onclick = function() {
		if (button4.value == "Stop") {
			button4.value = "Start";
			mark4 = base4;
			clearInterval(imageChange4);
		}
		else {
			button4.value = "Stop";
			base4 = mark4;
			imageChange4 = setInterval(changeImage4, Math.random() * 4000 + 1000);
		}
	}

	var base5 = 5;
	var mark5 = base5;
	function changeImage5() {
		var currImage = document.getElementById("yw5");
		base5 = (base5 + 9) % 27;
		currImage.src = "yw" + base5 + ".jpg";	
	}

	var imageChange5 = setInterval(changeImage5, Math.random() * 4000 + 1000);

	document.getElementById("button5").onclick = function() {
		if (button5.value == "Stop") {
			button5.value = "Start";
			mark5 = base5;
			clearInterval(imageChange5);
		}
		else {
			button5.value = "Stop";
			base5 = mark5;
			imageChange5 = setInterval(changeImage5, Math.random() * 4000 + 1000);
		}
	}

	var base6 = 6;
	var mark6 = base6;
	function changeImage6() {
		var currImage = document.getElementById("yw6");
		base6 = (base6 + 9) % 27;
		currImage.src = "yw" + base6 + ".jpg";
	}

	var imageChange6 = setInterval(changeImage6, Math.random() * 4000 + 1000);

	document.getElementById("button6").onclick = function() {
		if (button6.value == "Stop") {
			button6.value = "Start";
			mark6 = base6;
			clearInterval(imageChange6);
		}
		else {
			button6.value = "Stop";
			base6 = mark6;
			imageChange6 = setInterval(changeImage6, Math.random() * 4000 + 1000);
		}
	}

	var base7 = 7;
	var mark7 = base7;
	function changeImage7() {
		var currImage = document.getElementById("yw7");
		base7 = (base7 + 9) % 27;
		currImage.src = "yw" + base7 + ".jpg";
	}

	var imageChange7 = setInterval(changeImage7, Math.random() * 4000 + 1000);

	document.getElementById("button7").onclick = function() {
		if (button7.value == "Stop") {
			button7.value = "Start";
			mark7 = base7;
			clearInterval(imageChange7);
		}
		else {
			button7.value = "Stop";
			base7 = mark7;
			imageChange5 = setInterval(changeImage7, Math.random() * 4000 + 1000);
		}
	}

	var base8 = 8;
	var mark8 = base8;
	function changeImage8() {
		var currImage = document.getElementById("yw8");
		base8 = (base8 + 9) % 27;
		currImage.src = "yw" + base8 + ".jpg";
	}

	var imageChange8 = setInterval(changeImage8, Math.random() * 4000 + 1000);

	document.getElementById("button8").onclick = function() {
		if (button8.value == "Stop") {
			button8.value = "Start";
			mark8 = base8;
			clearInterval(imageChange8);
		}
		else {
			button8.value = "Stop";
			base8 = mark8;
			imageChange8 = setInterval(changeImage8, Math.random() * 4000 + 1000);
		}
	}

	var base9 = 9;
	var mark9 = base9;
	function changeImage9() {
		var currImage = document.getElementById("yw9");
		base9 = (base9 + 9) % 27;
		if (base9 == 0) {base9 = 27;}
		currImage.src = "yw" + base9 + ".jpg";
	}

	var imageChange9 = setInterval(changeImage9, Math.random() * 4000 + 1000);

	document.getElementById("button9").onclick = function() {
		if (button9.value == "Stop") {
			button9.value = "Start";
			mark9 = base9;
			clearInterval(imageChange9);
		}
		else {
			button9.value = "Stop";
			base9 = mark9;
			imageChange9 = setInterval(changeImage9, Math.random() * 4000 + 1000);
		}
	}

}