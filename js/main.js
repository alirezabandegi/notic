import appHomepage from "./appHomepage.js";
import stickyNoteApp from "./stickynote.js";
import calendarApp from "./calendar.js";
import favoriteApp from "./favorite.js";
import helpApp from "./help.js";
import settingsApp from "./settings.js";

const main = document.querySelector(".main");

let activeApp = null;
const styleHref = document.querySelector("#style");

const buttons = [
  document.querySelector(".appHomepageButton"),
  document.querySelector(".stickyNoteAppButton"),
  document.querySelector(".calendarAppButton"),
  document.querySelector(".favoriteButton"),
  document.querySelector(".helpButton"),
  document.querySelector(".settingsButton")
];

const styleUrl = [
  "style/appHome.css",
  "style/stickyNotes.css",
  "style/calendarApp.css",
  "style/favorite.css",
  "style/help.css",
  "style/settings.css"
];

function styles(index){
  styleHref.href = styleUrl[index];
}

function setToDefault(clickedButton) {
  main.innerHTML = "";
  buttons.forEach(button => {
    button.style.backgroundColor = button === clickedButton ? "#0d4462" : "transparent";
  });
}

function runApp(index, appInstance) {
  if (activeApp !== index) {
    activeApp = index;
    setToDefault(buttons[index]);
    styles(index);
    new appInstance();
  }
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    switch (index) {
        case 0: // appHomepageButton
            runApp(index, appHomepage);
            break;
        case 1: // stickyNoteAppButton
            runApp(index, stickyNoteApp);
            break;
        case 2: // calendarAppButton
            runApp(index, calendarApp);
            break;
        case 3: // favoriteButton
            runApp(index, favoriteApp);
            break;
        case 4: // helpButton
            runApp(index, helpApp);
            break;
        case 5: // settingsButton
            runApp(index, settingsApp); 
            break;
    }
  });
});

buttons[0].style.backgroundColor = "#0d4462";
styles(0);
new appHomepage();