import scrapetube
import subprocess
import json
import re
from concurrent.futures import ThreadPoolExecutor

CHANNEL_ID = 'UCtrjFP7i92_30uv6IehwE5Q'
PATTERN = r"\b([Ee][Pp][\s\.\-:]*?)(\d+)\b"

#Step 1

all_videos = scrapetube.get_channel(CHANNEL_ID)

videos_info = []

with open("videos_info.json", "r", encoding="utf-8") as f:
    videos_info = json.load(f)

all_videos = filter(lambda video: all(video["videoId"] != video_info["video_id"] for video_info in videos_info), all_videos)

for video in all_videos:
    title = video["title"]["runs"][0]["text"]
    video_id = video["videoId"]
    print(title, video_id)
    download_command = f"wget --output-document=../frontend/thumbnails/{video_id}.jpg https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
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

#Step 2

with open("videos_info.json", "r", encoding="utf-8") as f:
    videos = json.load(f)

def fetch_video_date(video):
    print(video['title'])
    if video['date'] != "":
        return video
    
    #Get Video Date
    url = f"https://www.youtube.com/watch?v={video['video_id']}"
    command = f'./yt-dlp_linux -s "{url}" -j'
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True)
    output = json.loads(process.stdout.readline())
    video['date'] = output['upload_date']

    #Format fields
    ep = re.search(PATTERN, video['title'])
    if ep:
        video['ep'] = int(ep.group(2))
        video['formatted_title'] = re.sub(PATTERN, f"{ep.group(1)}???", video['title'])
    else:
        video['ep'] = 0
        video['formatted_title'] = video['title']
    date = video['date']
    if date and len(date) == 8:
        video['date'] = f"{date[:4]}-{date[4:6]}-{date[6:]}"
    return video

with ThreadPoolExecutor(max_workers=15) as executor:
    videos = list(executor.map(fetch_video_date, videos))

videos = sorted(videos, key=lambda video: video["ep"], reverse=True)

with open("videos_info.json", "w", encoding="utf-8") as f:
    json.dump(videos, f, ensure_ascii=False, indent=4)