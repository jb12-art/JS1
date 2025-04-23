// JS1 - API Endpoint Rainy Days.

const API_URL = "https://v2.api.noroff.dev/rainy-days";
const container = document.querySelector("#container");
const genderFilter = document.querySelector("#genderFilter");
const loadingIndicator = document.querySelector("#loadingIndicator"); // loading message

let allProducts = []; // Store all products globally

async function fetchAndCreateProducts() {
  try {
    loadingIndicator.classList.remove("hidden"); // show Loading products..., when API products is loading.
    const response = await fetch(API_URL);
    const data = await response.json();
    allProducts = data.data; // Store fetched products

    displayProducts(allProducts); // Display all products initially
  } catch (err) {
    console.error("Error fetching products:", err);
    container.innerHTML =
      "<p class='error-message'>Ops! Failed to load products. Please refresh the page or try again later.</p>";
  } finally {
    loadingIndicator.classList.add("hidden"); // Hide loading
  }
}

function displayProducts(products) {
  container.innerHTML = ""; // Clear previous products

  products.forEach((product) => {
    const card = document.createElement("div");
    const image = document.createElement("img");
    const content = document.createElement("div");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const addToCartBtn = document.createElement("button"); // add product to checkout

    card.className = "card";
    image.className = "card-image";
    content.className = "card-content";
    title.className = "card-title";
    price.className = "card-price";
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
    card.appendChild(image);
    card.appendChild(content);

    container.appendChild(card);
  });
}

// new code, Alerting you when you add product to checkout, Might remove this later and add a number beside the 'add to cart' button.
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart`);
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
