// Sample user data
const users = [
    { username: "admin", password: "adminpass", role: "admin" },
    { username: "user", password: "userpass", role: "user" }
];

const books = [];
let currentIndex = -1;

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the user exists
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("bookManagement").style.display = "block";
        document.getElementById("userRole").innerText = `Logged in as: ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`;
        
        if (user.role === "admin") {
            document.getElementById("adminFeatures").style.display = "block"; // Show admin features
        } else {
            document.getElementById("adminFeatures").style.display = "none"; // Hide admin features
        }
    } else {
        document.getElementById("loginError").innerText = "Invalid username or password!";
    }
}

function addBook() {
    const bookName = document.getElementById("bookName").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookImage = document.getElementById("bookImage").value;
    
    if (bookName === "" || bookAuthor === "" || bookImage === "") {
        alert("Please fill out all fields.");
        return;
    }

    if (currentIndex === -1) {
        books.push({ name: bookName, author: bookAuthor, image: bookImage });
    } else {
        books[currentIndex] = { name: bookName, author: bookAuthor, image: bookImage };
        currentIndex = -1;
    }
    
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookImage").value = "";
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    
    books.forEach((book, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${book.name} by ${book.author}
                        <button onclick="editBook(${index})">Edit</button>
                        <button onclick="deleteBook(${index})">Delete</button>`;
        bookList.appendChild(li);
    });
}

function deleteBook(index) {
    books.splice(index, 1);
    displayBooks();
}

function editBook(index) {
    currentIndex = index;
    document.getElementById("bookName").value = books[index].name;
    document.getElementById("bookAuthor").value = books[index].author;
    document.getElementById("bookImage").value = books[index].image;
}

function searchBooks() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchValue) || book.author.toLowerCase().includes(searchValue));
    displayFilteredBooks(filteredBooks);
}

function displayFilteredBooks(filteredBooks) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    
    filteredBooks.forEach((book, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${book.name} by ${book.author}
                        <button onclick="editBook(${index})">Edit</button>
                        <button onclick="deleteBook(${index})">Delete</button>`;
        bookList.appendChild(li);
    });
}

function viewBooks() {
    document.getElementById("bookManagement").style.display = "none";
    document.getElementById("allBooks").style.display = "block";
    displayAllBooks();
}

function displayAllBooks() {
    const bookGallery = document.getElementById("bookGallery");
    bookGallery.innerHTML = "";
    
    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `<img src="${book.image}" alt="${book.name}">
                          <h4>${book.name}</h4>
                          <p>by ${book.author}</p>`;
        bookGallery.appendChild(card);
    });
}

function goBack() {
    document.getElementById("allBooks").style.display = "none";
    document.getElementById("bookManagement").style.display = "block";
}

function logout() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("bookManagement").style.display = "none";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookImage").value = "";
    books.length = 0;  // Clear the book list on logout
    displayBooks();
}
