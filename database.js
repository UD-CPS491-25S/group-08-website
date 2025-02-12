const neo4j = require("neo4j-driver");

// Neo4j Database Connection Setup
const driver = neo4j.driver(
  "bolt://localhost",  // Neo4j URI (assuming Neo4j is running locally)
  neo4j.auth.basic("neo4j", "alexislane")  // Neo4j credentials
);

// Create a session for querying the database
const session = driver.session();

// Function to get all items with their categories and subcategories
async function getItems() {
  try {
    const result = await session.run(`
      MATCH (i:Item)-[:BELONGS_TO]->(s:Subcategory)-[:HAS_SUBCATEGORY]->(c:Category)
      RETURN i.name AS itemName, s.name AS subcategoryName, c.name AS categoryName
      LIMIT 100
    `);

    // Map the result to an array of items
    const items = result.records.map(record => ({
      itemName: record.get("itemName"),
      subcategoryName: record.get("subcategoryName"),
      categoryName: record.get("categoryName")
    }));

    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  } finally {
    await session.close(); // Make sure to close the session after the query
  }
}

// Export functions to interact with the database
module.exports = {
  getItems
};
