from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from model.predict import predict_emotion_file

app = FastAPI()

@app.post("/predict")
async def predict_emotion_api(file: UploadFile = File(...)):
    # Read file contents as a stream
    label = predict_emotion_file(file.file)
    return JSONResponse(content={"emotion": label})
