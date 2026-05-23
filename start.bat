@echo off
start powershell -NoExit -Command "mongosh"
start powershell -NoExit -Command "cd backend; conda activate base; uvicorn main:app --reload"
start powershell -NoExit -Command "cd frontend-react; npm start"
start powershell -NoExit