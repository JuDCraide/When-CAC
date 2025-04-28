import os
from pymongo import MongoClient
from dotenv import load_dotenv
import time


def get_database():
    load_dotenv()
    CONNECTION_STRING = os.getenv('DB_CONN_STRING')
    client = MongoClient(CONNECTION_STRING)
    return client['WhenCAC']


if __name__ == "__main__":   

    dbname = get_database()
    collection = dbname["games"]
    ts = time.time() - (24 * 60 * 60)
    ts = int(ts) * 1000
    query = { "start_timestamp": { "$lt": ts  } } 
    result = collection.delete_many(query)
    print(f"Deleted {result.deleted_count} documents")