var events = require('events');
var util = require('util');
//Det OlympicGames class to inherit EventEmitter
util.inherits(OlympicGames, events.EventEmitter);

var serverOutput = '';
//--Olympic Games object constructor
function OlympicGames(){
	this.totalNumOfMedals = 0;
	this.isCheater = false;
	this.numOfCheatings = 0;

	//Make an instance of EventEmitter in this class
	events.EventEmitter.call(this);
}


//--OlympicGames Object prototypes
OlympicGames.prototype.giveMedal = function(){
	if(this.isCheater == false){
		this.totalNumOfMedals += 1;
		}
	this.emit("numberOfMedalChanges");
};

OlympicGames.prototype.takeMedal = function(){
	this.isCheater = true;
	if(this.totalNumOfMedals > 0){
		this.totalNumOfMedals -= 1;
		this.numOfCheatings += 1
	}
	this.emit("numberOfMedalChanges");
};

function displayNumOfMedals(){
	serverOutput += "\nYou currently have "+ this.totalNumOfMedals + " medals";
	console.log("\nYou currently have "+ this.totalNumOfMedals + " medals");
}

function displayCheatingStatus(){
	if(this.numOfCheatings == 0){
		serverOutput += "\nCheating status: Hurray! You are not a cheater :)";
		console.log("\nCheating status: Hurray! You are not a cheater :)");
	}
	else{
		serverOutput += "\nCheating status: YOU ARE A CHEATER!!!";
		console.log("\nCheating status: YOU ARE A CHEATER!!!");
	}
}
exports.init = function(){
	//-- Attaching callbacks to events
	var olympicGame = new OlympicGames();
	olympicGame.on("numberOfMedalChanges", displayNumOfMedals);
	olympicGame.on("numberOfMedalChanges", displayCheatingStatus);

	//running some methods
	olympicGame.giveMedal();
	olympicGame.giveMedal();
	olympicGame.takeMedal();

	//return the the same output from console to display it in the server
	return serverOutput;
}