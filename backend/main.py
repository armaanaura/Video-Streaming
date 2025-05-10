from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
from datetime import datetime

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

UPLOAD_DIR = "./recordings"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload_chunk(file: UploadFile = File(...)):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    filename = f"{UPLOAD_DIR}/{timestamp}_{file.filename}"
    with open(filename, "wb") as f:
        f.write(await file.read())
    return {"status": "saved", "filename": filename}
