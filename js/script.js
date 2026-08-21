//=====Mobile Navigation=====//
const toggle= 
    document.getElementById("nav-toggle");  /*find the HTML element with:id"nav-toggle & store inside the variable:toggle*/
const navLinks=
    document.getElementById("nav-links"); /*-----store inside the variable:navLinks*/

    if(toggle && navLinks) {

    toggle.addEventListener("click", function () {    /*wait for something to happen here when "click":run this when user clicks hamburger button*/
    const expanded=
        toggle.getAttribute("aria-expanded")==="true";
    /*Eg. aria-expanded="false",this code checks,is aria-expanded="true"?
    if yes: expanded=true, if no: expanded=false*/

    toggle.setAttribute("aria-expanded",
        !expanded
    );
    /*setAttribute() changes HTML attribute. ! means "opposite"l
    if expanded is false(!expanded becomes true). so clicking the button switches btw:
    aria-expanded="false" and aria-expanded="true"*/

    navLinks.classList.toggle("open"); 
    /*classList.toggle()adds or removes the CSS class "open"*/
                  
});
}

//=====Book Search=====//
const searchButton =
    document.getElementById("searchButton"); /*find the search button in HTML*/
const searchInput=
    document.getElementById("bookSearch");  /*find the input field*/
const searchResult=
    document.getElementById("searchResult"); /*find paragraph where JS will display search result*/

    if (searchButton && searchInput && searchResult) {
        searchButton.addEventListener("click",function () {
            const searchText=
                    searchInput.value  /*gets whatever user typed*/
                    .toLowerCase()    /*changes to lowercase*/
                    .trim();  /*removes extra spaces at the beginning or end*/

            //==check if search box is empty==//
            if(searchText==="") {
                searchResult.textContent=  "Please enter a book title.";
                return;
}

//search book array//
const foundBook=libraryBooks.find(function (book) {
    return book.title
        .toLowerCase()
        .includes(searchText);  /*Does this title contain what the user typed?*/
    });

//===Display result===//
    if (foundBook)  {
    searchResult.textContent= "Book available"+ foundBook.title;


    } else {
    searchResult.textContent= "Sorry, that book was not found.";
    }
});
    }

//===Allow Enter Key to Search/let user press Enter instead of clicking search button===//
if (searchInput && searchButton) {

searchInput.addEventListener(
        "keypress",
        function (event)  {
            if (event.key==="Enter") {
            searchButton.click();
        }
    }
);
}
//====Feature Buttons=====//
const bookButton =
    document.getElementById("bookButton");
    if(bookButton) {

    
    bookButton.addEventListener("click", function() {
        window.location.href="books.html";
});
}
const memberButton =
    document.getElementById("memberButton");
    if(memberButton) {

   memberButton.addEventListener("click", function() {
        window.location.href="members.html";
});
}
const borrowButton =
    document.getElementById("borrowButton");
    if(borrowButton) {

    borrowButton.addEventListener("click", function () {
        window.location.href="borrow.html";
});
}
const dashboardButton =
    document.getElementById("dashboardButton");
const dashboardSection =
    document.querySelector(".dashboard-section");
    if(dashboardButton && dashboardSection) {

    dashboardButton.addEventListener("click", function() {
   
        window.location.href="dashboard.html";
    });
}
//=====Book Data=====//
//This array stores all books//
const libraryBooks = [
    {
        id: 1,
        title: "Cloud Computing Basics",
        author: "John Smith",
        category: "Cloud",
        status: "Available",
        image: "images/Book Cover with Cloud Computing Basics.jpg"
    },
    {
        id: 2,
        title: "Learning JavaScript",
        author: "Ethan Brown",
        category: "Programming",
        status: "Available",
        image: "images/Book Cover with JavaScript.jpg"
    },
    {
        id: 3,
        title: "HTML and CSS Design",
        author: "David Lee",
        category: "Technology",
        status: "Borrowed",
        image: "images/Book Cover with HTML CSS.jpg"
    },
    {
        id: 4,
        title: "AWS for Solutions Architects",
        author: "Mike Sanrio",
        category: "Cloud",
        status: "Available",
        image: "images/Book Cover with AWS for Solutions Architects.jpg"
    },
    {
        id: 5,
        title: "Educated",
        author: "Tara Westover",
        category: "Fiction",
        status: "Available",
        image: "images/Polished Book Cover - 'Educated' by Tara Westover.jpg"
    },
    {
        id: 6,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Non-Fiction",
        status: "Borrowed",
        image: "images/Book Cover Atomic Habits.jpg"
    },
];
//=====Find HTML Elements=====//
//---Area where book cards will appear----//
const booksGrid = document.getElementById("booksGrid");

