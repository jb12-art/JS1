// JS1 - API Endpoint Rainy Days.
// script.js is styled in product.css

const API_URL = "https://v2.api.noroff.dev/rainy-days";
const container = document.querySelector("#container");
const genderFilter = document.querySelector("#genderFilter");
const loadingIndicator = document.querySelector("#loadingIndicator"); // loading message

let allProducts = []; // Store all products globally

async function fetchAndCreateProducts() {
  try {
    loadingIndicator.classList.remove("hidden"); // show (Loading products...) message if API products is loading.
    const response = await fetch(API_URL);
    const data = await response.json();
    allProducts = data.data; // Store fetched products

    displayProducts(allProducts); // Display all products initially
  } catch (err) {
    console.error("Error fetching products:", err);
    container.innerHTML =
      "<p class='error-message'>Oops! Failed to load products. Please refresh the page or try again later.</p>";
  } finally {
    loadingIndicator.classList.add("hidden"); // Hide loading
  }
}

function displayProducts(products) {
  container.innerHTML = ""; // Clear previous products

  products.forEach((product) => {
    const box = document.createElement("div");
    const image = document.createElement("img");
    const content = document.createElement("div");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const addToCartBtn = document.createElement("button"); // add product to checkout

    box.className = "box";
    image.className = "jacket-image";
    content.className = "jacket-content";
    title.className = "jacket-title";
    price.className = "jacket-price";
    addToCartBtn.className = "add-to-cart-button"; // add product to checkout

    image.src = product.image.url;
    image.alt = product.image.alt;

    // Make title link to product page
    const titleLink = document.createElement("a");
    titleLink.href = `product/index.html?id=${product.id}`;
    titleLink.textContent = product.title;
    title.appendChild(titleLink);

    price.textContent = `$${product.price}`;
    addToCartBtn.textContent = "Add to Cart"; // add product to checkout

    // add product to checkout
    // Add to cart handler
    addToCartBtn.addEventListener("click", () => {
      addToCart(product);
    });

    content.appendChild(title);
    content.appendChild(price);
    content.appendChild(addToCartBtn); // add product to checkout
    box.appendChild(image);
    box.appendChild(content);

    container.appendChild(box);
  });
}

// Alerting you when you add product to checkout
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBasketDisplay(); // Refresh basket dropdown
  alert(`${product.title} added to cart`);
}

// basket
const basketToggle = document.getElementById("basketToggle");
const basketDropdown = document.getElementById("basketDropdown");
const basketList = document.getElementById("basketList");

// Toggle basket visibility
basketToggle.addEventListener("click", () => {
  basketDropdown.classList.toggle("hidden");
  updateBasketDisplay();
});

// Update basket UI
function updateBasketDisplay() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  basketList.innerHTML = "";

  if (cart.length === 0) {
    basketList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  // Cart items and Remove-button with class"" to style in, styles.css
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("basket-item");
    li.innerHTML = `${item.title} - $${item.price} <button class="remove-button" data-index="${index}">Remove</button>`;
    basketList.appendChild(li);
  });

  // Attach event listeners to remove buttons
  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const indexToRemove = parseInt(e.target.getAttribute("data-index"));
      removeFromCart(indexToRemove);
    });
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove the item at the given index
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBasketDisplay(); // Refresh UI
}

function filterProducts() {
  const selectedGender = genderFilter.value;

  const filteredProducts = allProducts.filter((product) => {
    // Normalize gender values
    const productGender = product.gender.toLowerCase();
    const selectedGenderNormalized = selectedGender.toLowerCase();

    if (!selectedGender) return true; // Show all products if no filter is selected

    return (
      (selectedGenderNormalized === "men" && productGender === "male") ||
      (selectedGenderNormalized === "women" && productGender === "female")
    );
  });

  displayProducts(filteredProducts);
}

// Add event listener for gender filter
genderFilter.addEventListener("change", filterProducts);

fetchAndCreateProducts();
