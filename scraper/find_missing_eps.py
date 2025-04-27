import json

videos = []
with open("videos_info.json", "r", encoding="utf-8") as f:
    videos = json.load(f)

all_numbers = [i for i in range(1, videos[0]['ep'] + 1)]
eps = [v['ep'] for v in videos]
print(sorted(list(set(all_numbers) - set(eps))))
