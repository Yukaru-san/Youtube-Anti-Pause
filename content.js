// Variables
var isFocused = true;
var selfPaused = false;
var ytVideo = document.querySelector(".video-stream.html5-main-video");

// Doesn't start script if there was an issue
if (ytVideo !== undefined) {
    initScript();
}

// Focus event handlers 
function onBlur() {
    isFocused = false;
};

function onFocus() {
    isFocused = true;
};

// Initializes the pause blocker
function initScript() {

    // Set the event handlers
    if ( /*@cc_on!@*/ false) { // check for Internet Explorer
        document.onfocusin = onFocus;
        document.onfocusout = onBlur;
    } else {
        window.onfocus = onFocus;
        window.onblur = onBlur;
    }

    // Check if user paused manually
	document.querySelector('.ytp-play-button.ytp-button').addEventListener("click", function() {
       selfPaused = !selfPaused;
    });
	document.querySelector('.video-stream.html5-main-video').addEventListener("click", function() {
       selfPaused = !selfPaused;
    });
	
    // Check for Youtube's Pause every half a second
    setInterval(function() {

        // If Youtube is focussed and paused by the popup
        if (isFocused) {
            let continueDiv =  document.querySelector('div#main.yt-confirm-dialog-renderer');

            if (continueDiv != undefined) {
                let continueBtn = continueDiv.querySelector("tp-yt-paper-button");
                let parentDiv = document.querySelector(".style-scope.ytd-popup-container");

                if (continueBtn != undefined && parentDiv.styles.display != 'none') {
                    continueBtn.click();
                }
            }
        }

        // If Youtube is not focussed and paused by the popup
        if (!isFocused && ytVideo.paused && !selfPaused) {
            ytVideo.play();
        }
    }, 500);
}