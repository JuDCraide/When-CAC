import cv2
import os
from concurrent.futures import ThreadPoolExecutor, as_completed


def get_files_from_folder(folder_path):
    all_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            all_files.append(os.path.join(root, file))
    
    return all_files

def convert_image(image_path):
    dest_image_path = image_path.replace('./thumbnails','../frontend/thumbnails' )
    jpg_img = cv2.imread(image_path)
    cv2.imwrite(dest_image_path, jpg_img, [int(cv2.IMWRITE_JPEG_QUALITY), 60])

def safe_convert(f):
    try:
        convert_image(f)
    except Exception:
        print(f)

files = get_files_from_folder('./thumbnails/')
with ThreadPoolExecutor(max_workers=8) as executor:
    futures = [executor.submit(safe_convert, f) for f in files]