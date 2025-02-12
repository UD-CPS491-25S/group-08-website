const API_URL = "http://localhost:3000/items"; // The endpoint to fetch items

// Function to load items from the backend
function loadItems() {
  console.log("Loading items...");

  fetch(API_URL)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(items => {
      console.log("Items fetched:", items); // Log the fetched items

      const list = document.getElementById("item-list"); // The element where items will be displayed
      list.innerHTML = ""; // Clear previous list

      if (items.length === 0) {
        list.innerHTML = "No items available.";
        return;
      }

      // Loop through and display items
      items.forEach(item => {
        let itemElement = document.createElement("li");
        itemElement.textContent = `${item.itemName} - Subcategory: ${item.subcategoryName} - Category: ${item.categoryName}`;
        list.appendChild(itemElement);
      });
    })
    .catch(error => {
      console.error("Error loading items:", error);
      document.getElementById("item-list").innerHTML = "Failed to load items.";
    });
}

// Load items on page load
document.addEventListener("DOMContentLoaded", loadItems);
