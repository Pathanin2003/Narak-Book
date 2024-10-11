// script.js

// Initialize cart array
let cart = [];

// Function to update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '<h3>Total: $0.00</h3>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <h4>${item.title}</h4>
                <p>Price: $${item.price}</p>
                <button class="remove-from-cart" data-title="${item.title}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += parseFloat(item.price);
        });
        cartTotal.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
    }

    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Function to add item to cart
function addToCart(event) {
    const title = event.target.getAttribute('data-title');
    const price = event.target.getAttribute('data-price');

    cart.push({ title, price });
    updateCartCount();
    displayCartItems();
}

// Function to remove item from cart
function removeFromCart(event) {
    const title = event.target.getAttribute('data-title');
    cart = cart.filter(item => item.title !== title);
    updateCartCount();
    displayCartItems();
}

// Event listeners for add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Display initial cart count
updateCartCount();
// Sample book data for demonstration
const books = [
    {
        title: "นิยายเรื่องนี้ฉันขอไม่เล่น",
        author: "Author Name",
        price: "150฿",
        img: "https://www.naiin.com/product/detail/589606"
    },
    {
        title: "นิยายรักคั่นเวลา",
        author: "Author Name",
        price: "150฿",
        img: "https://www.naiin.com/product/detail/534836"
    },
    {
        title: "นอกชายคา น่าอาศัย",
        author: "Author Name",
        price: "150฿",
        img: "https://www.naiin.com/product/detail/594703"
    }
];

// Display books function
function displayBooks(filteredBooks) {
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = ''; // Clear previous books
    filteredBooks.forEach(book => {
        const bookItem = `
            <div class="book-item">
                <img src="${book.img}" alt="Book Cover">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p class="price">${book.price}</p>
                <button class="add-to-cart" data-title="${book.title}" data-price="${book.price}">Add to Cart</button>
            </div>
        `;
        bookList.innerHTML += bookItem;
    });
}

// Search functionality
document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchInput));
    displayBooks(filteredBooks);
});

// Initial display of all books
displayBooks(books);

