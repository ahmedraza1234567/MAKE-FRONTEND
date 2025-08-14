MAKE-FRONTEND Setup Guide
=========================

Follow these steps to set up the project locally:

1. PREREQUISITES
----------------
- Python 3.10+ (https://www.python.org/downloads/)
- Node.js 16+ (https://nodejs.org/)
- MongoDB Atlas account (https://www.mongodb.com/atlas/database)
- Git (https://git-scm.com/downloads)

2. CLONE REPOSITORY
-------------------
git clone https://github.com/ahmedraza1234567/MAKE-FRONTEND.git
cd MAKE-FRONTEND

3. BACKEND SETUP
----------------
cd backend

# Create and activate virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with these variables:
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_random_secret_key_here" >> .env

# Start backend server
uvicorn main:app --reload

4. FRONTEND SETUP
-----------------
# Open new terminal window
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev

5. ACCESS APPLICATION
---------------------
Open browser and visit:
http://localhost:5173

6. TROUBLESHOOTING
------------------
Common issues:

Q: MongoDB connection failing?
A: Ensure your MONGO_URI in .env is correct and IP is whitelisted in Atlas

Q: Node.js/npm errors?
A: Try:
   - rm -rf node_modules/
   - npm cache clean --force
   - npm install

Q: Python package errors?
A: Ensure virtualenv is activated and try:
   - pip install --upgrade pip
   - pip install -r requirements.txt

7. DEFAULT CREDENTIALS (for testing)
------------------------------------
Email: test@example.com
Password: Test@123

8. PROJECT STRUCTURE
--------------------
backend/        - FastAPI server code
  ├── main.py           - API routes
  ├── models.py         - Database models
  ├── requirements.txt  - Python dependencies
  └── .env              - Environment config

frontend/       - React application
  ├── public/           - Static assets
  ├── src/              - React components
  └── package.json     - Frontend dependencies

For support, contact:
Shaikh Ahmed Raza
