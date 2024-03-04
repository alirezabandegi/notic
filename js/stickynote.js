export default class stickyNoteApp{
    constructor(){
        this.currentDate = new Date();
        this.main = document.querySelector(".main");
        this.main.innerHTML = stickyNoteApp.htmlContent();
        
        this.addNotesStickyBarButton = document.querySelector(".addNotesStickyBarButton");
        this.stickyBars = document.querySelector(".StickyBars");
        this.noteEditor = document.querySelector(".noteEditor");
        
        this.addCategoriesButton = document.querySelector(".addCategoriesButton");
        this.categories = document.querySelector(".categories");
        
        this.getLocalStorage(null);
        
        this.addNotesStickyBarButton.addEventListener("click", () => {
            this.setLocalStorage(localStorage.length,"Write Tittle","Work","Alireza Maxer",`${this.currentDate.toLocaleString().split(",")[0]}`,"Hi this is a sticky Note.", "Hi this is a sticky Note.");
            let localstorageGetDetails = this.getLocalStorage(localStorage.length - 1);
            this.stickyBars.innerHTML += this.createStickyBar(localStorage.length - 1, localstorageGetDetails.tittle, localstorageGetDetails.category, localstorageGetDetails.stickyBarArticle);
            this.noteEditor.innerHTML = stickyNoteApp.editor(localStorage.length - 1, localstorageGetDetails.tittle, localstorageGetDetails.category, localstorageGetDetails.nameOfWriter, localstorageGetDetails.time, localstorageGetDetails.article);
            this.displayStickyContent();
            
        });

        this.addCategoriesButton.addEventListener("click", () => {
            let categoryName = prompt("Entry category name:").trim();
            if(categoryName){
                this.categories.innerHTML += stickyNoteApp.createCategorie(categoryName);
            }
        });

        
    }
    displayStickyContent(){
        const stickyBar = document.querySelectorAll(".StickyBar");
        for(let i = 0; i < stickyBar.length; i++){
            stickyBar[i].addEventListener("click", () => {
                let localstorageGetDetails = this.getLocalStorage(i);
                this.noteEditor.innerHTML = stickyNoteApp.editor(stickyBar[i].id, localstorageGetDetails.tittle, localstorageGetDetails.category, localstorageGetDetails.nameOfWriter, localstorageGetDetails.time, localstorageGetDetails.article);
                this.saveSticky();
                this.limitCharacters();
            });
        }
    }
    limitCharacters() {
        let content = document.querySelector(".noteTitle");
        content.addEventListener('input', () => {
            const maxLength = 30;
            
            if (content.innerText.length > maxLength) {
                let truncatedContent = content.innerText.substring(0, maxLength);
                content.innerText = truncatedContent;
                alert('Maximum limit reached!');
            }
        });
    }
    saveSticky(){
        let noteSaveButton = document.querySelector(".noteSaveButton");
        let noteEditorHeader = document.querySelector(".noteEditorHeader");
        let noteTitle = document.querySelector(".noteTitle");
        let noteCategory = document.querySelector(".noteCategory");
        let writerName = document.querySelector(".writerName");
        let note = document.querySelector(".note");

        let stickyBarTittle = document.querySelector(".stickyBarTittle");
        let stickyBarArticle = document.querySelector(".stickyBarArticle");
        let stickyBarCategory = document.querySelector(".stickyBarCategory");
        let timeOfNote = document.querySelector(".timeOfNote");

        noteSaveButton.addEventListener("click", () => {
            let stickyBarArticleHanddle = note.textContent.length >= 80
            ? note.textContent.substring(0, 80) + "..."
            : note.textContent;

            this.setLocalStorage(noteEditorHeader.id, noteTitle.textContent, noteCategory.textContent, writerName.textContent,`${this.currentDate.toLocaleString().split(",")[0]}`, note.innerHTML, stickyBarArticleHanddle);
            stickyBarTittle.textContent = noteTitle.textContent.length >= 30 ? noteTitle.textContent.substring(0, 30) + "..." : noteTitle.textContent;
            stickyBarArticle.textContent = stickyBarArticleHanddle;
            stickyBarCategory.textContent = noteCategory.textContent;
            timeOfNote.textContent = timeOfNote.textContent;
        });
    }
    setLocalStorage(id, tittle, category, nameOfWriter, time, article, stickyBarArticle){
        let addToLocalStorage = {tittle: `${tittle.trim()}`,category: `${category.trim()}`,nameOfWriter: `${nameOfWriter}`,time: `${time}`,article: `${article.trim()}`, stickyBarArticle: `${stickyBarArticle.trim()}`};
        if(id === 0){
            localStorage.setItem(`Stickynote${id}`, JSON.stringify(addToLocalStorage));
        }
        else{
            localStorage.setItem(`Stickynote${id}`, JSON.stringify(addToLocalStorage));
        }
    }
    getLocalStorage(id){
        if(id === null){
            for(let i = 0; i < localStorage.length; i++){
                let localStorageDetails = JSON.parse(localStorage.getItem(`Stickynote${i}`));
                if(localStorageDetails !== null){
                    let localstorageGetDetails = this.getLocalStorage(i);
                    this.stickyBars.innerHTML += this.createStickyBar(i, localstorageGetDetails.tittle, localstorageGetDetails.category, localstorageGetDetails.stickyBarArticle);
                    this.displayStickyContent();
                }
            }
        }
        else{
            return JSON.parse(localStorage.getItem(`Stickynote${id}`));
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
                        <span class="timeOfNote">${time}</span>
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
    createStickyBar(id, tittle, category, article){
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
                ${this.currentDate.toLocaleString().split(",")[0]}
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