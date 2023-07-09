import os
import cv2
import pytesseract
from flask import Flask, request, jsonify
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
app = Flask(__name__)

@app.route('/extract_text', methods=['POST'])
def extract_text():
    # Get the file path from the request
    file_path = request.json['file_path']
    print(file_path)
    # Check if the file exists
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'})

    # Load image using OpenCV
    image = cv2.imread(file_path)

    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply image preprocessing if needed (e.g., noise removal, thresholding, etc.)

    # Perform OCR using pytesseract
    text = pytesseract.image_to_string(gray, lang='eng')

    # Process the extracted text to find medicine names
    medicine_names = []

    lines = text.split('\n')
    for line in lines:
        # Add conditions to filter out non-medicine related text
        if 'tab.' in line.lower() or 'cap.' in line.lower():
            medicine_names.append(line)
    print('medicine_names')
    return jsonify(medicine_names)
if __name__ == '__main__':
    app.run()