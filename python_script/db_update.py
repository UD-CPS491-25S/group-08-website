import csv
import neo4j
import os

def get_neo4j_driver():
    """Create and return a Neo4j driver."""
    return neo4j.GraphDatabase.driver("bolt://localhost", auth=("neo4j", "alexislane"))

def update_databse_from_csv(csv_file):
    """Update Neo4j database using data from a CSV file."""
    driver = get_neo4j_driver()

    with driver.session() as session:
        with open(csv_file, newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)

            for row in reader:
                subcategory_name = row.get("Subcategory")
                item_name = row.get("Item")
                price_name = row.get("Price")
                quantity_name = row.get("Quantity")

                if subcategory_name and item_name and price_name and quantity_name:
                    session.write_transaction(create_item, subcategory_name, item_name, price_name, quantity_name)

    driver.close()

def create_item(tx, subcategory_name, item_name, price_name, quantity_name):
    """Create or update a subcategory, item, price, and quantity in Neo4j."""
    query = """
    MERGE (s:Subcategory {name: $subcategory_name})
    MERGE (i:Item {name: $item_name})-[:HAS_SUBCATEGORY]->(s)
    MERGE (p:Price {name: $price_name})-[:BELONGS_TO]->(i)
    MERGE (q:Quantity {name: $quantity_name})-[:BELONGS_TO]->(i)
    """
    tx.run(query, subcategory_name=subcategory_name, item_name=item_name, price_name=price_name, quantity_name=quantity_name)

if __name__ == "__main__":
    csv_file = input("Enter the path to the CSV file: ")
    if os.path.exists(csv_file):
        update_databse_from_csv(csv_file)
        print("Database update complete.")
    else:
        print("Error: File not found.")