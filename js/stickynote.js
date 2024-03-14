export default class stickyNoteApp{
    constructor(main){
        this.main = main;
        this.main.innerHTML = stickyNoteApp.htmlContent();
        
        this.addNotesStickyBarButton = document.querySelector(".addNotesStickyBarButton");
        this.stickyBars = document.querySelector(".StickyBars");
        this.noteEditor = document.querySelector(".noteEditor");
        
        this.addCategoriesButton = document.querySelector(".addCategoriesButton");
        this.categories = document.querySelector(".categories");
        
        this.getLocalStorage(null);

        this.idOfStickyBar = null;
        
        this.addNotesStickyBarButton.addEventListener("click", () => this.addStickyBar());
        this.addCategoriesButton.addEventListener("click", () => this.addCategorie());
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
        let categoryName = prompt("Entry category name:").trim();
            if(categoryName){
                this.categories.innerHTML += stickyNoteApp.createCategorie(categoryName);
        }
    }
    addStickyBar(){
        this.setLocalStorage(null,"Write Tittle","Work","Alireza Maxer",`${this.handleTime(null)}`,"Hi this is a sticky Note.", "Hi this is a sticky Note.");
        const id = Object.keys(this.getLocalStorage(1)).length - 1;
        const localstorageGetDetails = this.getLocalStorage(1)[id];
        this.stickyBars.innerHTML += this.createStickyBar(id, localstorageGetDetails.tittle, localstorageGetDetails.category, this.handleTime(localstorageGetDetails.time), localstorageGetDetails.stickyBarArticle);
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
            });
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
            const noteEditorHeader = document.querySelector(".noteEditorHeader");
            const noteTitle = document.querySelector(".noteTitle");
            const noteCategory = document.querySelector(".noteCategory");
            const writerName = document.querySelector(".writerName");
            const note = document.querySelector(".note");
            const timeOfNoteEditor = document.querySelector(".timeOfNoteEditor");
        
            const stickyBar = document.querySelectorAll(".StickyBar")[this.idOfStickyBar];
    
            const stickyBarTittle = stickyBar.querySelector(".stickyBarTittle");
            const stickyBarArticle = stickyBar.querySelector(".stickyBarArticle");
            const stickyBarCategory = stickyBar.querySelector(".stickyBarCategory");
            const timeOfNote = stickyBar.querySelector(".timeOfNote");

            const stickyBarArticleHanddle = note.textContent.length >= 80
            ? note.textContent.substring(0, 80) + "..."
            : note.textContent;

            this.setLocalStorage(noteEditorHeader.id, noteTitle.textContent, noteCategory.textContent, writerName.textContent,`${this.handleTime(null)}`, note.innerHTML, stickyBarArticleHanddle);

            stickyBarTittle.textContent = noteTitle.textContent.length >= 30 ? noteTitle.textContent.substring(0, 30) + "..." : noteTitle.textContent;
            stickyBarArticle.textContent = stickyBarArticleHanddle;
            stickyBarCategory.textContent = noteCategory.textContent;
            timeOfNote.textContent = `${this.handleTime(null).slice(11,16)}`;
            timeOfNoteEditor.textContent = `${this.handleTime(null).slice(11,16)}`;
        });
    }
    setLocalStorage(id, tittle, category, nameOfWriter, time, article, stickyBarArticle){
        const obj = {tittle: tittle.trim(), category: category.trim(), nameOfWriter: nameOfWriter, time: time, article: article.trim(), stickyBarArticle: stickyBarArticle.trim()};
        let data = JSON.parse(localStorage.getItem('stickynote')) || {};

        if(id === null){
            const ids = Object.keys(data);
    
            const newId = ids.length > 0 ? parseInt(ids[ids.length - 1]) + 1 : 0;
            data[newId.toString()] = obj;
    
            localStorage.setItem('stickynote', JSON.stringify(data));
        }
        else{
            data[id.toString()] = obj;
            localStorage.setItem('stickynote', JSON.stringify(data));
        }
    }
    getLocalStorage(id){
        if(id === null){
            const stickynoteData = JSON.parse(localStorage.getItem('stickynote'));
            if(stickynoteData !== null){
                for(let i = 0; i < Object.keys(stickynoteData).length; i++){
                    const stickynoteDataValue = stickynoteData[i];
                    this.stickyBars.innerHTML += this.createStickyBar(i, stickynoteDataValue.tittle, stickynoteDataValue.category, this.handleTime(stickynoteDataValue.time), stickynoteDataValue.stickyBarArticle);
                    this.displayStickyContent();
                }
            }
        }
        else{
            return JSON.parse(localStorage.getItem('stickynote')) || {};
        }
    }
    static editor(id, tittle, category, nameOfWriter, time, article){
        return `
        <div id="${id}" class="noteEditorHeader">
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
                    <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="14px" fill="#a3574b"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
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
        <button><span>#</span>${name}</button>
        `;
    }
    static htmlContent(){
        return `
        <section class="stickys">
            <div class="notesContainer">
                <div class="serchBar">
                    <form>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#939393"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        <input type="text" placeholder="Search notes" name="search">
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