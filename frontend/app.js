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

          let subtotal = 0;
          const TAX_RATE = 0.06;
          let selectedTip = 0; // Stores the selected tip amount

          function addToReceipt(item) {
              const receiptList = document.getElementById("receipt-list");

              const itemPrice = parseFloat(item.price);
              if (isNaN(itemPrice)) {
                  console.error("Invalid price detected for:", item);
                  return;
              }

              // Create a new list item
              const listItem = document.createElement("li");
              listItem.innerHTML = `
                  <span>${item.item_name}</span>
                  <span style="margin-left: auto;">$${itemPrice.toFixed(2)}</span>
              `;

              listItem.style.display = "flex";
              listItem.style.justifyContent = "space-between";
              listItem.style.width = "100%";

              receiptList.appendChild(listItem);

              subtotal += itemPrice;

              updateTotals();
          }

          function updateTotals() {
              const tax = subtotal * TAX_RATE;
              const total = subtotal + tax;

              document.getElementById("subtotal").textContent = subtotal.toFixed(2);
              document.getElementById("tax").textContent = tax.toFixed(2);
              document.getElementById("total").textContent = total.toFixed(2);

              document.getElementById("tip-18").textContent = (total * 0.18).toFixed(2);
              document.getElementById("tip-20").textContent = (total * 0.20).toFixed(2);
              document.getElementById("tip-22").textContent = (total * 0.22).toFixed(2);

              updateFinalTotal();
          }

          function applyTip(tipPercentage, button) {
              const total = subtotal + (subtotal * TAX_RATE);
              selectedTip = total * tipPercentage;

              // Remove active class from all buttons
              document.querySelectorAll(".tip-btn").forEach(btn => btn.classList.remove("active"));

              // Add active class to clicked button
              button.classList.add("active");

              updateFinalTotal();
          }

          function updateFinalTotal() {
              const total = subtotal + (subtotal * TAX_RATE);
              const finalTotal = total + selectedTip;

              document.getElementById("final-total").textContent = finalTotal.toFixed(2);
          }

          function pay() {
              alert(`Final total including tip: $${(subtotal + (subtotal * TAX_RATE) + selectedTip).toFixed(2)}`);
          }

          // ✅ Event Listeners for Tip Buttons (Fixes Clickability)
          document.addEventListener("DOMContentLoaded", () => {
              document.querySelectorAll(".tip-btn").forEach(button => {
                  button.addEventListener("click", function() {
                      applyTip(parseFloat(this.dataset.tip), this);
                  });
              });

              document.getElementById("pay-btn").addEventListener("click", pay);
          });




        



        
      })
      .catch(error => console.error("Error fetching items:", error));
});
