from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get('/')
async def test_route():
    return {"response": "Hello world!"}

origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)