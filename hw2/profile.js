function validate() {
	var inputName = document.getElementById("name1").value;
	var inputEmail = document.getElementById("email1").value;
	var inputPhone = document.getElementById("phone1").value;
	var inputZipCode = document.getElementById("zipcode1").value;
	var inputPassword = document.getElementById("password1").value;
	var inputPassConfir = document.getElementById("passconfir1").value;

	var namepattern = /^[A-Za-z\s]+$/;
	var emailpattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
	var phonepattern = /\d{3}[\-]\d{3}[\-]\d{4}$/;
	var zipcodepattern = /\d{5}$/;
	var passwordpattern = /[a-zA-Z][a-zA-Z0-9]{1,20}/;

	if (inputName=="") {
		document.getElementById("nameInfo").innerHTML="Please enter your display name!";
		return false;
	}
	else {
		if (!namepattern.test(inputName)) {
			document.getElementById("nameInfo").innerHTML="Please enter a valid name!";
			return false;
		}
		var orginalName = document.getElementById("name2").innerHTML;
		document.getElementById("name2").innerHTML=inputName;
		document.getElementById("nameInfo").innerHTML="Display name has been updated from " + orginalName + " to " + inputName;
		document.getElementById("name1").value="";
	}

	if (inputEmail=="") {
		document.getElementById("emailInfo").innerHTML="Please enter email address!";
		return false;
	}
	else {
		if (!emailpattern.test(inputEmail)) {
			document.getElementById("emailInfo").innerHTML="Please enter a correct email address!";
			return false;
		}
		var originalEmail = document.getElementById("email2").innerHTML;
		document.getElementById("email2").innerHTML=inputEmail;
		document.getElementById("emailInfo").innerHTML="Email address has been updated from " + originalEmail + " to " + inputEmail;
		document.getElementById("email1").value="";
	}

	if (inputPhone=="") {
		document.getElementById("phoneInfo").innerHTML="Please enter a phone number!";
		return false;
	}
	else {
		if (!phonepattern.test(inputPhone)) {
			document.getElementById("phoneInfo").innerHTML="Please enter a valid phone number!";
			return false;
		}
		var originalPhone = document.getElementById("phone2").innerHTML;
		document.getElementById("phone2").innerHTML=inputPhone;
		document.getElementById("phoneInfo").innerHTML="Phone number has been updated from " + originalPhone + " to " + inputPhone;
		document.getElementById("phone1").value="";
	}

	if (inputZipCode=="") {
		document.getElementById("zipcodeInfo").innerHTML="Please enter zipcode!";
		return false;
	}
	else {
		if (!zipcodepattern.test(inputZipCode)) {
			document.getElementById("zipcodeInfo").innerHTML="Please enter a valid zipcode!";
			return false;
		}
		var originalZipcode = document.getElementById("zipcode2").innerHTML;
		document.getElementById("zipcode2").innerHTML=inputZipCode;
		document.getElementById("zipcodeInfo").innerHTML="Zipcode has been updated from " + originalZipcode + " to " + inputZipCode;
		document.getElementById("zipcode1").value="";
	}

	if (inputPassword=="") {
		document.getElementById("passwordInfo").innerHTML="Please enter your password!";
		return false;
	}
	else {
		if (!passwordpattern.test(inputPassword)) {
			document.getElementById("passwordInfo").innerHTML="Please enter a valid password!";
			document.getElementById("password1").value="";
			return false;
		}
	}

	if (inputPassConfir!=inputPassword) {
		document.getElementById("passwordInfo").innerHTML="Please match your password!";
		document.getElementById("password1").value="";
		document.getElementById("passconfir1").value="";
		return false;
	}

	document.getElementById("passwordInfo").innerHTML="Password has been set!";
	document.getElementById("password1").value="";
	document.getElementById("passconfir1").value="";
	// document.getElementById("updateInfo").style.display = "block";

	return true;
}