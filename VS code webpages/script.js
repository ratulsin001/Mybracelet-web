// 
      var MenuItems = document.getElementById("MenuItems");
      MenuItems.style.maxHeight="0px";
      function menutoggle(){
        if(MenuItems.style.maxHeight=="0px"){
          MenuItems.style.maxHeight="200px";
        }
        else{
          MenuItems.style.maxHeight="0px";
        }
      }
      // ✅ Shared cart functions

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price: parseInt(price), image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) cartCountElement.textContent = count;
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
