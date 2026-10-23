let count = 0;

const button = document.getElementById("add-to-cart");
const badge = document.getElementById("cart-count");
const message = document.getElementById("cart-message");

button.addEventListener("click", () => {
  count += 1;
  badge.textContent = `Cart (${count})`;
  message.textContent = "Added to cart";
});
