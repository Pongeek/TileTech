# TileTech Web - Docker Migration Guide

This guide shows how to use Docker containers for migrating and running your TileTech Web project with Task Master across different machines.

## 🐳 Why Use Docker for Migration?

### **Benefits:**
- ✅ **Consistent Environment** - Same Node.js version, dependencies, and Task Master setup everywhere
- ✅ **Easy Migration** - Just transfer the project folder and run `docker-compose up`
- ✅ **No Local Setup** - No need to install Node.js, npm, or Task Master on the host machine
- ✅ **Isolated Environment** - Doesn't interfere with other projects or system packages
- ✅ **Version Control** - Docker configuration is version controlled with your project
- ✅ **Quick Cleanup** - Easy to remove everything with `docker-compose down`

### **Trade-offs:**
- ⚠️ **Docker Required** - Need Docker installed on both machines
- ⚠️ **Resource Usage** - Slightly more memory/CPU usage than native
- ⚠️ **Learning Curve** - Need basic Docker knowledge

## 🚀 Migration Methods

### **Method 1: Git + Docker (Recommended)**

#### **On Current Machine:**
```bash
# Commit and push (already done)
git add .
git commit -m "Add Docker configuration"
git push origin main
```

#### **On Main PC:**
```bash
# 1. Install Docker Desktop (if not installed)
# Download from: https://www.docker.com/products/docker-desktop

# 2. Clone the repository
git clone https://github.com/Pongeek/TileTech.git
cd TileTech

# 3. Create environment file
cp .env.example .env
# Edit .env with your API keys

# 4. Start the application
docker-compose up -d

# 5. Verify it's working
docker-compose logs -f tiletechweb
```

### **Method 2: Direct Transfer + Docker**

#### **Package for Transfer:**
```bash
# Create a migration package (excluding unnecessary files)
tar -czf tiletechweb-migration.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude=.env \
  .
```

#### **On Main PC:**
```bash
# 1. Install Docker Desktop
# 2. Extract the package
tar -xzf tiletechweb-migration.tar.gz
cd tiletechweb

# 3. Setup environment
cp .env.example .env
# Edit .env with your API keys

# 4. Start with Docker
docker-compose up -d
```

## 🛠️ Docker Commands Reference

### **Development Commands:**

```bash
# Start the application (detached)
docker-compose up -d

# View logs
docker-compose logs -f tiletechweb

# Stop the application
docker-compose down

# Rebuild after code changes
docker-compose up --build

# Run Task Master commands
docker-compose exec tiletechweb task-master list
docker-compose exec tiletechweb task-master next
docker-compose exec tiletechweb task-master show 1

# Access container shell
docker-compose exec tiletechweb sh

# Start with Task Master tools container
docker-compose --profile tools up -d
```

### **Task Master in Docker:**

```bash
# List tasks
docker-compose exec tiletechweb task-master list

# Get next task
docker-compose exec tiletechweb task-master next

# View specific task
docker-compose exec tiletechweb task-master show <id>

# Update task status
docker-compose exec tiletechweb task-master set-status --id=<id> --status=done

# Run verification script
docker-compose exec tiletechweb node scripts/verify-migration.js
```

## 📁 File Structure with Docker

```
tiletechweb/
├── Dockerfile              # Development container
├── Dockerfile.prod         # Production container
├── docker-compose.yml      # Development setup
├── docker-compose.prod.yml # Production setup
├── .dockerignore           # Files to exclude from build
├── .env.example            # Environment template
├── .env                    # Your API keys (create this)
├── src/                    # Source code (mounted as volume)
├── tasks/                  # Task Master files (mounted)
├── scripts/                # Scripts (mounted)
└── .cursor/                # Cursor rules (mounted)
```

## 🔧 Environment Setup

### **Required Environment Variables:**

