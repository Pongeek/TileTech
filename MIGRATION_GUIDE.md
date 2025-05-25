# TileTech Web - Migration Guide

This guide will help you move your TileTech Web project to your main PC while preserving the complete Task Master workflow.

## 📋 Pre-Migration Checklist

- [ ] Ensure all current work is committed to Git
- [ ] Note your current API keys and environment variables
- [ ] Verify Task Master is working on current machine
- [ ] Check that all tasks are up to date

## 🚀 Migration Steps

### Step 1: Prepare Current Project

```bash
# Commit any pending changes
git add .
git commit -m "Pre-migration commit - ready for transfer"
git push origin main  # If using remote repository
```

### Step 2: Transfer Methods

#### Option A: Git Repository (Recommended)
```bash
# On your main PC:
git clone <your-repository-url>
cd tiletechweb
```

#### Option B: Direct Transfer
1. Create archive excluding: `node_modules/`, `.next/`, `.env`
2. Transfer via USB/cloud storage
3. Extract on main PC

### Step 3: Setup on Main PC

#### Install Dependencies
```bash
npm install
```

#### Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your API keys:
# - ANTHROPIC_API_KEY=your_key_here
# - PERPLEXITY_API_KEY=your_key_here (optional)
# - Any other project-specific variables
```

#### Install Task Master Globally
```bash
npm install -g task-master-ai
```

#### Verify Installation
```bash
# Run the verification script
node scripts/verify-migration.js

# Test Task Master
task-master list
task-master next
```

### Step 4: Setup Development Environment

#### Install Cursor (if needed)
1. Download Cursor from https://cursor.sh/
2. Install and open the project folder
3. The MCP server should auto-start with Task Master tools

#### Verify Cursor Integration
1. Open Cursor in the project directory
2. Check that Task Master MCP tools are available
3. Test a simple command like viewing tasks

## 🔧 Environment Variables Required

Create your `.env` file with these variables:

```env
# Required for Task Master AI features
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional for enhanced research features
PERPLEXITY_API_KEY=your_perplexity_key_here

# Project-specific variables (check .env.example for others)
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
# ... other variables from .env.example
```

## ✅ Verification Checklist

Run the verification script to ensure everything is working:

```bash
node scripts/verify-migration.js
```

Manual verification:
- [ ] Project builds successfully (`npm run build`)
- [ ] Development server starts (`npm run dev`)
- [ ] Task Master lists tasks (`task-master list`)
- [ ] Cursor opens project without errors
- [ ] MCP tools are available in Cursor
- [ ] All task files are present in `tasks/` directory

## 🎯 Resume Development Workflow

Once migration is complete:

1. **Check current status:**
   ```bash
   task-master list
   task-master next
   ```

2. **Continue with next task:**
   ```bash
   task-master show <task-id>
   # Work on the task
   task-master set-status --id=<task-id> --status=done
   ```

3. **Use Cursor integration:**
   - Open project in Cursor
   - Use Task Master MCP tools for task management
   - Follow the established workflow patterns

## 🔄 Ongoing Sync (if using multiple machines)

If you plan to work on both machines:

1. **Always commit before switching:**
   ```bash
   git add .
   git commit -m "Work session complete"
   git push
   ```

2. **Always pull before starting:**
   ```bash
   git pull origin main
   ```

3. **Keep Task Master in sync:**
   - Task files are version controlled
   - Environment variables stay local
   - Use consistent Task Master version

## 🆘 Troubleshooting

### Task Master not working
```bash
# Reinstall globally
npm uninstall -g task-master-ai
npm install -g task-master-ai

# Verify installation
task-master --version
```

### Cursor MCP not loading
1. Restart Cursor
2. Check `.cursor/` folder was transferred
3. Verify project root is correct

### Missing environment variables
1. Compare `.env` with `.env.example`
2. Check for any project-specific variables
3. Verify API keys are valid

### Build errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📞 Need Help?

If you encounter issues:
1. Run the verification script: `node scripts/verify-migration.js`
2. Check the troubleshooting section above
3. Ensure all files were transferred correctly
4. Verify environment variables are set

---

**Happy coding on your main PC! 🚀** 