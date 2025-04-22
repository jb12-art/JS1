// the file checkout.js connects to folder/file, checkout/index.html
// <!-- js code, add and remove product to and from checkout -->

const cartItemsContainer = document.getElementById("cart-items");

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartItemsContainer.innerHTML = "";

  // Calculate total even if cart is empty.
  // cart.forEach((item) => {
  //   total += item.price;
  // });

  // always update total, even if cart is empty.
  // document.querySelector(".total-text").textContent = `Total $${total}`;

  // Handle empty cart.
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".total-text").textContent = "Total $0";
    return;
  }

  function removeFromCart(productToRemove) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // remove the first item that matches the product ID.
    const indexToRemove = cart.findIndex(
      (item) => item.id === productToRemove.id
    );
    if (indexToRemove > -1) {
      cart.splice(indexToRemove, 1); //remove it.
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); // re-render.
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
}

displayCartItems();
