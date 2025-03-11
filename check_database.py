import sqlite3
import pandas as pd

# Connect to the database
conn = sqlite3.connect("items.db")

# Read and display
df = pd.read_sql("SELECT * FROM items;", conn)
print(df)

# Close
conn.close()