//Search input//
const bookPageSearch = document.getElementById("bookPageSearch");

//Category dropdown//
const categoryFilter = document.getElementById("categoryFilter");

//Status dropdown//
const statusFilter = document.getElementById("statusFilter");

//Number of books found//
const bookCount = document.getElementById("bookCount");

//"No books found" message
const noBooksMessage = document.getElementById("noBooksMessage");

//=====Start Books Page=====//
//Only run this if we are on books.html//
if (booksGrid &&
    bookPageSearch &&
    categoryFilter &&
    statusFilter &&
    bookCount &&
    noBooksMessage
) {
    //Show all books when page first opens
    displayBooks(libraryBooks);

    //Search while user types
    bookPageSearch.addEventListener("input",filterBooks);
    
    //Filter when category changes
    categoryFilter.addEventListener("change",filterBooks);

    //Filter when status changes//
    statusFilter.addEventListener("change",filterBooks);
}
//=====Display Books Function=====//
function displayBooks(booksToDisplay) {

    // Remove old book cards
    booksGrid.innerHTML = "";


    // Show number of books
    bookCount.textContent =
        booksToDisplay.length +
        " books found";


    // Check if no books were found
    if (booksToDisplay.length === 0) {

        noBooksMessage.style.display =
            "block";

        return;

    } else {

        noBooksMessage.style.display =
            "none";

    }


    //Loop through every book in the array//
    booksToDisplay.forEach(
        function (book) {


            // Create a new div element to each book//
            const bookCard =
                document.createElement("div");


            // Add CSS class to the div the CSS class book-card//
            bookCard.classList.add(
                "book-card"
            );


            //=====Status Class======//
            //decide which CSS class book-card//
            let statusClass;


            if (book.status === "Available") {

                statusClass =
                    "status-available";

            } else {

                statusClass =
                    "status-borrowed";

            }
           
            //=====BUTTON TEXT=====//

            let buttonText;


            if (book.status === "Available") {

                buttonText =
                    "Borrow Book";

            } else {

                buttonText =
                    "Currently Borrowed";

            }


            //=====BUTTON DISABLED=====//

            let disabledText;


            if (book.status === "Borrowed") {

                disabledText =
                    "disabled";

            } else {

                disabledText =
                    "";

            }


            //=====Create HTML inside the Book Card=====//

            bookCard.innerHTML = `

                <img
                    src="${book.image}"
                    alt="${book.title}">

                <div class="book-card-content">

                    <h3>
                        ${book.title}
                    </h3>

                    <p>
                        <strong>Author:</strong>
                        ${book.author}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${book.category}
                    </p>

                    <span
                        class="book-status ${statusClass}">

                        ${book.status}

                    </span>

                    <button
                        class="borrow-button"
                        onclick="borrowBook(${book.id})"
                        ${disabledText}>

                        ${buttonText}

                    </button>

                </div>

            `;


            // Add the completed card to the books grid//
            booksGrid.appendChild(
                bookCard
            );

        }
    );

}
//=======Filter Books Function========//

