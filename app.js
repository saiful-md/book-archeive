/*====================== get api function ======================*/ 
const getBook = () =>{
    const searchBook = document.getElementById('search-book-name');
    const getSearchRasult = searchBook.value;
    searchBook.value = '';
    displaySpinner('block');
    const url = `https://openlibrary.org/search.json?q=${getSearchRasult}`
    fetch(url)
    .then(res => res.json())
    .then(data => getBookDetails(data.docs))
}


/*=====================   toggle spinner funciton  ============================== */
const displaySpinner = (display) => {
    document.getElementById('spinner').style.display = display;
}


/*======================= display total boooks length item funciton ===============*/
const totalBooksItem = total => {
    const booksCount = document.getElementById('total-books');
    booksCount.textContent = '';
    const h1 = document.createElement('h1');
    h1.classList.add("text-center");
    h1.setAttribute('id','books-error');
    h1.innerHTML =`
    You search total: <span class="text-danger">${total}</span> books available.
    `;
    booksCount.appendChild(h1);
}


/*==================== display user input (all books) on the DOM function ===============*/ 
const getBookDetails = (books) => {
    const displayData= document.getElementById('display-data');
    displayData.textContent = '';
    const totalBooks = books.length;
        totalBooksItem(totalBooks);//get output total books length
    
    const displayTwenty = books.slice(0,21);
    if(!totalBooks){    //error massage.....
        
        const error = document.getElementById('error');
        error.textContent = '';
        const errorContent = document.createElement('p');
        errorContent.innerText = 'No result found...';
        error.appendChild(errorContent);

    }
    displayTwenty?.forEach(book => { //display all data on the DOM from api

        const bookImage = book.cover_i;
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col',)
        div.innerHTML = `
            <div id="card" class="card h-100 ">
                <div class="m-3">
                    <img src="https://covers.openlibrary.org/b/id/${bookImage}-M.jpg" class="card-img-top " width="300px" height="300px">
                </div>
                <div class="card-body bg-from-api">
                    <h4 class="card-title">Book Name: ${book.title}</h4>
                    <h6 class="card-text">Author Name: ${book.author_name?.[0]}</h6>
                    <h6 class="card-text">Publisher: ${book.publisher?.[0]}</h6>
                    <p class="card-text">First Publish Date: ${book.publish_date?.[0]}</p>
                </div>
            </div>
            `;
        displayData.appendChild(div);
    }) 
    displaySpinner('none');
}







