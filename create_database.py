import pandas as pd
import sqlite3

# Load CSV into a DataFrame
csv_file = r"/Users/michaelfrank/Desktop/SP25/CPS 491 - Capstone II/test_beverages.csv"  # Update with your actual CSV file path
df = pd.read_csv(csv_file)

# Connect to SQLite database (or create it)
db_file = "items.db"  # SQLite database file
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Create a table (adjust column types if needed)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        subcategory TEXT,
        item_name TEXT UNIQUE NOT NULL,
        quantity INTEGER DEFAULT NULL,
        price REAL NOT NULL
    )
''')

# Insert DataFrame records into the SQL table
df.to_sql("items", conn, if_exists="replace", index=False)

# Commit and close the connection
conn.commit()
conn.close()

print("Database created successfully!")
