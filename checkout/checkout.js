// the file checkout.js connects to folder/file, checkout/index.html
// js code, add and remove product to and from checkout

const cartItemsContainer = document.getElementById("cart-items");
const loadingIndicator = document.getElementById("loadingIndicator");

function displayCartItems() {
  // Show loading message
  loadingIndicator.classList.remove("hidden");
  cartItemsContainer.innerHTML = ""; // Clear container early

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  // Handle empty cart
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is empty.</p>';
    document.querySelector(".total-text").textContent = "Total $0";
    loadingIndicator.classList.add("hidden");
    return;
  }

  function removeFromCart(productToRemove) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const indexToRemove = cart.findIndex(
      (item) => item.id === productToRemove.id
    );
    if (indexToRemove > -1) {
      cart.splice(indexToRemove, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); // Re-render after removal
  }

  cart.forEach((item) => {
    const card = document.createElement("div");
    const image = document.createElement("img");
    const content = document.createElement("div");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const removeBtn = document.createElement("button");

    card.className = "card";
    image.className = "card-image";
    content.className = "card-content";
    title.className = "card-title";
    price.className = "removeBtn";

    image.src = item.image.url;
    image.alt = item.image.alt;
    title.textContent = item.title;
    price.textContent = `$${item.price}`;
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
      removeFromCart(item);
    });

    content.appendChild(title);
    content.appendChild(price);
    content.appendChild(removeBtn);

    card.appendChild(image);
    card.appendChild(content);
    cartItemsContainer.appendChild(card);

    total += item.price;
  });

  document.querySelector(".total-text").textContent = `Total $${total}`;

  // Hide loading message after rendering is done
  loadingIndicator.classList.add("hidden");
}

displayCartItems();