function filterBooks() {

    // Get what the user typed
    const searchText =
        bookPageSearch.value
        .toLowerCase()
        .trim();


    // Get selected category
    const selectedCategory =
        categoryFilter.value;


    // Get selected status
    const selectedStatus =
        statusFilter.value;

    // Create an empty array
    // This will store matching books
    const filteredBooks = [];


    // Check every book
    libraryBooks.forEach(
        function (book) {


            // =====CHECK SEARCH====//

            const title =
                book.title.toLowerCase();

            const author =
                book.author.toLowerCase();


            let matchesSearch = false;


            if (
                title.includes(searchText)
                ||
                author.includes(searchText)
            ) {

                matchesSearch = true;

            }


            //=====CHECK CATEGORY=====//

            let matchesCategory = false;


            if (
                selectedCategory === "all"
                ||
                book.category === selectedCategory
            ) {

                matchesCategory = true;

            }


            //=====Check Status=====/

            let matchesStatus = false;


            if (
                selectedStatus === "all"
                ||
                book.status === selectedStatus
            ) {

                matchesStatus = true;

            }


            //=====Add Matching Book=====//

            if (
                matchesSearch === true
                &&
                matchesCategory === true
                &&
                matchesStatus === true
            ) {

                filteredBooks.push(book);

            }

        }
    );


    // Show filtered books
    displayBooks(filteredBooks);

}



// ======BORROW BOOK FUNCTION=======//

function borrowBook(bookId) {

    // Create variable for selected book
    let selectedBook = null;


    // Search for the correct book
    libraryBooks.forEach(
        function (book) {

            if (book.id === bookId) {

                selectedBook = book;

            }

        }
    );


    // If book was not found, stop
    if (selectedBook === null) {

        return;

    }


    // Check if book is already borrowed
    if (
        selectedBook.status ===
        "Borrowed"
    ) {

        alert(
            "This book is already borrowed."
        );

        return;

    }


    // Change status to Borrowed
    selectedBook.status =
        "Borrowed";


    // Tell the user
    alert(
        "You borrowed: " +
        selectedBook.title
    );


    // Refresh the displayed books
    filterBooks();

}
//==========MEMBER DATA================//

//This array stores library members//
const libraryMembers = [
    {
        id: 1,
        name: "Emily Johnson",
        email: "emily@email.com"
    },
    {
        id: 2,
        name: "Michael William",
        email: "michael@email.com"
    },
    {
        id: 3,
        name: "Sarah Bowen",
        email: "sarah@email.com"
    },
];
//Find Member HTML ELEMENTS//

//Area where member cards appear//
const membersGrid = document.getElementById("membersGrid");

//Member search box//
const memberSearch = document.getElementById("memberSearch");

//Number of members//
const memberCount = document.getElementById("memberCount");

//No members found message//
const noMembersMessage = document.getElementById("noMembersMessage");

//Add member form//
const memberForm = document.getElementById("memberForm");

//Member name input//
const memberName = document.getElementById("memberName");

//Member email input//
const memberEmail = document.getElementById("memberEmail");

//Message after adding member//
const memberMessage = document.getElementById("memberMessage");

//Start Members Page//

//Only run this code on members.html//
if (
        membersGrid &&
        memberSearch &&
        memberCount &&
        noMembersMessage
) {

    //Show all members
    displayMembers(libraryMembers);

    //Search members while typing
    memberSearch.addEventListener(
        "input",
        searchMembers
    );

}
//Display Members Function//
function displayMembers(
    membersToDisplay
) {
    //Remove old number cards//
    membersGrid.innerHTML = "";

    //Show number of members//
    memberCount.textContent = membersToDisplay.length + "members";

    //Check if no members were found//
    if (
        membersToDisplay.length === 0
    ) {
        noMembersMessage.style.display = "block";
        
        return;
    } else {
        noMembersMessage.style.display = "none";
    }

    //Go through each member//
    membersToDisplay.forEach(
        function(member) {

            //Create a new div
            const memberCard = document.createElement("div");

            //Add CSS class//
            memberCard.classList.add(
                "member-card"
            );

            //Create HTML inside card//
            memberCard.innerHTML = `
                <p class="member-id">
                    Member ID:
                    ${member.id}
                </p>
                
                <h3>${member.name}
                </h3>

                <p>
                <strong>Email:</strong>
                ${member.email}
                </p>

            `;

            //Add member card to page//

            membersGrid.appendChild(memberCard);
        }
    )
}
//Search Members Function//
function searchMembers() {
    //Get what user typed

    const searchText = memberSearch.value
                        .toLowerCase()
                        .trim();

    //Create empty array//
    const filteredMembers =[];

    //Check each member//

    libraryMembers.forEach(
        function(member) {
            
            //Change name to lowercase//
            const name = member.name.toLowerCase();
            //Change email to lowercase//
            const email = member.email.toLowerCase();

            //Check if name or email//
            //contains search text//

            if (
                name.includes(searchText)
                ||
                email.includes(searchText)
            ) {
                filteredMembers.push(
                    member
                );
            }
        }
    );

    //Display matching members
    displayMembers(
        filteredMembers
    );

}

