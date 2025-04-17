// JS1 - API Endpoint Rainy Days.

const API_URL = "https://v2.api.noroff.dev/rainy-days";
const container = document.querySelector("#container");
const genderFilter = document.querySelector("#genderFilter");

let allProducts = []; // Store all products globally

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allProducts = data.data; // Store fetched products

    displayProducts(allProducts); // Display all products initially
  } catch (err) {
    console.error("Error fetching products:", err);
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
    const anchor = document.createElement("a");

    card.className = "card";
    image.className = "card-image";
    content.className = "card-content";
    title.className = "card-title";
    price.className = "card-price";

    image.src = product.image.url;
    image.alt = product.image.alt;
    title.textContent = product.title;
    price.textContent = `$${product.price}`;
    anchor.href = `product/index.html?id=${product.id}`;

    content.appendChild(title);
    content.appendChild(price);
    card.appendChild(image);
    card.appendChild(content);
    anchor.appendChild(card);

    container.appendChild(anchor);
  });
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
