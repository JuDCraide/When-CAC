from pymongo import MongoClient
import json


def get_database():
    CONNECTION_STRING = ""
    client = MongoClient(CONNECTION_STRING)
    return client['WhenCAC']
  

if __name__ == "__main__":   
    dbname = get_database()
    collection_name = dbname["videos"]
    videos = []
    with open('videos_info.json') as f:
        videos = json.load(f)
    #print(videos)
    collection_name.insert_many(videos)