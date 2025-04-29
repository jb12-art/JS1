// checkout.js is styled in product.css
// checkout.js connects to folder/file, checkout/index.html
// Add and remove product in cart and in checkout page.

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
    const box = document.createElement("div");
    const image = document.createElement("img");
    const content = document.createElement("div");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const removeBtn = document.createElement("button");

    // style is in product.css
    box.className = "box";
    image.className = "jacket-image";
    content.className = "jacket-content";
    title.className = "jacket-title";
    price.className = "jacket-price";
    removeBtn.className = "removeBtn"; // style is in checkout.css

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

    box.appendChild(image);
    box.appendChild(content);
    cartItemsContainer.appendChild(box);

    total += item.price;
  });

  document.querySelector(".total-text").textContent = `Total $${total.toFixed(
    2
  )}`;

  // Hide loading message after rendering is done
  loadingIndicator.classList.add("hidden");
}

displayCartItems();
