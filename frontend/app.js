document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/items")
      .then(response => response.json())
      .then(data => {
          const itemList = document.getElementById("item-list");
          itemList.innerHTML = ""; // Clear existing content

          data.forEach(item => {
              const listItem = document.createElement("li");
              listItem.textContent = `${item.item_name} - ${item.category} - ${item.subcategory} - ${item.quantity} - $${item.price}`;
              itemList.appendChild(listItem);
          });
      })
      .catch(error => console.error("Error fetching items:", error));
});
