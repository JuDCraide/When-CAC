import json
import re

#PATTERN = r"\b[Ee][Pp][\s\.]*?(\d+)\b"
PATTERN = r"\b([Ee][Pp][\s\.\-:]*?)(\d+)\b"

with open("videos_info.json", "r", encoding="utf-8") as f:
    videos = json.load(f)

for v in videos:
    ep = re.search(PATTERN, v['title'])
    if ep:
        v['ep'] = int(ep.group(2))
        v['formatted_title'] = re.sub(PATTERN, f"{ep.group(1)}???", v['title'])
    else:
        v['ep'] = 0
        v['formatted_title'] = v['title']
    date = v['date']
    if date and len(date) == 8:
        v['date'] = f"{date[:4]}-{date[4:6]}-{date[6:]}"

    
with open("videos_info.json", "w", encoding="utf-8") as f:
    json.dump(videos, f, ensure_ascii=False, indent=4)
