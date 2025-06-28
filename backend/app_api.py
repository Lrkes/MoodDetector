from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from model.predict import predict_emotion_file

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/predict")
async def predict_emotion_api(file: UploadFile = File(...)): # Expects file as multipart/form-data
    label = predict_emotion_file(file.file)
    return JSONResponse(content={"emotion": label})
