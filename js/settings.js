export default class settingsApp{
    constructor(main){
        this.main = main;
        // Set initial HTML content for the main container
        this.main.innerHTML = settingsApp.htmlContent();

        // Define buttons for different sections
        this.settingsButtons = [
            document.querySelector(".settings"),
            document.querySelector(".personalSettings"),
            document.querySelector(".profilePicture"),
            document.querySelector(".security"),
            document.querySelector(".storage")
        ];

        // Reference to the content container
        this.content = document.querySelector(".content");

        // Add event listeners to section buttons
        this.settingsButtons[0].addEventListener("click", () => this.settings());
        this.settingsButtons[1].addEventListener("click", () => this.personalSettings());
        this.settingsButtons[2].addEventListener("click", () => this.profilePicture());
        this.settingsButtons[3].addEventListener("click", () => this.security());
        this.settingsButtons[4].addEventListener("click", () => this.storage());

        // Default action when the app loads
        this.settings();
    }

    // Settings section - displays general settings overview
    settings(){
        this.content.innerHTML = settingsApp.settingsContent();
        this.content.className = "content contentSettings";
    }

    // Personal Info section - allows users to update their personal information
    personalSettings(){
        // Set HTML content for the Personal Info section
        this.content.innerHTML = settingsApp.personalSettingsContent();
        this.content.className = "content contentPersonalSettings";

        // Retrieve personal information from localStorage
        const personalInformation = JSON.parse(localStorage.getItem("personalInformation"));
        const formInputNames = ["name", "email", "phone"];
        const getFormInputValue = (value) => document.querySelector(value);

        // Fill form inputs with current personal information
        formInputNames.forEach((inputName) => {
            getFormInputValue(`#${inputName}`).value = personalInformation[inputName];
        });

        // Add event listener for form submission
        document.querySelector("#myform").addEventListener("submit", (event) => {
            event.preventDefault();
            let informations = {};

            // Update personal information based on form input values
            formInputNames.forEach((inputName) => {
                informations[inputName] = getFormInputValue(`#${inputName}`).value.trim().toLowerCase();
            });
            informations["password"] = personalInformation.password;

            // Save updated personal information to localStorage
            localStorage.setItem("personalInformation", JSON.stringify(informations));
            alert("Personal information updated successfully");
        });
    }

    // Profile Picture section - allows users to manage their profile picture
    profilePicture(){
        // Set HTML content for the Profile Picture section
        this.content.innerHTML = settingsApp.profilePictureContent();
        this.content.className = "content contentProfilePicture";

        // Load profile picture from localStorage or use default
        const photo = document.getElementById('photo');
        const profilePictureStorage = localStorage.getItem("profilePicture");

        profilePictureStorage === null
        ? photo.src = "files/profile.webp"
        : photo.src = profilePictureStorage;

        // Add event listener for profile picture upload
        document.getElementById('photoInput').addEventListener('change', () => this.handlePhoto());
    }

    // Handles the process of updating the profile picture
    handlePhoto() {
        const profilePic = document.querySelector(".profilePic");
        const photoInput = document.getElementById('photoInput');
        const convertedPhoto = document.getElementById('photo');
    
        if (photoInput.files.length > 0) {
            const selectedPhoto = photoInput.files[0];
            const reader = new FileReader();

            // When the file is loaded, process it and update the profile picture
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const size = Math.min(img.width, img.height);
                    canvas.width = size;
                    canvas.height = size;

                    ctx.drawImage(img, 0, 0, size, size);

                    // Convert the image to webp format and save it to localStorage
                    const webpData = canvas.toDataURL('image/webp');

                    localStorage.setItem('profilePicture', webpData);

                    // Update the profile picture in the UI
                    convertedPhoto.src = webpData;
                    profilePic.src = webpData;
                };
            };

            // Read the selected photo as a data URL
            reader.readAsDataURL(selectedPhoto);
        }
    }

    // Security section - allows users to change their account password
    security(){
        // Set HTML content for the Security section
        this.content.innerHTML = settingsApp.securityContent();
        this.content.className = "content contentSecurity";
        const myForm = document.querySelector("#myForm");
        const oldPasswordInput = document.querySelector("#oldPassword");
        const newPasswordInput = document.querySelector("#newPassword");
        const confirmNewPasswordInput = document.querySelector("#confirmNewPassword");

        // Add event listener for form submission
        myForm.addEventListener("submit", (event) => {
            const personalInformation = JSON.parse(localStorage.getItem("personalInformation"));
            event.preventDefault();
            const oldPassword = oldPasswordInput.value;
            let informations = {};
            informations["name"] = personalInformation.name;
            informations["email"] = personalInformation.email;
            informations["phone"] = personalInformation.phone;

            // Check if the old password is correct
            if(oldPassword === personalInformation.password){
                const newPassword = newPasswordInput.value;
                if(newPassword.length >= 8){
                    const confirmPassword = confirmNewPasswordInput.value;
                    // Check if the new passwords match
                    if(newPassword === confirmPassword){
                        // Update the password and save to localStorage
                        informations["password"] = newPassword;
                        localStorage.setItem("personalInformation", JSON.stringify(informations));
                        alert("Password changed successfully");
                    }
                    else{
                        alert("New passwords don't match");
                    }
                }
                else{
                    alert("password must be at least 8 characters.");
                }
            }
            else{
                alert("Old password is wrong");
            }
        });
    }

    // Storage section - provides an overview of storage usage
    storage(){
        // Set HTML content for the Storage section
        this.content.className = "content contentStorage";
        let localStorageSize = function () {
            let _lsTotal = 0,_xLen, _x;
            for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) continue;
                _xLen = (localStorage[_x].length + _x.length) * 2;
                _lsTotal += _xLen;
            }
            return (((_lsTotal / 1024).toFixed(2)) / 1000) * 10;
        }
        this.content.innerHTML = this.storageContent(localStorageSize());
        const storageGraphic = document.querySelector(".storageGraphic");
        storageGraphic.style.width = `${localStorageSize()}%`;
    }

    // Generates the HTML content for the Storage section
    storageContent(storage){
        return`
        <h1>Storage</h1>
        <div class="storageGraphicBackground"><div class="storageGraphicText">${storage.toFixed()} / 100%</div><div class="storageGraphic"></div></div>
        <h1>Storage Overview:</h1>
        <p>Your current storage capacity is represented by the graphic below. As of now, you have utilized approximately <strong>${storage.toFixed()}%</strong> of your allocated storage space.</p>
        <p><strong>Available Storage: ${100 - storage.toFixed()}%</strong></p>
        <p>To ensure smooth operation and accommodate growing needs, additional storage can be purchased. Upgrading your storage plan will provide you with more space to store your valuable data.</p>
        <h3>Upgrade Your Storage:</h3>
        <ul>
            <li><strong>Basic Plan:</strong> Additional 10GB - $5/month</li>
            <li><strong>Standard Plan:</strong> Additional 25GB - $10/month</li>
            <li><strong>Premium Plan:</strong> Additional 50GB - $15/month</li>
        </ul>
        <p>Feel free to upgrade your storage plan at any time to meet your requirements and keep your digital experience seamless. If you have any questions or need assistance, please contact our support team.</p>
        `;
    }

    // Generates the HTML content for the Security section
    static securityContent(){
        return `
        <h1>Security</h1>
        <form id="myForm">
            <label for="oldPassword">Old Password:</label>
            <input type="password" id="oldPassword" name="oldPassword" required>

            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" required>
            <label for="confirmNewPassword">Confirm Password:</label>
            <input type="password" id="confirmNewPassword" name="confirmNewPassword" required>
            
            <button type="submit">Change</button>
        </form>
        `;
    }

    // Generates the HTML content for the Profile Picture section
    static profilePictureContent(){
        return `
        <h1>Profile Picture</h1>
        <p>A picture helps people recognize you and lets you know when you’re signed in to your account</p>

        <div class="container">
            <img src="" id="photo" alt="Profile Picture">

            <div class="buttons">
                <div>
                    <label for="photoInput" class="photoInput">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#b3b3b3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
                    Change
                    </label>
                    <input type="file" accept="image/*" id="photoInput">
                </div>
                <div class="removeImg">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12V17" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 12V17" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 7H20" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#b3b3b3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Remove
                </div>
            </div>
        </div>
        `;
    }

    // Generates the HTML content for the Personal Settings section
    static personalSettingsContent(){
        return `
        <h1>Personal info</h1>
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

    // Generates the HTML content for the Settings section
    static settingsContent(){
        return `
        <h1>Settings</h1>
        <ol>
            <li>
                <h3>Personal Info:</h3>
                <ul>
                    <li><strong>Purpose:</strong> Manage and update your personal information.</li>
                    <li><strong>What You Can Do:</strong>
                        <ul>
                            <li>Update your name, email address, and phone number.</li>
                            <li>Keep your personal details accurate and up-to-date.</li>
                        </ul>
                    </li>
                </ul>
            </li>

            <li>
                <h3>Profile Picture:</h3>
                <ul>
                    <li><strong>Purpose:</strong> Customize and set your profile picture.</li>
                    <li><strong>What You Can Do:</strong>
                        <ul>
                            <li>Upload a personalized profile picture.</li>
                            <li>Change your existing profile picture.</li>
                            <li>Remove your current profile picture.</li>
                        </ul>
                    </li>
                </ul>
            </li>

            <li>
                <h3>Security:</h3>
                <ul>
                    <li><strong>Purpose:</strong> Enhance the security of your account.</li>
                    <li><strong>What You Can Do:</strong>
                        <ul>
                            <li>Change your account password.</li>
                            <li>Ensure your account is protected with a strong password.</li>
                            <li>Maintain a secure and reliable login credential.</li>
                        </ul>
                    </li>
                </ul>
            </li>

            <li>
                <h3>Storage:</h3>
                <ul>
                    <li><strong>Purpose:</strong> Monitor and manage your storage space.</li>
                    <li><strong>What You Can Do:</strong>
                        <ul>
                            <li>View an overview of your current storage usage.</li>
                            <li>Upgrade your storage plan if needed.</li>
                            <li>Understand available storage and usage percentage.</li>
                            <li>Get information on storage upgrade options.</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ol>
        `;
    }

    // Generates the HTML content for the main structure of the app
    static htmlContent(){
        return `
        <section class="sections">
            <div class="settings">Settings</div>
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