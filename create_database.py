import pandas as pd
import sqlite3

<<<<<<< HEAD
csv_file = r"C:\Users\Owner\Downloads\test_beverages.csv"  # Each of us have our own path
=======
# Load CSV into a DataFrame
csv_file = r"/Users/michaelfrank/Desktop/SP25/CPS 491 - Capstone II/test_beverages.csv"  # Update with your actual CSV file path
>>>>>>> 40ac7d3174ddf7a362857765caad2c713538c8df
df = pd.read_csv(csv_file)

# Connect to SQLite database (or create it)
db_file = "items.db"  # new file name
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# creates a table
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

df.to_sql("items", conn, if_exists="replace", index=False)

conn.commit()
conn.close()

# database was successfully created in items.db
print("Database created successfully!")
