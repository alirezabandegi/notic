import appHomepage from "./appHomepage.js";
import stickyNoteApp from "./stickynote.js";
import calendarApp from "./calendar.js";
import favoriteApp from "./favorite.js";
import helpApp from "./help.js";
import settingsApp from "./settings.js";

const styleHref = document.querySelector("#style");
const main = document.querySelector(".main");

const runApp = () => {
  let activeApp = null;
  
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
      new appInstance(main);
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
  new appHomepage(main);
}

const signUpHtmlContent = () => {
  return `
  <h1>Sign Up</h1>
  <form id="signUpForm">
    <input type="text" id="name" name="name" placeholder="Name" required>
    <input type="email" id="email" name="email" placeholder="Email" required>
    <input type="tel" id="phone" name="phone" placeholder="Phone Number(Not required)">
    <input type="password" id="password" name="password" placeholder="Password" required>
    
    <button type="submit">Sign Up</button>
  </form>
  `;
}

const checkUserRegesteration = () => {
  const userInformation = JSON.parse(localStorage.getItem("personalInformation"));
  if (userInformation === null) {
    styleHref.href = "style/signUp.css";
    main.innerHTML = signUpHtmlContent();

    document.querySelector("#signUpForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const password = document.querySelector("#password");
      const formInputNames = ["name", "email", "phone"];
      let informations = {};

      const getFormInputValue = (value) => document.querySelector(value);

      if(password.value.length >= 8){
        formInputNames.forEach((inputName) => {
          informations[inputName] = getFormInputValue(`#${inputName}`).value.trim().toLowerCase();
        });
        informations["password"] = password.value;

        localStorage.setItem("personalInformation", JSON.stringify(informations));

        runApp();
      }
      else{
        alert("password must be at least 8 characters.");
      }
    });
  }
  else {
    runApp();
  }
}

window.onload = function () {
  const profilePictureStorage = localStorage.getItem("profilePicture");
  const profilePic = document.querySelector(".profilePic");

  profilePictureStorage === null
  ? profilePic.src = "files/profile.webp"
  : profilePic.src = profilePictureStorage;

  checkUserRegesteration();
};