//Add New Member//
if(memberForm) {
    memberForm.addEventListener(
        "submit",
        function (event) {
            //stop page from refreshing//
            event.preventDefault();

            //Get name entered by user//
            const newName = memberName.value.trim();

            //Get email entered by user//
            const newEmail = memberEmail.value.trim();

            //Check empty fields//
            if (
                newName === ""
                ||
                newEmail === ""
            ) {
                memberMessage.textContent = "Please complete all fields.";

                return;
            }

            //Create new member object//
            const newMember = {
                id:
                    libraryMembers.length + 1,
                name:
                    newName,
                email:
                    newEmail        
            };

            //Add new member to array//
            libraryMembers.push(
                newMember
            );

            //Display updated members//
            displayMembers(
                libraryMembers
            );

            //Show success message
            memberMessage.textContent = "Member added successfully!";

            //Clear form//
            memberForm.reset();

        }
    );
}

//=====Borrow=====//
//find the borrow form//
const borrowForm =
    document.getElementById("borrowForm");

//find member dropdown//
const borrowMember =
    document.getElementById("borrowMember");
    
//find book dropdown//
const borrowBookSelect =
    document.getElementById("borrowBook");
    
//find message paragraph//
const borrowMessage =
    document.getElementById("borrowMessage");

//=====Borrow Form=====//
if (
    borrowForm &&
    borrowMember &&
    borrowBookSelect &&
    borrowMessage
 ) {
    borrowForm.addEventListener(
        "submit",
        function (event) {
            //Stop page from refreshing
            event.preventDefault();

            //Get selected member
            const selectedMember = borrowMember.value;

            //Get selected book//
            const selectedBook = borrowBookSelect.value;

            //Check if member was selected//
            if (selectedMember ==="") {
                borrowMessage.textContent = "Please select a member.";

                return;
            }

            //Check if book was selected//
            if(selectedBook === "") {
                borrowMessage.textContent = "Please select a book.";

                return;
            }

            //Show success message//
            borrowMessage.textContent = selectedMember +
                                        " borrowed " +
                                        selectedBook +
                                        ".";

            //Clear form
            borrowForm.reset();                            
                                        
        }
    )
}
//=====DASHBOARD HTML ELEMENTS=====//
//Total Books number//
const totalBooks = 
    document.getElementById("totalBooks");

//Total Members number//
const totalMembers =
    document.getElementById("totalMembers");

//Borrowed Books number//
const borrowedBooks =
    document.getElementById("borrowedBooks");
    
//Available Books number//
const availableBooks =
    document.getElementById("availableBooks");

//Start Dashboard Page//
//Only run this code on dashboard.html//
if (
    totalBooks &&
    totalMembers &&
    borrowedBooks &&
    availableBooks
) {
    //Total Books//
    totalBooks.textContent =
        libraryBooks.length;
    /*libraryBooks.length counts how many books are inside the libraryBooks array.*/
    
//====Total Members====//

totalMembers.textContent =
    libraryMembers.length;
    /*libraryMembers.length counts how many members are inside the libraryMembers array.*/

//=====Borrowed and Available Books=====//
let borrowedCount = 0;
let availableCount = 0;

//Check every book//
libraryBooks.forEach(
    function (book) {
        //Is the book borrowed?
        if(book.status === "Borrowed") {
            borrowedCount = borrowedCount +1;
        }

        //Is the book available?
        if (book.status === "Available") {
            availableCount=
                availableCount+1;
        }
    }
);

    //Show Borrowed number//
    borrowedBooks.textContent =
        borrowedCount;

    //Show Available number//
    availableBooks.textContent =
        availableCount;    
}
