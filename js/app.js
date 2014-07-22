var numRand = 0;
var counter = 0;
var cold = [];
var hot = [];
var prevdiff = 101;

//1. function to generate a random number
function randnum() {
    numRand = Math.floor((Math.random() * 100) + 1); 
}


//2.  pick a random number once page loads
$(document).ready(randnum);

$("#submit").click(function() {
	var guess = $("input").val();

	//validation
	if (isNaN(guess)){
		alert("must input numbers");
		return false;
	}

	if (guess < 1 || guess > 100){
		alert("guess must be between 1 and 100")
		return false;
	}


	// check if the guess has been made before
	if (($.inArray(guess, hot) > -1) || ($.inArray(guess, cold) > -1)){
		$("#hints span").text("You already guessed this!");
	 	return false;
	}


	//calculate difference between guess and actual number
	var diff = Math.abs(guess - numRand);
	

	//check if you've exceeded the number of guesses
	counter++;

	if (counter > 10){
		$("#hints span").text("Out of guesses buddy. Game over");
		return false;
	}


	//first guess
	if (prevdiff == 101){
		if (diff > 50){
			cold.push(guess);

			if (guess < numRand)
				$("#hints span").text("COLD! Guess higher");
			else 
				$("#hints span").text("COLD! Guess lower");
			$("#cold").append("<br><span>").append(guess).append("</span>");
		}

		if (diff < 50 && diff > 0){
			hot.push(guess);

			if (guess < numRand)
				$("#hints span").text("HOT! Guess higher");
			else 
				$("#hints span").text("HOT! Guess lower");
			$("#hot").append("<br><span>").append(guess).append("</span>");
		}

		prevdiff = diff;
		return false;
	}

	//not the first guess
	if (prevdiff != 101){
		
		//still far away from actual number = COLD
		if (diff > 50){
			cold.push(guess);

			//closer guess than before
			if (diff < prevdiff){
				if (guess < numRand)
					$("#hints span").text("HOTTER! but still cold.  Guess higher.");
				else 
					$("#hints span").text("HOTTER! but still cold.  Guess lower.");
			}
			
			//farther guess than before
			else{
				if (guess < numRand)
					$("#hints span").text("COLDER! Guess higher.")
				else
					$("#hints span").text("COLDER! Guess lower.")
			}
			$("#cold").append("<br><span>").append(guess).append("</span>");
		}

		if (diff < 50 && diff > 0){
			hot.push(guess);

			//closer guess than before
			if (diff < prevdiff){
				if (guess < numRand)
					$("#hints span").text("HOTTER! Guess higher.");
				else 
					$("#hints span").text("HOTTER! Guess lower.");
			}
			
			//farther guess than before
			else{
				if (guess < numRand)
					$("#hints span").text("COLDER! but still HOT.  Guess higher.")
				else
					$("#hints span").text("COLDER! but still HOT.  Guess lower.")
			}

			$("#hot").append("<br><span>").append(guess).append("</span>");
		}

		prevdiff = diff;
	}

	//if the guess is correct
	if (diff == 0){
		$("#hints span").text("You got it!  I'm very proud of you.");
		document.body.style.background = "orange";
	}


});


//if play again button is clicked
$('#again').click(function() {
    location.reload();
	$("#num").value= "";
});


//if hint button is clicked
$('#hint').click(function() {
    $("#hints span").text("The answer is: " + numRand);
});

