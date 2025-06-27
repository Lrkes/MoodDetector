from transformers import pipeline
from PIL import Image
import io

pipe = pipeline("image-classification", model="dima806/facial_emotions_image_detection")


def predict_emotion_file(file) -> str:
    image = Image.open(file)
    result = pipe(image)
    label = result[0]['label']
    return label