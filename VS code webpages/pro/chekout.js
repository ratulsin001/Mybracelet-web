document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutTableBody = document.querySelector("#checkoutTable tbody");
  const checkoutTotal = document.getElementById("checkoutTotal");

  let total = 0;
  checkoutTableBody.innerHTML = "";

  cart.forEach(item => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>${item.quantity}</td>
      <td>₹${itemTotal}</td>
    `;
    checkoutTableBody.appendChild(tr);
  });

  checkoutTotal.textContent = total;

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
    localStorage.removeItem("cart");
    updateCartCount();
    checkoutTableBody.innerHTML = "";
    checkoutTotal.textContent = "0";
  });
});
