@echo off
start cmd /k "mongosh"
start cmd /k "cd backend && conda activate base && uvicorn main:app --reload"
start cmd /k "cd frontend-react && npm start"
start cmd /k "cd C:\Users\ashua\Documents\Alex's Desktop\CS Projects\project_pathfinder"