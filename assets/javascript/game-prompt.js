function setPromptMsgs(speed, sizes, messages) {
    // First, we add the Prompt Div
    $(`body main`).append(`<div id="game-prompts-div" class="hidden"></div>`);

    // Then, set the Prompt Div Messages
    for (let i = 1; i <= 4; i++) {
        $(`#game-prompts-div`).append(`<p id="prompt-msg-${i}" class="prompt-msgs"></p>`);
        if (sizes[i - 1] != undefined) {
            $(`#prompt-msg-${i}`).addClass(`${sizes[i-1]}Prompt`);
            let convertedMessage = messages[i - 1];
            let htmlTags = convertedMessage.match(/<[^>]*>/gi);
            convertedMessage = convertedMessage.toUpperCase();
            if (htmlTags != undefined) {
                htmlTags.forEach((item, i) => {
                    convertedMessage = convertedMessage.replace(htmlTags[i].toUpperCase(), htmlTags[i]);
                });
            }
            $(`#prompt-msg-${i}`).html(`${convertedMessage}`);
        }
    }

    // Finally, we show the Prompt Div
    setTimeout(() => {
        $("#game-prompts-div").addClass(`${speed}Speed`);
        $("#game-prompts-div").removeClass("hidden");
        $("#game-prompts-div").addClass("show");
    }, 1);
}

function remPromptMsgs(speed) {
    // First, we hide the Prompt Div
    $("#game-prompts-div").removeClass("slowSpeed mediumSpeed quickSpeed");
    $("#game-prompts-div").addClass(`${speed}Speed`);
    $("#game-prompts-div").removeClass("show");
    $("#game-prompts-div").addClass("hidden");

    // Finally, we delete the Prompt Div altogether
    setTimeout(() => {
        $(`#game-prompts-div`).remove();
    }, 1000);
}

function resetHeaderMsgs() {
    $(`#header-msg-1`).html("");
    $(`#header-msg-2`).html("");
    $(`#header-msg-3`).html("");
    $(`#header-msg-4`).html("");
}

function showDiv(div, speed) {
    console.log(`div = ${div}`); 
    console.log(`speed = ${speed}`); 

    $(`#div`).removeClass(`slowSpeed mediumSpeed quickSpeed`);
    $(`#div`).addClass(`${speed}Speed`);
    $(`#div`).removeClass(`hidden`);
    $(`#div`).addClass(`show`);

}