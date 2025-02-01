import subprocess
import json
from concurrent.futures import ThreadPoolExecutor

with open("videos_info.json", "r", encoding="utf-8") as f:
    videos = json.load(f)

def fetch_video_date(video):
    print(video['title'])
    if video['date'] != "":
        return video
    url = f"https://www.youtube.com/watch?v={video['video_id']}"
    command = f'.\yt-dlp.exe -s "{url}" -j'
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True)
    output = json.loads(process.stdout.readline())
    video['date'] = output['upload_date']
    return video

with ThreadPoolExecutor(max_workers=15) as executor:
    videos = list(executor.map(fetch_video_date, videos))


with open("videos_info.json", "w", encoding="utf-8") as f:
    json.dump(videos, f, ensure_ascii=False, indent=4)