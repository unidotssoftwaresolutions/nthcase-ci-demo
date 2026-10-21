let count = 0;

document.getElementById("add-to-cart").addEventListener("click", () => {
  count += 1;
  document.getElementById("cart-count").textContent = `Cart (${count})`;
  document.getElementById("cart-message").textContent = "Added to cart";
});