Create `.env` file with:
```env
# Required for Task Master
ANTHROPIC_API_KEY=your_anthropic_key_here
PERPLEXITY_API_KEY=your_perplexity_key_here

# Task Master Configuration
MODEL=claude-3-7-sonnet-20250219
MAX_TOKENS=64000
TEMPERATURE=0.2
DEBUG=false
LOG_LEVEL=info
DEFAULT_SUBTASKS=5
DEFAULT_PRIORITY=medium
PROJECT_NAME=TileTech Web

# Add other project-specific variables from .env.example
```

## 🎯 Development Workflow with Docker

### **Daily Development:**

1. **Start the environment:**
   ```bash
   docker-compose up -d
   ```

2. **Check current tasks:**
   ```bash
   docker-compose exec tiletechweb task-master list
   docker-compose exec tiletechweb task-master next
   ```

3. **Develop normally:**
   - Edit files in your IDE (changes are live-reloaded)
   - Access app at http://localhost:3000
   - Use Task Master commands via `docker-compose exec`

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

5. **Stop when done:**
   ```bash
   docker-compose down
   ```

### **Using with Cursor:**

1. **Open project in Cursor** (on host machine)
2. **Start Docker containers** in terminal
3. **Use Cursor normally** for editing
4. **Run Task Master commands** via Docker exec

**Note:** Cursor MCP integration works with the host files, while the app runs in Docker.

## 🔄 Syncing Between Machines

### **Machine A → Machine B:**
```bash
# On Machine A
git add .
git commit -m "Work session complete"
git push

# On Machine B
git pull
docker-compose up -d
```

### **Keep Docker Images Updated:**
```bash
# Rebuild when Dockerfile changes
docker-compose build --no-cache

# Update base images
docker-compose pull
```

## 🚨 Troubleshooting

### **Container Won't Start:**
```bash
# Check logs
docker-compose logs tiletechweb

# Rebuild container
docker-compose build --no-cache tiletechweb
docker-compose up -d
```

### **Task Master Not Working:**
```bash
# Check if Task Master is installed in container
docker-compose exec tiletechweb which task-master
docker-compose exec tiletechweb task-master --version

# Rebuild if needed
docker-compose build --no-cache
```

### **Environment Variables Not Loading:**
```bash
# Check if .env file exists and is readable
ls -la .env
docker-compose exec tiletechweb env | grep ANTHROPIC
```

### **Port Already in Use:**
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### **File Changes Not Reflecting:**
```bash
# Check volume mounts
docker-compose exec tiletechweb ls -la /app/src

# Restart container
docker-compose restart tiletechweb
```

## 🏭 Production Deployment

For production deployment:

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Run production container
docker-compose -f docker-compose.prod.yml up -d

# Or use the production Dockerfile directly
docker build -f Dockerfile.prod -t tiletechweb:prod .
docker run -d -p 3000:3000 --env-file .env.production tiletechweb:prod
```

## 📊 Comparison: Docker vs Native

| Aspect | Docker | Native |
|--------|--------|--------|
| **Setup Time** | 5 minutes | 15-30 minutes |
| **Consistency** | ✅ Identical everywhere | ⚠️ May vary |
| **Dependencies** | ✅ Containerized | ❌ Manual install |
| **Cleanup** | ✅ `docker-compose down` | ❌ Manual removal |
| **Resource Usage** | ⚠️ Slightly higher | ✅ Lower |
| **Performance** | ⚠️ Small overhead | ✅ Native speed |
| **Learning Curve** | ⚠️ Docker knowledge needed | ✅ Standard Node.js |

## 🎉 Quick Start Summary

**For immediate migration to your main PC:**

1. **Install Docker Desktop** on main PC
2. **Clone repository:** `git clone https://github.com/Pongeek/TileTech.git`
3. **Setup environment:** `cp .env.example .env` (add your API keys)
4. **Start everything:** `docker-compose up -d`
5. **Verify:** `docker-compose exec tiletechweb task-master list`
6. **Develop:** Open in Cursor, edit files normally, use Docker for Task Master commands

**That's it! Your complete development environment with Task Master is running! 🚀** 