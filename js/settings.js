export default class settingsApp{
    constructor(main){
        this.main = main;
        this.main.innerHTML = settingsApp.htmlContent();

        this.settingsButtons = [
            document.querySelector(".personalSettings"),
            document.querySelector(".profilePicture"),
            document.querySelector(".storage")
        ];

        this.content = document.querySelector(".content");
        
        this.settingsButtons[0].addEventListener("click", () => this.personalSettings());

    }
    personalSettings(){
        this.content.innerHTML = settingsApp.personalSettingsContent();
        
        const personalInformation = JSON.parse(localStorage.getItem("personalInformation"));
        const formInputNames = ["name", "email", "phone"];
        const getFormInputValue = (value) => document.querySelector(value);
        
        formInputNames.forEach((inputName) => {
            getFormInputValue(`#${inputName}`).value = personalInformation[inputName];
        });

        document.querySelector("#myform").addEventListener("submit", (event) => {
            event.preventDefault();
            let informations = {};

            formInputNames.forEach((inputName) => {
                informations[inputName] = getFormInputValue(`#${inputName}`).value.trim().toLowerCase();
            });
            informations["password"] = personalInformation.password;

            localStorage.setItem("personalInformation", JSON.stringify(informations));
        });
    }

    static personalSettingsContent(){
        return `
        <form id="myform">
            <label for="name">Name:<span>*</span></label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email Address:<span>*</span></label>
            <input type="email" id="email" name="email" required>

            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone">

            <button type="submit">Update</button>
        </form>
        `;
    }
    static htmlContent(){
        return `
        <section class="sections">
            <div class="personalSettings">Personal info</div>
            <div class="profilePicture">Profile Picture</div>
            <div class="security">Security</div>
            <div class="storage">Storage</div>
        </section>


        <section class="content">
            
        </section>
        `;
    }
}