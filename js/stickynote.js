export default class stickyNoteApp{
    constructor(main){
        this.main = main;
        this.main.innerHTML = stickyNoteApp.htmlContent();

        this.getPersonalInformation = JSON.parse(localStorage.getItem("personalInformation"));

        this.serchStickyAndCategoryInput = document.querySelector("#serchStickyAndCategoryInput");
        this.addNotesStickyBarButton = document.querySelector(".addNotesStickyBarButton");
        this.stickyBars = document.querySelector(".StickyBars");
        this.noteEditor = document.querySelector(".noteEditor");
        
        this.addCategoriesButton = document.querySelector(".addCategoriesButton");
        this.categories = document.querySelector(".categories");
        
        this.getLocalStorage(null);
        this.getCategoryFromLocalStorage(null);
        this.noteEditor.innerHTML = stickyNoteApp.helpSticky();

        this.idOfStickyBar = null;
        
        this.serchStickyAndCategoryInput.addEventListener("input", (event) => this.handleSearchSticky(event.target.value));
        this.addNotesStickyBarButton.addEventListener("click", () => this.addStickyBar());
        this.addCategoriesButton.addEventListener("click", () => this.addCategorie());
    }
    setCategorysToNotes(noteCategory){
        const categoryFormSelect = document.querySelector("#categoryFormSelect");
        this.getCategoryFromLocalStorage(1).forEach((category) => {
            categoryFormSelect.innerHTML += this.categorySelectOption(category);

            const options = categoryFormSelect.querySelectorAll("option");

            options.forEach(option => {
                if (option.textContent === noteCategory) {
                    option.setAttribute("selected", "selected");
                } else {
                    option.removeAttribute("selected");
                }
            });
        });
    }
    categoriesClicked(){
        const categoriesClick = document.querySelectorAll(".categorie");
        categoriesClick.forEach((categorie) => {
            categorie.addEventListener("click", (event) => {
                serchStickyAndCategoryInput.value = event.target.textContent.slice(1);
                this.handleSearchSticky(event.target.textContent.slice(1));
            });
        });
    }
    getCategoryFromLocalStorage(value){
        const localStorageCategorys = JSON.parse(localStorage.getItem('categorys')) || [];
        if(value === null){
            localStorageCategorys.forEach((category) => {
                this.categories.innerHTML += stickyNoteApp.createCategorie(category);
            });

            this.categoriesClicked();
            this.deleteCategory();
        }
        else{
            return localStorageCategorys;
        }
    }
    searchNotesAndCategory(inputText) {
        const result = [];
        const searchTerm = inputText.toLowerCase();
    
        for (const key in this.getLocalStorage(1)) {
            const note = this.getLocalStorage(1)[key];
            if (note.tittle.toLowerCase().includes(searchTerm) || note.category.toLowerCase().includes(searchTerm)) {
                result.push(note);
            }
        }
    
        return result;
    }
    handleSearchSticky(value) {
        this.stickyBars.innerHTML = "";
        this.noteEditor.innerHTML = "";
        if(value === ""){
            this.getLocalStorage(null);
            this.noteEditor.innerHTML = stickyNoteApp.helpSticky();
        }
        else{
            const searchResult = this.searchNotesAndCategory(value);
            searchResult.forEach((search, i) => {
                this.stickyBars.innerHTML += this.createStickyBar(i, search.tittle, search.category, this.handleTime(search.time), search.stickyBarArticle);
                this.displayStickyContent();
            });
        }
    }
    handleTime(time){
        const currentTime = new Date();

        if(time === null){
            const formattedTime = (part) => currentTime[part]().toString().padStart(2,'0');
            let fixMonthNumber = (Number(formattedTime('getMonth')) + 1).toString().padStart(2,'0');
            return `${formattedTime('getFullYear')}-${fixMonthNumber}-${formattedTime('getDate')}T${formattedTime('getHours')}:${formattedTime('getMinutes')}:${formattedTime('getSeconds')}`;
        }
        else{
            const storedTime = new Date(time);
            const timeDifference = currentTime - storedTime;
            const millisecondsInOneDay = 24 * 60 * 60 * 1000;
            
            if (timeDifference < millisecondsInOneDay) {
              return time.slice(11,16);
            } else {
              const daysPassed = Math.floor(timeDifference / millisecondsInOneDay);
              return `${daysPassed} day ago`;
            }
        }
    }
    promptWithMaxLength(promptMessage, maxLength) {
        let userInput;
        do {
            userInput = prompt(promptMessage);
            if (userInput === null) {
                return null;
            } else if (userInput.length > maxLength) {
                alert(`Please enter no more than ${maxLength} characters.`);
            }
        } while (userInput.length > maxLength);
        return userInput;
    }
    deleteCategory(){
        const categories = document.querySelectorAll(".categorie");

        categories.forEach((category) => {
            category.addEventListener("contextmenu", (event) => {
                let localStorageCategory = this.getCategoryFromLocalStorage(1);
                localStorageCategory.splice(localStorageCategory.indexOf(event.target.textContent.slice(1)), 1);
                let deleteCategoryFromNote = {};
                for(const key in this.getLocalStorage(1)){
                    const note = this.getLocalStorage(1)[key];
                    if(note.category.includes(event.target.textContent.slice(1))){
                        note.category = "No Category";
                    }
                    deleteCategoryFromNote[key] = note;
                }
                console.log(deleteCategoryFromNote);
                category.remove();
                localStorage.setItem('categorys', JSON.stringify(localStorageCategory));
                if(Object.keys(deleteCategoryFromNote).length > 0 && JSON.stringify(deleteCategoryFromNote) !== JSON.stringify(this.getLocalStorage(1))){
                    localStorage.setItem('stickynotes', JSON.stringify(deleteCategoryFromNote));
                    
                    this.stickyBars.innerHTML = "";
                    this.getLocalStorage(null);
                    this.noteEditor.innerHTML = "";
                }
            });
        });
    }
    addCategorie(){
        const categoryName = this.promptWithMaxLength("Entry category name:", 10);
        
        if(categoryName && categoryName.trim() !== ""){
            const fixText = categoryName.trim().toLocaleLowerCase();
            let getlocalstorageCategory = this.getCategoryFromLocalStorage(1);
            if(getlocalstorageCategory.includes(fixText) === false){
                if (!getlocalstorageCategory.length) {
                    getlocalstorageCategory = [];
                }
                getlocalstorageCategory.push(fixText);
                localStorage.setItem('categorys', JSON.stringify(getlocalstorageCategory));
                this.categories.innerHTML += stickyNoteApp.createCategorie(fixText);
                this.categoriesClicked();
                this.deleteCategory();
            }
        }
    }
    setToFirst(id, data) {
        const stickyBar = this.createStickyBar(id, data.tittle, data.category, this.handleTime(data.time), data.stickyBarArticle);
        this.stickyBars.insertAdjacentHTML('afterbegin', stickyBar);
    }
    addStickyBar(){
        this.setLocalStorage(null,"Write Tittle","No Category",this.getPersonalInformation.name,`${this.handleTime(null)}`,"Hi this is a sticky Note.", "Hi this is a sticky Note.");
        const id = 0;
        const localstorageGetDetails = this.getLocalStorage(1)[id];

        this.setToFirst(id, localstorageGetDetails);
        this.noteEditor.innerHTML = stickyNoteApp.editor(id, localstorageGetDetails.tittle, localstorageGetDetails.nameOfWriter, this.handleTime(localstorageGetDetails.time), localstorageGetDetails.article);
        this.displayStickyContent();
    }
    displayStickyContent() {
        const stickyBars = document.querySelectorAll(".StickyBar");

        stickyBars.forEach((stickyBar, i) => {
            stickyBar.addEventListener("click", () => {
                let localstorageGetDetails = this.getLocalStorage(1)[i];
                this.noteEditor.innerHTML = stickyNoteApp.editor(i, localstorageGetDetails.tittle, localstorageGetDetails.nameOfWriter, this.handleTime(localstorageGetDetails.time), localstorageGetDetails.article);
                this.idOfStickyBar = i;
                this.setCategorysToNotes(localstorageGetDetails.category);
                this.saveSticky();
                this.limitCharacters();
                this.deleteSticky(i);
            });
        });
    }
    updateObjNewestToOld(data){
        const dataArray = Object.values(data);

        dataArray.sort((a, b) => new Date(b.time) - new Date(a.time));

        const updatedData = {};
        dataArray.forEach((item, index) => {
            updatedData[index] = item;
        });

        return updatedData;
    }
    resetKeys(obj) {
        const newObj = {};
        Object.keys(obj).forEach((key, index) => {
          newObj[index] = obj[key];
        });
        return newObj;
    };
    removeKey(obj, key) {
        const { [key]: omit, ...res } = obj;
        return res;
    };
    deleteSticky(id){
        document.querySelector(".noteDeleteButton").addEventListener("click", () => {
            const StickyBars = document.querySelector(".StickyBars");
            const stickyElements = StickyBars.children;
            
            for (let i = stickyElements.length - 1; i >= 0; i--) {
                stickyElements[i].remove();
            }

            const updatedStickyNotes = this.resetKeys(this.removeKey(this.getLocalStorage(1), id));
            localStorage.setItem('stickynotes', JSON.stringify(updatedStickyNotes));
            
            this.getLocalStorage(null);
            this.noteEditor.innerHTML = "";
            this.noteEditor.innerHTML = stickyNoteApp.helpSticky();
        });
    }
    limitCharacters() {
        const content = document.querySelector(".noteTitle");

        content.addEventListener('input', () => {
            const maxLength = 30;
            
            if (content.innerText.length > maxLength) {
                content.innerText = content.innerText.substring(0, maxLength);
                alert('Maximum limit reached!');
            }
        });
    }
    saveSticky(){
        const noteSaveButton = document.querySelector(".noteSaveButton");

        noteSaveButton.addEventListener("click", () => {
            const noteEditorHeader = document.querySelector(".noteEditorHeader").getAttribute('data-id');
            const noteTitle = document.querySelector(".noteTitle");
            const categoryFormSelect = document.querySelector("#categoryFormSelect");
            const writerName = document.querySelector(".writerName");
            const note = document.querySelector(".note");
    
            const stickyBarArticleHanddle = note.textContent.length >= 80
            ? note.textContent.substring(0, 80) + "..."
            : note.textContent;

            this.setLocalStorage(noteEditorHeader, noteTitle.textContent, categoryFormSelect.value, writerName.textContent,`${this.handleTime(null)}`, note.innerHTML, stickyBarArticleHanddle);

            this.stickyBars.innerHTML = "";

            this.getLocalStorage(null);
        });
    }
    setLocalStorage(id, tittle, category, nameOfWriter, time, article, stickyBarArticle){
        const obj = {tittle: tittle.trim(), category: category.trim(), nameOfWriter: nameOfWriter, time: time, article: article.trim(), stickyBarArticle: stickyBarArticle.trim()};
        let data = JSON.parse(localStorage.getItem('stickynotes')) || {};

        if(id === null){
            const ids = Object.keys(data);
    
            const newId = ids.length > 0 ? parseInt(ids[ids.length - 1]) + 1 : 0;
            data[newId.toString()] = obj;
    
            localStorage.setItem('stickynotes', JSON.stringify(this.updateObjNewestToOld(data)));
        }
        else{
            data[id.toString()] = obj;
            localStorage.setItem('stickynotes', JSON.stringify(this.updateObjNewestToOld(data)));
        }
    }
    getLocalStorage(id){
        if(id === null){
            const stickynoteData = JSON.parse(localStorage.getItem('stickynotes'));
            if(stickynoteData !== null){
                for(let i = 0; i < Object.keys(stickynoteData).length; i++){
                    const stickynoteDataValue = stickynoteData[i];
                    this.stickyBars.innerHTML += this.createStickyBar(i, stickynoteDataValue.tittle, stickynoteDataValue.category, this.handleTime(stickynoteDataValue.time), stickynoteDataValue.stickyBarArticle);
                    this.displayStickyContent();
                }
            }
        }
        else{
            return JSON.parse(localStorage.getItem('stickynotes')) || {};
        }
    }
    static helpSticky(){
        return`
        <div id="helpSticky">
            <h1>Welcome to StickyNote App!</h1>
            <p>StickyNote is a simple yet powerful tool to help you organize your thoughts, ideas, and tasks. With StickyNote, you can create, edit, and manage your notes effortlessly.</p>
            <p>Getting Started:</p>

            <ol>
                <li><strong>Creating a New Note:</strong>
                    <ul>
                        <li>Click on the "+" button in the "MY NOTES" section to create a new sticky note.</li>
                        <li>Enter the title and content of your note.</li>
                        <li>Click on the "Save" button to save your note.</li>
                    </ul>
                </li>

                <li><strong>Managing Categories:</strong>
                    <ul>
                        <li>Click on the "+" button in the "CATEGORIES" section to add a new category.</li>
                        <li>Enter the name of the category (up to 10 characters) and press Enter.</li>
                        <li>You can assign categories to your notes to keep them organized.</li>
                    </ul>
                </li>

                <li><strong>Searching Notes:</strong>
                    <ul>
                        <li>Use the search bar at the top to quickly find notes by title or category.</li>
                        <li>Simply type your search query, and StickyNote will display matching notes in real-time.</li>
                    </ul>
                </li>

                <li><strong>Viewing and Editing Notes:</strong>
                    <ul>
                        <li>Click on a sticky note to view its details.</li>
                        <li>Edit the title or content of the note directly in the editor.</li>
                        <li>You can also change the category of the note from the dropdown menu.</li>
                    </ul>
                </li>

                <li><strong>Deleting Notes or Categories:</strong>
                    <ul>
                        <li>Right-click on a category to delete it.</li>
                        <li>Click on the delete button (trash can icon) within a note to remove it.</li>
                    </ul>
                </li>

                <li><strong>Limiting Characters:</strong>
                    <ul>
                        <li>The title of each note is limited to 30 characters to keep things concise.</li>
                        <li>If you exceed the character limit, StickyNote will alert you.</li>
                    </ul>
                </li>
            </ol>

            <p>Enjoy Using StickyNote!</p>
            <p>We hope you find StickyNote intuitive and useful for capturing your ideas and staying organized. If you have any questions or feedback, feel free to reach out to us. Happy note-taking!</p>
            <br>
            <p>Feel free to adjust the guide as needed to better fit your app's features and user experience.</p>
        </div>
        `;
    }
    categorySelectOption(name){
        return `<option value="${name}">${name}</option>`;
    }
    static editor(id, tittle, nameOfWriter, time, article){
        return `
        <div data-id="${id}" class="noteEditorHeader">
                <div class="noteEditorTitleDetails">
                    <h1>
                        <span class="noteEditorTitleDetailsHash">#</span>
                        <select id="categoryFormSelect" name="categoryForm" form="categoryForm">
                            <option value="No Category">No Category</option>
                        </select> /
                        <span class="noteTitle" contenteditable="true">${tittle}</span>
                    </h1>

                    <div class="writerAndTimeOfNote">
                        <span class="writerName">${nameOfWriter}</span>
                        <span class="timeOfNoteEditor">${time}</span>
                    </div>
                </div>

                <div class="saveAndDeleteButtons">
                    <button class="noteSaveButton">Save</button>

                    <button class="noteDeleteButton">
                        <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12V17" stroke="#cd0300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 12V17" stroke="#cd0300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 7H20" stroke="#cd0300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#cd0300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#cd0300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                </div>
            </div>

        <div class="noteDetails">
            <div class="note" contenteditable="true">
            ${article}
            </div>
        </div>
        `;
    }
    createStickyBar(id, tittle, category, time, article){
    return `
        <div id="${id}" class="StickyBar">
            <h3 class="stickyBarTittle">${tittle.length >= 30 ? tittle.substring(0, 30) + "..." : tittle}</h3>
            <p class="stickyBarArticle">${article}</p>

            <div class="StickyBarTimeCategory">
                <button>
                    <span class="stickyBarCategory">${category}</span>
                </button>

                <span class="timeOfNote">
                ${time}
                </span>
            </div>
        </div>
        `;
    }
    static createCategorie(name){
        return `
        <button class="categorie"><span>#</span>${name}</button>
        `;
    }
    static htmlContent(){
        return `
        <section class="stickys">
            <div class="notesContainer">
                <div class="serchBar">
                    <form>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#939393"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        <input id="serchStickyAndCategoryInput" type="text" placeholder="Search notes" name="search">
                    </form>
                </div>

                <div class="addNotesStickyBar">
                    <span>MY NOTES</span>
                    <button class="addNotesStickyBarButton">+</button>
                </div>

                <div class="StickyBars"></div>
            </div>

            <div class="categoriesContainer">
                <div class="addCategories">
                    <span>CATEGORIES</span>
                    <button class="addCategoriesButton">+</button>
                </div>

                <div class="categories">
                </div>
            </div>
        </section>


        <section class="noteEditor">
            
        </section>`;
    }
}