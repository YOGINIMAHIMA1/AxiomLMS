let books = [];
let users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" }
];
let userReadingList = [];
let reviews = {};

// Function to handle login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("bookManagement").style.display = "block";
        document.getElementById("userRole").innerHTML = `Logged in as: ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`;
        
        if (user.role === "admin") {
            document.getElementById("adminFeatures").style.display = "block";
        }
    } else {
        document.getElementById("loginError").innerHTML = "Invalid username or password";
    }
}

// Function to add or update a book
function addBook() {
    const bookName = document.getElementById("bookName").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookImage = document.getElementById("bookImage").value;

    const existingBook = books.find(book => book.name === bookName);
    if (existingBook) {
        existingBook.author = bookAuthor;
        existingBook.image = bookImage;
    } else {
        books.push({ name: bookName, author: bookAuthor, image: bookImage });
    }
    displayBooks();
    
    // Clear input fields for new entry
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookImage").value = "";
}

// Function to display books
function displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    books.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `${book.name} by ${book.author} <button onclick="viewBookDetails('${book.name}')">View Details</button>`;
        bookList.appendChild(li);
    });
}

// Function to view book details
function viewBookDetails(bookName) {
    const book = books.find(book => book.name === bookName);
    if (book) {
        document.getElementById("bookManagement").style.display = "none";
        document.getElementById("bookDetails").style.display = "block";
        document.getElementById("bookInfo").innerHTML = `
            <h3>${book.name}</h3>
            <p>Author: ${book.author}</p>
            <img src="${book.image}" alt="Book Image" style="width:150px; height:200px;">
        `;
        displayReviews(bookName);
    }
}

// Function to display reviews
function displayReviews(bookName) {
    const reviewSection = document.getElementById("reviewsList");
    reviewSection.innerHTML = "<h4>Reviews:</h4>";
    if (reviews[bookName]) {
        reviews[bookName].forEach(review => {
            const p = document.createElement("p");
            p.innerHTML = review;
            reviewSection.appendChild(p);
        });
    }
}

// Function to add a review
function addReview() {
    const bookName = document.getElementById("bookInfo").querySelector("h3").innerText;
    const reviewText = document.getElementById("review").value;
    if (reviewText) {
        if (!reviews[bookName]) {
            reviews[bookName] = [];
        }
        reviews[bookName].push(reviewText);
        displayReviews(bookName);
        document.getElementById("review").value = ""; // Clear the input
    }
}

// Function to add book to user reading list
function addToList() {
    const bookName = document.getElementById("bookInfo").querySelector("h3").innerText;
    if (!userReadingList.includes(bookName)) {
        userReadingList.push(bookName);
        alert(`${bookName} added to your list!`);
    } else {
        alert(`${bookName} is already in your list!`);
    }
}

// Function to simulate book purchase
function purchaseBook() {
    const bookName = document.getElementById("bookInfo").querySelector("h3").innerText;
    alert(`You have purchased "${bookName}" successfully!`);
}

// Function to delete a book (Admin-only)
function deleteBook() {
    const bookName = prompt("Enter the name of the book you want to delete:");
    books = books.filter(book => book.name !== bookName);
    displayBooks();
}

// Function to view all registered users (Admin-only)
function viewUsers() {
    alert(`Registered users:\n${users.map(user => `${user.username} (${user.role})`).join('\n')}`);
}

// Function to log out
function logout() {
    document.getElementById("bookManagement").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

// Function to search books
function searchBooks() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm));
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    filteredBooks.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `${book.name} by ${book.author} <button onclick="viewBookDetails('${book.name}')">View Details</button>`;
        bookList.appendChild(li);
    });
}

// Function to go back to the book management page
function goBack() {
    document.getElementById("bookDetails").style.display = "none";
    document.getElementById("bookManagement").style.display = "block";
}
