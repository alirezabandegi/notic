import stickyNoteApp from "./stickynote.js";

const stickyNoteAppButton = document.querySelector(".stickyNoteAppButton");

let stickyAppRunning = false;
stickyNoteAppButton.addEventListener("click", () => {
    if(!stickyAppRunning){
        stickyAppRunning = true;
        stickyNoteAppButton.style.backgroundColor = "#0d4462";
        new stickyNoteApp();
    }
})