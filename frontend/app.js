document.addEventListener("DOMContentLoaded", function () {
  let total = 0;
  let allItems = []; // Store all items globally

  fetch("http://localhost:3000/api/items")
      .then(response => response.json())
      .then(data => {
          allItems = data; // Store items for searching
          const categoriesDiv = document.getElementById("category");
          const subcategoriesDiv = document.getElementById("subcategory");
          const itemsDiv = document.getElementById("items");
          const searchBar = document.getElementById("search-bar");

          // Create category buttons
          const categories = [...new Set(data.map(item => item.category))];
          categories.forEach(category => {
              const btn = document.createElement("button");
              btn.textContent = category;
              btn.classList.add("category-btn");
              btn.onclick = () => showSubcategories(category);
              categoriesDiv.appendChild(btn);
          });

          // Search bar functionality to filter items
          searchBar.addEventListener("input", function () {
              const searchTerm = searchBar.value.toLowerCase();
              itemsDiv.innerHTML = ""; // Clear item list
              itemsDiv.classList.remove("hidden");

              const filteredItems = allItems.filter(item => 
                  item.item_name.toLowerCase().includes(searchTerm)
              );

              if (filteredItems.length === 0) {
                  itemsDiv.innerHTML = "<p>No matching items found</p>";
              } else {
                  filteredItems.forEach(item => {
                      const btn = document.createElement("button");
                      btn.textContent = `${item.item_name} - $${item.price}`;
                      btn.classList.add("item-btn");
                      btn.onclick = () => addToReceipt(item);
                      itemsDiv.appendChild(btn);
                  });
              }
          });

          function showSubcategories(category) {
              subcategoriesDiv.innerHTML = "";
              itemsDiv.innerHTML = "";
              subcategoriesDiv.classList.remove("hidden");
              itemsDiv.classList.add("hidden");

              const subcategories = [...new Set(allItems.filter(item => item.category === category).map(item => item.subcategory))];
              subcategories.forEach(subcategory => {
                  const btn = document.createElement("button");
                  btn.textContent = subcategory;
                  btn.classList.add("subcategory-btn");
                  btn.onclick = () => showItems(subcategory);
                  subcategoriesDiv.appendChild(btn);
              });
          }

          function showItems(subcategory) {
              itemsDiv.innerHTML = "";
              itemsDiv.classList.remove("hidden");

              const filteredItems = allItems.filter(item => item.subcategory === subcategory);
              filteredItems.forEach(item => {
                  const btn = document.createElement("button");
                  btn.textContent = `${item.item_name} - $${item.price}`;
                  btn.classList.add("item-btn");
                  btn.onclick = () => addToReceipt(item);
                  itemsDiv.appendChild(btn);
              });
          }

          function addToReceipt(item) {
              const receiptList = document.getElementById("receipt-list");
              const listItem = document.createElement("li");
              listItem.textContent = `${item.item_name} - $${item.price}`;
              receiptList.appendChild(listItem);

              total += parseFloat(item.price);
              document.getElementById("total").textContent = total.toFixed(2);
          }
      })
      .catch(error => console.error("Error fetching items:", error));
});
