from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017")
db = client["pathfinder"]
spells_collection = db["spells"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# spells = [{"name": "Fireball", "description": "A ball of fire that explodes on impact", "level": 3}, 
#          {"name": "Wish", "description": "Wish is the greatest spell a wizard or sorcerer can cast. By simply speaking aloud, you can alter reality to better suit you. Even wish, however, has its limits. A wish can produc any one of the following effects", "level": 9}]

@app.get("/")
async def read_root():
    return {"message": "Welcome to the spell API!"}

@app.get("/spells")
async def read_spells():
    spells = list(spells_collection.find({}, {"_id": 0}))
    return spells