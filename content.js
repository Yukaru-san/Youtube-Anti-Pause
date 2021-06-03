// Variables
var isFocused = true;
var selfPaused = false;
var ytVideo = $(".video-stream.html5-main-video")[0];

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
    $('.ytp-play-button.ytp-button, .video-stream.html5-main-video').on("click", function() {
        selfPaused = !selfPaused;
    });

    // Check for Youtube's Pause every half a second
    setInterval(function() {

        // If Youtube is focussed and paused by the popup
        if (isFocused) {
            let continueDiv = $("div#main.yt-confirm-dialog-renderer");

            if (continueDiv.length > 0) {
                let continueBtn = continueDiv.find("tp-yt-paper-button");
                let parentDiv = $(".style-scope.ytd-popup-container");

                if (continueBtn.length > 0 && parentDiv.css('display') != 'none') {
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