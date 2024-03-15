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

        this.idOfStickyBar = null;
        
        this.serchStickyAndCategoryInput.addEventListener("input", (event) => this.handleSearchSticky(event.target.value));
        this.addNotesStickyBarButton.addEventListener("click", () => this.addStickyBar());
        this.addCategoriesButton.addEventListener("click", () => this.addCategorie());
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
    addCategorie(){
        const categoryName = prompt("Entry category name:");
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
            }
        }
    }
    setToFirst(id, data) {
        const stickyBar = this.createStickyBar(id, data.tittle, data.category, this.handleTime(data.time), data.stickyBarArticle);
        this.stickyBars.insertAdjacentHTML('afterbegin', stickyBar);
    }
    addStickyBar(){
        this.setLocalStorage(null,"Write Tittle","No category",this.getPersonalInformation.name,`${this.handleTime(null)}`,"Hi this is a sticky Note.", "Hi this is a sticky Note.");
        const id = 0;
        const localstorageGetDetails = this.getLocalStorage(1)[id];

        this.setToFirst(id, localstorageGetDetails);
        this.noteEditor.innerHTML = stickyNoteApp.editor(id, localstorageGetDetails.tittle, localstorageGetDetails.category, localstorageGetDetails.nameOfWriter, this.handleTime(localstorageGetDetails.time), localstorageGetDetails.article);
        this.displayStickyContent();
    }
    displayStickyContent() {
        const stickyBars = document.querySelectorAll(".StickyBar");
        stickyBars.forEach((stickyBar, i) => {
            stickyBar.addEventListener("click", () => {
                let localstorageGetDetails = this.getLocalStorage(1)[i];
                this.noteEditor.innerHTML = stickyNoteApp.editor(i, localstorageGetDetails.tittle, localstorageGetDetails.category, localstorageGetDetails.nameOfWriter, this.handleTime(localstorageGetDetails.time), localstorageGetDetails.article);
                this.idOfStickyBar = i;
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
    /*autoSave() {
        const note = document.querySelector(".note");

        note.addEventListener('input', () => {
            if (note) {
                console.log(note);
            }
        });
    }*/
    saveSticky(){
        const noteSaveButton = document.querySelector(".noteSaveButton");

        noteSaveButton.addEventListener("click", () => {
            const noteEditorHeader = document.querySelector(".noteEditorHeader").getAttribute('data-id');
            const noteTitle = document.querySelector(".noteTitle");
            const noteCategory = document.querySelector(".noteCategory");
            const writerName = document.querySelector(".writerName");
            const note = document.querySelector(".note");
    
            const stickyBarArticleHanddle = note.textContent.length >= 80
            ? note.textContent.substring(0, 80) + "..."
            : note.textContent;

            this.setLocalStorage(noteEditorHeader, noteTitle.textContent, noteCategory.textContent, writerName.textContent,`${this.handleTime(null)}`, note.innerHTML, stickyBarArticleHanddle);

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
    static editor(id, tittle, category, nameOfWriter, time, article){
        return `
        <div data-id="${id}" class="noteEditorHeader">
                <div class="noteEditorTitleDetails">
                    <h1>
                        <span class="noteEditorTitleDetailsHash">#</span>
                        <span class="noteCategory">${category}</span> /
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