# main.py - Updated for Deployment
import os
import datetime
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from dotenv import load_dotenv

# Load environment variables from a .env file (for local development)
# This line should be at the top
load_dotenv()

app = FastAPI()

# --- DYNAMIC CORS SETUP ---
# Get the frontend URL from environment variables.
# It defaults to your local Vite server's address if the variable isn't set.

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Use the dynamic URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DYNAMIC MONGODB SETUP ---
# Get your MongoDB Atlas connection string from environment variables.
DATABASE_URL = os.getenv("mongodb+srv://raza10541054:Passwoes@hmed1054@make-front-end.wq5mpv1.mongodb.net/?retryWrites=true&w=majority&appName=make-front-end")

# A check to ensure the app doesn't start without the database URL
if not DATABASE_URL:
    raise Exception("FATAL ERROR: DATABASE_URL environment variable is not set.")

client = MongoClient(DATABASE_URL)
db = client["make_frontend"]  # You can keep your database name
users_collection = db["users"]
designs_collection = db["designs"]

#
# --- YOUR MODELS AND API LOGIC (No changes needed below this line) ---
#

# Models
class User(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class Design(BaseModel):
    email: str
    design_name: str
    html_content: str
    design_data: str

# Helper to convert MongoDB ObjectId to string
def parse_design(design):
    design["_id"] = str(design["_id"])
    return design

# APIs
@app.post("/register")
def register(user: User):
    if "@" not in user.email or "." not in user.email:
        raise HTTPException(400, "Invalid email format")
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(400, "Email already registered")
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(400, "Username already taken")

    users_collection.insert_one(user.dict())
    return {"message": "User registered successfully"}

@app.post("/login")
def login(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(404, "User not found")
    if user["password"] != data.password:
        raise HTTPException(401, "Incorrect password")

    return {
        "message": "Login successful",
        "username": user["username"],
        "email": user["email"]
    }

@app.delete("/delete")
async def delete_user(request: Request):
    data = await request.json()
    email = data.get("email")
    if not email:
        raise HTTPException(400, "Email required")

    # Delete user and all their designs
    result = users_collection.delete_one({"email": email})
    if result.deleted_count == 1:
        designs_collection.delete_many({"email": email})
        return {"message": "Account and designs deleted successfully"}
    raise HTTPException(404, "User not found")

@app.post("/save-design")
def save_design(design: Design):
    if not all([design.email, design.design_name, design.html_content, design.design_data]):
        raise HTTPException(400, "Missing required fields")

    # Verify user exists
    if not users_collection.find_one({"email": design.email}):
        raise HTTPException(404, "User not found")

    design_data = design.dict()
    design_data["created_at"] = datetime.datetime.utcnow()

    try:
        result = designs_collection.insert_one(design_data)
        return {
            "message": "Design saved successfully",
            "design_id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(500, f"Database error: {str(e)}")

@app.get("/user-designs/{email}")
def get_user_designs(email: str):
    if not users_collection.find_one({"email": email}):
        raise HTTPException(404, "User not found")

    designs = list(designs_collection.find({"email": email}))
    return {
        "designs": [parse_design(d) for d in designs]
    }

@app.delete("/delete-design/{design_id}")
async def delete_design(design_id: str, request: Request):
    try:
        data = await request.json()
        email = data.get("email")
        
        if not email:
            raise HTTPException(status_code=400, detail="Email required")
        
        # Verify design exists and belongs to user
        design = designs_collection.find_one({
            "_id": ObjectId(design_id),
            "email": email
        })
        
        if not design:
            raise HTTPException(
                status_code=404,
                detail="Design not found or you don't have permission"
            )
        
        # Perform deletion
        result = designs_collection.delete_one({"_id": ObjectId(design_id)})
        
        if result.deleted_count == 1:
            return {"message": "Design deleted successfully"}
        else:
            raise HTTPException(
                status_code=500,
                detail="Delete operation failed"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid request: {str(e)}"
        )
