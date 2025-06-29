function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
		var ampm = h >= 12 ? 'pm' : 'am';
		h = h % 12;
  	h = h ? h : 12; // the hour '0' should be '12'
		h = String(checkTime(h)).split('');
    m = String(checkTime(m)).split('');

	// let's clear the old outgoing
	var oldOutgoing = document.querySelectorAll('.outgoing');
	var i;
	for (i = 0; i < oldOutgoing.length; i++) {
			oldOutgoing[i].className = 'number';
	}
	
	// let's get minutes going
	var minutesDizainesOutgoingId = m[0] - 1 === -1 ? 5 : m[0] - 1;
	var minutesDizainesOutgoing = document.getElementById('minutes-dizaines-' + minutesDizainesOutgoingId);
	var minutesDizaines = document.getElementById('minutes-dizaines-' + m[0]);
	
	var minutesUnitesOutgoingId = m[1] - 1 === -1 ? 9 : m[1] - 1;
	var minutesUnitesOutgoing = document.getElementById('minutes-unites-' + minutesUnitesOutgoingId);
	var minutesUnites = document.getElementById('minutes-unites-' + m[1]);
	
	minutesDizaines.className = 'number is-active';
	minutesDizainesOutgoing.className = 'number outgoing';
	minutesUnites.className = 'number is-active';
	minutesUnitesOutgoing.className = 'number outgoing';
	
	// clear outgoing 
	
	// let's get hours going
	var hoursDizainesOutgoingId = h[0] - 1 === -1 ? 1 : h[0] - 1;
	var hoursDizainesOutgoing = document.getElementById('hours-dizaines-' + hoursDizainesOutgoingId);
	var hoursDizaines = document.getElementById('hours-dizaines-' + h[0]);
	
	var hoursUnitesOutgoingId = h[1] - 1 === -1 ? 9 : h[1] - 1;
	var hoursUnitesOutgoing = document.getElementById('hours-unites-' + hoursUnitesOutgoingId);
	var hoursUnites = document.getElementById('hours-unites-' + h[1]);
	
	hoursDizaines.className = 'number is-active';
	hoursDizainesOutgoing.className = 'number outgoing';
	hoursUnites.className = 'number is-active';
	hoursUnitesOutgoing.className = 'number outgoing';
	
	// am pm
	document.getElementById('ampm').innerHTML = '<span>' + ampm + '</span>';
	
	var t = setTimeout(function(){startTime()}, 500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

startTime();

// get the seconds rolling
var today=new Date();
var s=today.getSeconds();
var secondsElement = document.getElementById('seconds');

secondsElement.style.webkitAnimation = 'secondsTick 60s ' + -s + 's infinite linear'; 
// apparently webkiteAnimationDelay doesn't work properly, i'm probably missing something but this seems to fix it
secondsElement.style.webkitAnimationPlayState = 'running';

secondsElement.style.mozAnimationDelay = -s + 's';
secondsElement.style.mozAnimationPlayState = 'running';

secondsElement.style.msAnimationDelay = -s + 's';
secondsElement.style.msAnimationPlayState = 'running';

secondsElement.style.animationDelay = -s + 's';
secondsElement.style.animationPlayState = 'running';

// get the audio player going
var radio = document.createElement("AUDIO");
radio.setAttribute("src","http://blobfolio.com/codepenfiles/atc-flip-clock/390917_AhWilderness.mp3");
radio.setAttribute("id", "radio-player");
radio.setAttribute("loop", "true");
radioBtn = document.getElementById("radio-btn");

radioBtn.addEventListener("click", function(){
	if((' ' + radioBtn.className + ' ').indexOf(' is-active ') > -1){
		radioBtn.className = "btn radio-btn";
		radio.muted = true;
	}
	
	else {
		radioBtn.className = "btn radio-btn is-active";
		radio.play();
		radio.muted = false;
	}
});