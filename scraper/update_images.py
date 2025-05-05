import os
import subprocess
# ../frontend/thumbnails/-CxO9PIcBjI.jpg
# ../frontend/thumbnails/2ivH3WqyR-k.jpg
# ../frontend/thumbnails/Aa4mZ1NfvwY.jpg
# ../frontend/thumbnails/ATqwJEJrPR4.jpg
# ../frontend/thumbnails/bCBgwBSyB9s.jpg
# ../frontend/thumbnails/c4v9oPz4jbA.jpg
# ../frontend/thumbnails/ES-3bHqoG9o.jpg
# ../frontend/thumbnails/fewZgz_PIgk.jpg
# ../frontend/thumbnails/k9mDNrehl1U.jpg
# ../frontend/thumbnails/pYyQaUsg8wI.jpg
# ../frontend/thumbnails/u9s1_NzIFJY.jpg
# ../frontend/thumbnails/viIegIih4OM.jpg
# ../frontend/thumbnails/ws98Q9QwXto.jpg
# ../frontend/thumbnails/y2EmJ148wq4.jpg

def get_files_from_folder(folder_path):
    all_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            all_files.append(os.path.join(root, file))
    
    return all_files

files = get_files_from_folder('../frontend/thumbnails/')
for f in files:
    if os.stat(f).st_size == 0:
        video_id = f.split('/')[-1].split('.')[0]
        print(video_id)
        download_command = f"wget --output-document=../frontend/thumbnails/{video_id}.jpg https://img.youtube.com/vi/{video_id}/hqdefault.jpg" 
        subprocess.run(download_command, shell=True)