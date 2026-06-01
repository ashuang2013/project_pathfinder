# Pathfinder 1e Character Sheet

A full stack Pathfinder 1e character sheet application featuring dynamic spell management, skills, inventory, and buff/debuff tracking.

**Live Demo:** https://www.yangystudios.com/

## Stack
- Frontend: React, TypeScript, HTML, CSS - hosted on AWS S3
- Backend: FastAPI (Python) - hosted on AWS EC2 behind nginx
- Database: MongoDB Atlas
- Deployment: AWS EC2, S3, nginx, systemd

## Features
- Component-based React frontend with tab navigation
- Dynamic ability score calculations with live modifier display
- Spell browser with search and filter by name, school, and class
- 625+ spells served from live CRUD REST API
- Custom web scraper (BeautifulSoup) to populate spell database

## Architecture Decisions
- **EC2 over ECS/EKS:** Chose direct EC2 deployment for portfolio 
  simplicity and cost. Containerization with ECS Fargate is the 
  planned production path.
- **MongoDB Atlas over local MongoDB:** Offloads database management,
  provides free tier hosting, and decouples data from compute.
- **S3 static hosting over EC2 frontend:** React builds to static 
  files — S3 is purpose-built for this, cheaper, and more scalable 
  than serving from EC2.

## Roadmap
### Infrastructure
- Docker containerization, ECS Fargate replacing EC2
- CI/CD pipeline via GitHub Actions
- pytest + Jest test suites

### Features
- Character persistence via PostgreSQL (AWS RDS)
- ML recommendation engine
- JWT authentication and multi-character accounts
- Inventory and conditions tabs
- Condition tracking system
- Hover breakdowns on stat cards
- Full spell list import (levels 2-9)
- UI Rework and character microwave