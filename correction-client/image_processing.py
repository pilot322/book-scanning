import cv2
import numpy as np
import os

log_file = None

def log_message(message):
    log_file.write(message + "\n")

def check_for_blurriness(image, image_path):
    results = {}
    laplacian_var = cv2.Laplacian(image, cv2.CV_64F).var()
    results['laplacian_var'] = laplacian_var
    # print(f"Laplacian variance: {laplacian_var}")
    if laplacian_var < 2000:  # Threshold for blurriness
        print(f"Blurry ", end='')
        results['result'] = True
        return results
    results['result'] = False
    return results

def check_for_thumbs(image, image_path):
    results = {}
    h, w = image.shape
    crop_start = int(0.98 * h)
    cropped_image = image[crop_start:h, 0:w]

    threshold = cv2.threshold(cropped_image, 120, 255, cv2.THRESH_BINARY)[1]
    contours, _ = cv2.findContours(threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    cv2.imwrite(f"books\\thumbs\\thumbs_threshold_{image_path}", threshold)

    log_message(f'Cropped image dimensions: {cropped_image.shape}')

    image_area = cropped_image.shape[0] * cropped_image.shape[1]
    thumbs_area = 0.01 * image_area

    white_area = 0

    for cnt in contours:
        log_message(f'Contour area: {cv2.contourArea(cnt)}')
        area = cv2.contourArea(cnt)
        white_area += area

    if white_area > thumbs_area:
        print(f"Thumb ", end='')
        results['result'] = True
        return results
    
    results['result'] = False
    return results

def check_for_blank(image, image_path):
    results = {}
    h,w = image.shape
    crop_start_w = int(0.2 * w)
    crop_end_w = int(0.8 * w)
    crop_start_h = int(0.1 * h)
    crop_end_h = int(0.9 * h)
    image = image[crop_start_h:crop_end_h, crop_start_w:crop_end_w]

    image_area = image.shape[0] * image.shape[1]
    threshold = cv2.threshold(image, 210, 255, cv2.THRESH_BINARY)[1]
    cv2.imwrite(f"books\\blurry\\blurry_threshold_{image_path}", threshold)
    white_pixels = cv2.countNonZero(threshold)
    white_pixel_ratio = white_pixels / image_area
    print(f"White pixel ratio: {white_pixel_ratio}")
    if white_pixel_ratio > 0.95:  # Threshold for blank page
        print(f"Blank ", end='')
        results['result'] = True
        return results
    
    results['result'] = False
    return False

def check_for_bent(image, image_path):
    edges = cv2.Canny(image, 50, 150, apertureSize=3)
    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, 100, minLineLength=100, maxLineGap=10)

    cv2.imwrite(f"books\\edges\\edges_{image_path}", edges)

    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line[0]
            if abs(y2 - y1) > abs(x2 - x1):
                return True
    return False

def check_for_lightspots(image, image_path):
    results = {}
    light_spots = cv2.threshold(image, 250, 255, cv2.THRESH_BINARY)[1]
    spot_contours, _ = cv2.findContours(light_spots, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    image_area = image.shape[0] * image.shape[1]
    light_spots_area = 0.002 * image_area

    cv2.imwrite(f"books\\lightspots\\lightspots_threshold_{image_path.split('\\')[-1]}", light_spots)

    for cnt in spot_contours:
        area = cv2.contourArea(cnt)
        if area > light_spots_area:
            print(f"Lightspot ", end='')
            results['result'] = True
            return results
    
    results['result'] = False
    return False

def analyze_image(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)    
    image = cv2.resize(image, (0, 0), fx=0.4, fy=0.4)
    
    # Split the image into two halves
    h, w = image.shape
    left_half = image[:, :w//2]
    right_half = image[:, w//2:]

    results = []

    for half, position in zip([left_half, right_half], ["left", "right"]):
        half_path = f"{image_path.split('.')[-2].split('\\')[-1]}_{position}.tif"
        
        print(f"Analyzing {half_path}: ", end='')
        
        # Check for blurriness
        blurry = check_for_blurriness(half, half_path)

        # Check for thumbs and shadows
        thumbs = check_for_thumbs(half, half_path)

        # Check for bent pages by detecting straight lines
        bent = check_for_bent(half, half_path)
        
        # Check for light spots
        light_spots = check_for_lightspots(half, half_path)

        # Check for blank pages
        blank = check_for_blank(half, half_path)

        results.append((position, [blurry, thumbs, bent, light_spots, blank]))
        print()

    return results

def print_separator():
    print("-" * 100)

def analyze_folder(folder_path):
    global log_file
    i = 0
    temp = open("log.txt", "w")
    temp.write("Log file\n")
    temp.close()

    log_file = open("log.txt", "a")
    for filename in os.listdir(folder_path):
        if i < 10 or i >= 50:
            i += 1
            continue

        # print(f"Analyzing {filename}")
        if filename.endswith('.tif'):
            analyze_image(os.path.join(folder_path, filename))
        # print_separator()
        i += 1

    log_file.close()

# Example usage
# analyze_folder('path_to_your_folder')
