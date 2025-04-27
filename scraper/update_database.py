import os
from pymongo import MongoClient
from dotenv import load_dotenv
import json


def get_database():
    load_dotenv()
    CONNECTION_STRING = os.getenv('DB_CONN_STRING')
    client = MongoClient(CONNECTION_STRING)
    return client['WhenCAC']


if __name__ == "__main__":   
    videos = []
    with open("videos_info.json", "r", encoding="utf-8") as f:
        videos = json.load(f)

        videos = sorted(videos, key=lambda video: video["ep"], reverse=True)

        with open("videos_info.json", "w", encoding="utf-8") as f:
            json.dump(videos, f, ensure_ascii=False, indent=4)


    videos = [video for video in videos if video["ep"] > 0]

    dbname = get_database()
    collection = dbname["videos"]
    videos_db = list(collection.find({}))    
    new_videos = list(filter(lambda video: all(video["video_id"] != video_db["video_id"] for video_db in videos_db), videos))

    if len(new_videos) > 0:
        collection.insert_many(new_videos) 
        print(f'{len(new_videos)} new videos')