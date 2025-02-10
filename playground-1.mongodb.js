// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert hierarchical merchandise data into the sales collection.
db.getCollection('sales').insertMany([
  { 'category': 'Apparel', 'subCategory': 'T-shirt', 'price': 15, 'date': new Date('2024-01-10T10:00:00Z') },
  { 'category': 'Apparel', 'subCategory': 'Hoodie', 'price': 40, 'date': new Date('2024-01-11T11:30:00Z') },
  { 'category': 'Apparel', 'subCategory': 'Hat', 'price': 60, 'date': new Date('2024-01-12T12:45:00Z') },

  { 'category': 'Beverage', 'subCategory': 'Water', 'price': 2, 'date': new Date('2024-02-01T08:00:00Z') },
  { 'category': 'Beverage', 'subCategory': 'Soda Products', 'item': 'Coke', 'price': 5, 'date': new Date('2024-02-02T09:15:00Z') },
  { 'category': 'Beverage', 'subCategory': 'Soda Products', 'item': 'Root Beer', 'price': 5, 'date': new Date('2024-02-02T09:15:00Z') },
  { 'category': 'Beverage', 'subCategory': 'Soda Products', 'item': 'Sprite', 'price': 5, 'date': new Date('2024-02-02T09:15:00Z') },
  { 'category': 'Beverage', 'subCategory': 'Soda Products', 'item': 'Orange', 'price': 5, 'date': new Date('2024-02-02T09:15:00Z') },
  { 'category': 'Beverage', 'subCategory': 'Soda Products', 'item': 'Diet Coke', 'price': 5, 'date': new Date('2024-02-02T09:15:00Z') },
  { 'category': 'Beverage', 'subCategory': 'Juice/Mocktails', 'item': 'Sparkling Water', 'price': 3, 'date': new Date('2024-02-03T10:30:00Z') },
  { 'category': 'Beverage', 'subCategory': 'Juice/Mocktails', 'item': 'Lemonade', 'price': 3, 'date': new Date('2024-02-03T10:30:00Z') },
  { 'category': 'Beverage', 'subCategory': 'Juice/Mocktails', 'item': 'Apple Juice', 'price': 3, 'date': new Date('2024-02-03T10:30:00Z') },

 
  { 'category': 'Food', 'subCategory': 'Starters', 'item': 'Mozzarella Sticks', 'price': 1.5, 'date': new Date('2024-03-05T14:20:00Z') },
  { 'category': 'Food', 'subCategory': 'Starters', 'item': 'Fries', 'price': 1.5, 'date': new Date('2024-03-05T14:20:00Z') },
  { 'category': 'Food', 'subCategory': 'Starters', 'item': 'Tots', 'price': 1.5, 'date': new Date('2024-03-05T14:20:00Z') },
  { 'category': 'Food', 'subCategory': 'Starters', 'item': 'Loaded Fries', 'price': 1.5, 'date': new Date('2024-03-05T14:20:00Z') },
  { 'category': 'Food', 'subCategory': 'Starters', 'item': 'Loaded Tots', 'price': 1.5, 'date': new Date('2024-03-05T14:20:00Z') },
  { 'category': 'Food', 'subCategory': 'Starters', 'item': 'Fried Pickles', 'price': 1.5, 'date': new Date('2024-03-05T14:20:00Z') },
  { 'category': 'Food', 'subCategory': 'Entrees', 'item': 'Chicken Snack Wrap', 'price': 0.5, 'date': new Date('2024-03-06T15:45:00Z') },
  { 'category': 'Food', 'subCategory': 'Entrees', 'item': 'Shrimp Tacos', 'price': 0.5, 'date': new Date('2024-03-06T15:45:00Z') },
  { 'category': 'Food', 'subCategory': 'Entrees', 'item': 'Big Burger', 'price': 0.5, 'date': new Date('2024-03-06T15:45:00Z') },
  { 'category': 'Food', 'subCategory': 'Entrees', 'item': 'Chicken Tender Sub', 'price': 0.5, 'date': new Date('2024-03-06T15:45:00Z') },
  { 'category': 'Food', 'subCategory': 'Entrees', 'item': 'BLT', 'price': 0.5, 'date': new Date('2024-03-06T15:45:00Z') },
  { 'category': 'Food', 'subCategory': 'Entrees', 'item': 'Salad', 'price': 0.5, 'date': new Date('2024-03-06T15:45:00Z') },
  { 'category': 'Food', 'subCategory': 'Entrees', 'item': 'Chicken Tender Combo', 'price': 0.5, 'date': new Date('2024-03-06T15:45:00Z') },
  { 'category': 'Food', 'subCategory': 'Wings', 'item': '6 for $10', 'price': 10, 'date': new Date('2024-03-07T16:10:00Z') },
  { 'category': 'Food', 'subCategory': 'Wings', 'item': '8 for $12', 'price': 12, 'date': new Date('2024-03-07T16:10:00Z') },
  { 'category': 'Food', 'subCategory': 'Wings', 'item': '12 for $16', 'price': 16, 'date': new Date('2024-03-07T16:10:00Z') }
]);

// Find all sales within February 2024.
const salesInFebruary = db.getCollection('sales').find({
  date: { $gte: new Date('2024-02-01'), $lt: new Date('2024-03-01') }
}).count();

// Print a message to the output window.
console.log(`${salesInFebruary} sales occurred in February 2024.`);

// Aggregation to find total sales per category.
db.getCollection('sales').aggregate([
  // Group by category and calculate total sales amount
  { $group: { _id: '$category', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
