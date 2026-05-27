import os 

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from typing import Optional

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

# client = MongoClient("mongodb://127.0.0.1:27017")
uri = os.getenv("MONGODB_URI")
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["pathfinder"]
spell_collection = db["spells"]

class Spell(BaseModel):
    name: str
    school: str = None
    level: str = None
    casting_time: str = None
    components: str = None
    range: Optional[str] = None
    target: Optional[str] = None
    effect: Optional[str] = None
    duration: Optional[str] = None
    saving_throw: str = None
    spell_resistance: str = None
    description: str = None

@app.get("/spells")
async def read_spells():
    return list(spell_collection.find({}, {"_id": 0}))

@app.get("/spells/{spell_name}")
async def read_spell(spell_name: str):
    return spell_collection.find_one({"name": spell_name}, {"_id": 0})

@app.post("/spells")
async def create_spell(spell: Spell):
    spell_collection.insert_one(spell.model_dump())
    return {"message": f"{spell.name} created"}

@app.put("/spells/{spell_name}")
async def update_spell(spell_name: str, spell: Spell):
    spell_collection.update_one({"name": spell_name}, {"$set": spell.model_dump()})
    return {"message": f"{spell_name} updated"}

@app.delete("/spells/{spell_name}")
async def delete_spell(spell_name: str):
    spell_collection.delete_one({"name": spell_name})
    return {"message": f"{spell_name} deleted"}