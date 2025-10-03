const searchBar = document.getElementById("searchBar");
  const productCards = document.querySelectorAll(".product-card");
  const suggestions = document.getElementById("suggestions");

  // Collect product names
  const productNames = Array.from(productCards).map(card => card.querySelector("h3").textContent);

  let currentFocus = -1; // for keyboard navigation

  // Search input typing
  searchBar.addEventListener("keyup", function (e) {
    const searchValue = searchBar.value.toLowerCase();
    let matches = [];

    // Handle arrow keys & enter separately
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
      navigateSuggestions(e);
      return;
    }

    if (searchValue.length > 0) {
      matches = productNames.filter(name => name.toLowerCase().includes(searchValue));
      showSuggestions(matches);
    } else {
      suggestions.style.display = "none";
      resetProducts();
    }

    // Live filter product grid
    productCards.forEach(card => {
      const productName = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = productName.includes(searchValue) ? "block" : "none";
    });
  });

  // Show dropdown suggestions
  function showSuggestions(matches) {
    suggestions.innerHTML = "";
    currentFocus = -1;
    matches.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      li.tabIndex = 0;

      li.addEventListener("click", function () {
        selectSuggestion(name);
      });

      suggestions.appendChild(li);
    });
    suggestions.style.display = matches.length > 0 ? "block" : "none";
  }

  // Navigate with arrow keys
  function navigateSuggestions(e) {
    let items = suggestions.getElementsByTagName("li");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      currentFocus++;
      if (currentFocus >= items.length) currentFocus = 0;
      setActive(items);
    } else if (e.key === "ArrowUp") {
      currentFocus--;
      if (currentFocus < 0) currentFocus = items.length - 1;
      setActive(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (currentFocus > -1) {
        items[currentFocus].click();
      }
    }
  }

  // Highlight active suggestion
  function setActive(items) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("active-suggestion");
    }
    if (currentFocus >= 0) {
      items[currentFocus].classList.add("active-suggestion");
    }
  }

  // Reset product visibility
  function resetProducts() {
    productCards.forEach(card => {
      card.style.display = "block";
    });
  }

  // Apply selected suggestion
  function selectSuggestion(name) {
    searchBar.value = name;
    suggestions.style.display = "none";
    filterByName(name);
  }

  // Filter products by name
  function filterByName(name) {
    const searchValue = name.toLowerCase();
    productCards.forEach(card => {
      const productName = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = productName.includes(searchValue) ? "block" : "none";
    });
  }
  // ✅ Your existing search logic stays as is...

// ✅ Hook Add to Cart buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = button.dataset.price;
      const image = button.dataset.image;
      addToCart(name, price, image);
    });
  });
});
