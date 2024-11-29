from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get('/')
async def test_route():
    return {"response": "Hello world!"}

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)