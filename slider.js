var index = 0;
var playing = true;

displaySettings()
carousel();

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
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

function previousSlide() {
    var i;
    var slideArray = document.getElementsByClassName("slide");//Gets an array of all slide elements
    
    for (i = 0; i < slideArray.length; i++) {
       slideArray[i].className = 'slide';//Hides all elements from the slide array
    }
    
    index--;//adds one to variable index
    
    if (index < 1) {
        index = slideArray.length;//changes the value of variable index back after reaching the first image of the slideArray
    }
    
    slideArray[index-1].className = 'slide show';//Makes one slide in the slideArray visible
}

function nextSlide() {
    var i;
    var slideArray = document.getElementsByClassName("slide");//Gets an array of all slide elements
    
    for (i = 0; i < slideArray.length; i++) {
       slideArray[i].className = 'slide';//Hides all elements from the slide array
    }
    
    index++;//adds one to variable index
    
    if (index > slideArray.length) {
        index = 1;//changes the value of variable index back after reaching the last image of the slideArray
    }
    
    slideArray[index-1].className = 'slide show';//Makes one slide in the slideArray visible
}

function carousel() {
    var timeout = getCookie("timer");
    
    var i;
    var slideArray = document.getElementsByClassName("slide");//Gets an array of all slide elements
    
    for (i = 0; i < slideArray.length; i++) {
       slideArray[i].className = 'slide';//Hides all elements from the slide array
    }
    
    index++;//adds one to variable index
    
    if (index > slideArray.length) {
        index = 1;//changes the value of variable index back after reaching the last image of the slideArray
    }
    
    slideArray[index-1].className = 'slide show';//Makes one slide in the slideArray visible
    
    if (getCookie("enableAutoPlay") > 0) {
        if (playing == true) {
            /*This is for setting the interval in which the slider changes slides*/
            if (getCookie("timer") > 0) {
                playing = true;
                setTimeout(carousel, timeout);//if a custom interval is submitted it will change the cycle to that time
            }
            else {
                playing = true;
                setTimeout(carousel, 5000);//default value
            }
        }
    }
}

function displaySettings() {
    
    if (getCookie("enableAutoPlay") > 0) {
        document.getElementById("enableAutoPlay").checked = true;
    }
    
    if (getCookie("timer") > 0) {
        document.getElementById("timer").value = getCookie("timer");
    }
    else {
        document.getElementById("timer").value = "5000";
    }
    
    if (getCookie("enableSkipButtons") > 0) {
        document.getElementById("enableSkipButtons").checked = true;
        document.getElementById("controls").innerHTML += "<button onclick='previousSlide()'>Previous</button><button onclick='nextSlide()'>Next</button>";
    }
    
    if (getCookie("enableSkipKeys") > 0) {
        document.getElementById("enableSkipKeys").checked = true;
        document.getElementById("controls").innerHTML += "<p>Skipping by arrow keys enabled</p>";
    }
    
    if (getCookie("enablePause") > 0) {
        document.getElementById("enablePause").checked = true;
        document.getElementById("controls").innerHTML += "<button id='pauseButton' onclick='checkPause()'>Pause</button>";
    }
    
    if (getCookie("fadeDuration") > 0) {
        document.getElementById("fadeDuration").value = getCookie("fadeDuration");
        
        //document.getElementsByClassName("slide").style.webkitTransitionDuration = "opacity 1s";
        //document.getElementsByClassName("slide").style.transitionDuration = "opacity 1s";
        //document.getElementsByClassName("show").style.webkitTransitionDuration = "opacity 1s";
        //document.getElementsByClassName("show").style.transitionDuration = "opacity 1s";
        
    }
    else {
        document.getElementById("fadeDuration").value = "1";
        
        //document.getElementsByClassName("slide").style.webkitTransitionDuration = "opacity 1s";
        //document.getElementsByClassName("slide").style.transitionDuration = "opacity 1s";
        //document.getElementsByClassName("show").style.webkitTransitionDuration = "opacity 1s";
        //document.getElementsByClassName("show").style.transitionDuration = "opacity 1s";
    }
    
    if (document.getElementById("controls").innerHTML == "") {
        document.getElementById("controls").innerHTML = "<p>There are no control options available. You can enable them in the Slider options.</p>"
    }
}

function changeSettings() {
    setCookie("timer", document.getElementById("timer").value, "365");
    setCookie("fadeDuration", document.getElementById("fadeDuration").value, "365");
    
    if (document.getElementById("enableSkipButtons").checked == true) {
        setCookie("enableSkipButtons", document.getElementById("enableSkipButtons").value, "365");
    }
    else {
        setCookie("enableSkipButtons", 0, "365");
    }
    
    if (document.getElementById("enableSkipKeys").checked == true) {
        setCookie("enableSkipKeys", document.getElementById("enableSkipKeys").value, "365");
    }
    else {
        setCookie("enableSkipKeys", 0, "365");
    }
    
    if (document.getElementById("enablePause").checked == true) {
        setCookie("enablePause", document.getElementById("enablePause").value, "365");
    }
    else {
        setCookie("enablePause", 0, "365");
    }
    
    if (document.getElementById("enableAutoPlay").checked == true) {
        setCookie("enableAutoPlay", document.getElementById("enableAutoPlay").value, "365");
    }
    else {
        setCookie("enableAutoPlay", 0, "365");
    }
    
    location.reload();
}

function arrowControls(event) {
    if (getCookie("enableSkipKeys") > 0) {
        var x = event.which;
        if (x == 39) {
            nextSlide();//if right arrow key or D are pressed go to next slide
        }
        if (x == 37) {
            previousSlide();//if left arrow key or A are pressed go to previous slide
        }
    }
}

function pauseSlideshow() {
	document.getElementById("pauseButton").innerHTML = 'Play';
	playing = false;
}

function playSlideshow() {
	document.getElementById("pauseButton").innerHTML = 'Pause';
	playing = true;
}

function checkPause() {
	if(playing == true) {
        pauseSlideshow();
    }
	else{
        playSlideshow();
        carousel();
    }
};

function forceCheckBox() {
    setTimeout(function() {
        document.getElementById("enableFade").checked = false;
    }, 500);
}