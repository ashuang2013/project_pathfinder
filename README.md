# Pathfinder 1e Character Sheet

A full stack Pathfinder 1e character sheet application featuring dynamic spell management, skills, inventory, and buff/debuff tracking.

**Live Demo:** https://www.yangystudios.com/

## Stack
- Frontend: React, JavaScript, HTML, CSS - hosted on AWS S3
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
- TypeScript migration
- PostgreSQL for character persistence
- ECS Fargate containerization
- Skills and inventory tabs
- Buffs and conditions system

## Planned Additions
- Rework ui for the search bar
- Make field nonlethal enterable, strength should not be changeable later
- Hover over cards for breakdowns (40 Dex = 10 base + 8 Belt of Incredible Dexterity + 10 Tome of Incredible Dex + 12 Miscellaneous)
- Character persistence 
- Import all spell lists
- Import classes
- Rework UI