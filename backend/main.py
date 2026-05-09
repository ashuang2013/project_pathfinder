from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

spells = [{"name": "Fireball", "description": "A ball of fire that explodes on impact", "level": 3}, 
          {"name": "Wish", "description": "Wish is the greatest spell a wizard or sorcerer can cast. By simply speaking aloud, you can alter reality to better suit you. Even wish, however, has its limits. A wish can produc any one of the following effects", "level": 9}]

@app.get("/")
async def read_root():
    return {"message": "Welcome to the spell API!"}

@app.get("/spells")
async def read_spells():
    return spells