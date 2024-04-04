export default class helpApp{
    constructor(main){
        this.main = main;

        this.main.innerHTML = helpApp.htmlContent();
        this.setDataToHtml();
    }

    data(){
        return {
        stickyNote:{
            0:{
                tittle: `How do I create a new note?`,
                paragraph: `To create a new note, simply click on the "+" button located in the "MY NOTES" section. This will open a new sticky note editor where you can enter the title and content of your note. Once you're done, click on the "Save" button to save your note.`
            },
            1:{
                tittle: `How can I manage categories?`,
                paragraph:`Managing categories is easy. Click on the "+" button in the "CATEGORIES" section to add a new category. Enter the name of the category (up to 10 characters) and press Enter. You can assign categories to your notes to keep them organized.`
            },
            2:{
                tittle: `How do I search for notes?`,
                paragraph:`Use the search bar at the top of the page to quickly find notes by title or category. Simply type your search query, and StickyNote will display matching notes in real-time.`
            },
            3:{
                tittle: `Can I edit existing notes?`,
                paragraph:`Yes, absolutely! Click on a sticky note to view its details. You can then edit the title or content of the note directly in the editor. You can also change the category of the note from the dropdown menu.`
            },
            4:{
                tittle: `How do I delete notes or categories?`,
                paragraph:`To delete a category, simply right-click on it and select delete. To delete a note, click on the delete button (trash can icon) within the note.`
            },
            5:{
                tittle: `Is there a limit to the number of characters in a note title?`,
                paragraph:`Yes, the title of each note is limited to 30 characters to keep things concise. If you exceed the character limit, StickyNote will alert you.`
            },
            6:{
                tittle: `How do I save my changes to a note?`,
                paragraph:`After making changes to a note, simply click on the "Save" button in the note editor. Your changes will be saved automatically.`
            },
            7:{
                tittle: `Can I organize my notes into different categories?`,
                paragraph:`Yes, you can assign categories to your notes to keep them organized. When creating or editing a note, simply select the desired category from the dropdown menu.`
            },
            8:{
                tittle: `Is there an option to limit the characters in the note content?`,
                paragraph:`Currently, there isn't an explicit character limit for note content. However, it's always a good practice to keep your notes concise and to the point.`
            },
            9:{
                tittle: `How do I get started with StickyNote?`,
                paragraph:`Simply start by creating a new note using the "+" button in the "MY NOTES" section. From there, explore the various features such as searching, editing, and organizing your notes using categories.`
            }
        },
        calendar:{
            0:{
                tittle:`How do I navigate to a specific month and year?`,
                paragraph:`You can navigate to a specific month and year by clicking on the month displayed at the top of the calendar. This will open a dropdown list of months, from which you can select the desired month. Additionally, you can click on the arrows ("<" for previous year and ">" for next year) next to the year to navigate to the previous or next year respectively.`
            },
            1:{
                tittle:`How can I see today's date on the calendar?`,
                paragraph:`Today's date is highlighted on the calendar by default. It is displayed in a different color or style to distinguish it from other dates.`
            },
            2:{
                tittle:`What if I want to see the days of a specific week?`,
                paragraph:`Currently, the calendar displays the entire month. However, if you want to see the days of a specific week, you can easily do so by identifying the first day of that week (usually Sunday or Monday) and then observing the days following it.`
            },
            3:{
                tittle:`Can I customize the appearance of the calendar?`,
                paragraph:`Yes, you can customize the appearance of the calendar by modifying the CSS styles associated with the calendar elements. You can change colors, fonts, sizes, and other visual aspects according to your preferences.`
            },
            4:{
                tittle:`How do I handle leap years in the calendar?`,
                paragraph:`Leap years are handled automatically by the calendar. February will display 29 days instead of 28 in a leap year.`
            },
            5:{
                tittle:`Is there any way to integrate events or reminders into the calendar?`,
                paragraph:`Currently, the calendar app does not have built-in support for adding events or reminders. However, you can extend the functionality by incorporating event-handling features using JavaScript. This could include adding event listeners to specific dates and displaying event details when clicked.`
            }
        },
        settings:{
            0:{
                tittle:`How can I change my password?`,
                paragraph:`Navigate to the "Security" section. @ Enter your old password and then specify your new password. @ Confirm the new password and click on the "Change" button. @ You will receive a confirmation message once the password is changed successfully.`
            },
            1:{
                tittle:`Can I update my personal information?`,
                paragraph:`Yes, you can update your personal information in the "Personal Info" section. @ Enter your new name, email address, or phone number in the respective fields. @ Click on the "Update" button to save the changes.`
            },
            2:{
                tittle:`How do I upload or change my profile picture?`,
                paragraph:`Visit the "Profile Picture" section. @ Click on the "Change" button and select the desired image from your device. @ After selecting the image, click on "Open" to upload it. @ Your profile picture will be updated instantly.`
            },
            3:{
                tittle:`Is there an option to remove my current profile picture?`,
                paragraph:`Yes, you can remove your current profile picture. @ Simply go to the "Profile Picture" section. @ Click on the "Remove" button to delete your current profile picture. @ A confirmation message will be displayed once the picture is removed.`
            },
            4:{
                tittle:`How can I monitor my storage usage?`,
                paragraph:`Go to the "Storage" section to view an overview of your storage usage. @ The storage graphic represents your current usage percentage. @ You can also check the available storage and upgrade options.`
            },
            5:{
                tittle:`Can I upgrade my storage plan?`,
                paragraph:`Yes, you can upgrade your storage plan at any time. @ Check the available upgrade options listed in the "Storage" section. @ Choose the desired plan and follow the instructions to upgrade.`
            },
            6:{
                tittle:`What should I do if I forget my password?`,
                paragraph:`In case you forget your password, you can reset it. @ Click on the "Forgot Password?" link on the login page. @ Follow the instructions to reset your password and regain access to your account.`
            },
            7:{
                tittle:`How secure is my personal information on this platform?`,
                paragraph:`We take the security of your personal information seriously. @ All data is encrypted and stored securely using industry-standard protocols. @ We regularly update our security measures to ensure the safety of your information.`
            },
            8:{
                tittle:`Can I access my account from multiple devices?`,
                paragraph:`Yes, you can access your account from multiple devices. @ Ensure that you have a stable internet connection and use your login credentials to access the account.`
            },
            9:{
                tittle:`What should I do if I encounter any technical issues?`,
                paragraph:`If you encounter any technical issues or have further questions, please contact our support team. @ You can reach out to us via email or through our customer support portal. @ Our dedicated team will assist you promptly with any queries or concerns you may have.`
            }
        }
        };
    }
    setDataToHtml(){
        const helpStickyNote = document.querySelector(".helpStickyNote");
        const helpCalendar = document.querySelector(".helpCalendar");
        const helpSettings = document.querySelector(".helpSettings");

        for(const key in this.data()){
            for(const id in this.data()[key]){
                if(key === "settings"){
                    const detailsElement = document.createElement("details");
                    const summaryElement = document.createElement("summary");
                    const ulElement = document.createElement("ul");
                    

                    helpSettings.appendChild(detailsElement);
                    detailsElement.appendChild(ulElement);

                    const texts = this.data()[key][id]['paragraph'].split(' @ ');
                    texts.forEach(text => {
                        const liElement = document.createElement("li");

                        ulElement.appendChild(liElement);

                        liElement.textContent =  text;
                    });
                    
                    detailsElement.appendChild(summaryElement);
                    summaryElement.textContent = this.data()[key][id]['tittle'];

                    
                }
                else if(key === "calendar"){
                    const detailsElement = document.createElement("details");
                    const summaryElement = document.createElement("summary");

                    helpCalendar.appendChild(detailsElement);
                    detailsElement.textContent = this.data()[key][id]['paragraph'];
                    
                    detailsElement.appendChild(summaryElement);
                    summaryElement.textContent = this.data()[key][id]['tittle'];
                }
                else{
                    const detailsElement = document.createElement("details");
                    const summaryElement = document.createElement("summary");

                    helpStickyNote.appendChild(detailsElement);
                    detailsElement.textContent = this.data()[key][id]['paragraph'];
                    
                    detailsElement.appendChild(summaryElement);
                    summaryElement.textContent = this.data()[key][id]['tittle'];
                }
            }
        }
    }
    static htmlContent(){
        return `
        <h1>Most Asked</h1>
        <details class="helpStickyNote">
            <summary>About Sticky Note App</summary>
        </details>

        <details class="helpCalendar">
            <summary>About Calendar App</summary>
        </details>

        <details class="helpSettings">
            <summary>About Settings</summary>
        </details>
        `;
    }
}
