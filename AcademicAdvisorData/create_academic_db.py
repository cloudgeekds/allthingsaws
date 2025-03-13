import sqlite3
import pandas as pd
import os

# Function to create SQLite DB table from CSV
def create_db_table_from_csv(csv_file_path, db_name, table_name):
    # Read the CSV file into a DataFrame
    print(f"Processing {csv_file_path}...")
    df = pd.read_csv(csv_file_path)
    
    # Connect to the SQLite database (or create it if it doesn't exist)
    conn = sqlite3.connect(db_name)
    
    # Write the DataFrame to an SQLite table
    df.to_sql(table_name, conn, if_exists='replace', index=False)
    
    print(f"Created table '{table_name}' successfully")
    
    # Close the connection
    conn.close()

def create_db_tables_from_csv_files(csv_file_paths, db_name, table_names):
    # Ensure the list of CSV file paths and table names are of the same length
    if len(csv_file_paths) != len(table_names):
        raise ValueError("The number of CSV files must match the number of table names.")
    
    # Iterate over the CSV file paths and table names
    for csv_file_path, table_name in zip(csv_file_paths, table_names):
        if not os.path.exists(csv_file_path):
            print(f"Warning: File not found - {csv_file_path}")
            continue
        create_db_table_from_csv(csv_file_path, db_name, table_name)

if __name__ == "__main__":
    # Define your  paths and names
    csv_file_paths = [
        'data/porterville_student_schedule.csv',
        'data/porterville_student_data.csv',
        'data/porterville_course_schedule.csv',
        'data/porterville_student_degree_plan.csv',
    ]
    db_name = 'demo_academic.db'
    table_names = ['student_schedule', 'student_data', 'course_schedule', 'student_degree_plan']

    # Create data directory if it doesn't exist
    if not os.path.exists('data'):
        os.makedirs('data')
        print("Created 'data' directory")

    # Execute the function
    try:
        create_db_tables_from_csv_files(csv_file_paths, db_name, table_names)
        print(f"\nDatabase '{db_name}' created successfully!")
        
        # Verify the tables
        conn = sqlite3.connect(db_name)
        for table in table_names:
            result = pd.read_sql_query(f"SELECT COUNT(*) as count FROM {table}", conn)
            print(f"Table '{table}' has {result['count'][0]} rows")
        conn.close()
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
