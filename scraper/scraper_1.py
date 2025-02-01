import scrapetube
import subprocess
import json

CHANNEL_ID = 'UCtrjFP7i92_30uv6IehwE5Q'

videos = scrapetube.get_channel(CHANNEL_ID)

videos_info = []

for video in videos:
    title = video["title"]["runs"][0]["text"]
    video_id = video["videoId"]
    print(title, video_id)
    download_command = f"wget --output-document=./thumbnails/{video_id}.jpg https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
    subprocess.run(download_command, shell=True)
    videos_info.append({
        "title": title,
        "formatted_title" : "",
        "ep" : 0,
        "video_id": video_id,
        "date" : ""
    })

with open("videos_info.json", "w") as f:
    json.dump(videos_info, f, ensure_ascii=False, indent=4)