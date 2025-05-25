#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 TileTech Web - Pre-Migration Checklist\n');

const checks = [
  {
    name: 'Git repository status',
    check: () => {
      try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        return { clean: status.trim() === '', status: status.trim() };
      } catch (error) {
        return { clean: false, error: 'Not a git repository' };
      }
    },
    action: (result) => {
      if (result.error) {
        console.log('   ❌ Not a git repository');
        console.log('   💡 Consider initializing git: git init');
        return false;
      } else if (result.clean) {
        console.log('   ✅ Working directory clean');
        return true;
      } else {
        console.log('   ⚠️  Uncommitted changes found:');
        console.log('   ' + result.status.split('\n').join('\n   '));
        console.log('   💡 Commit changes: git add . && git commit -m "Pre-migration commit"');
        return false;
      }
    }
  },
  {
    name: 'Remote repository configured',
    check: () => {
      try {
        const remote = execSync('git remote -v', { encoding: 'utf8' });
        return { hasRemote: remote.includes('origin'), remote: remote.trim() };
      } catch (error) {
        return { hasRemote: false, error: error.message };
      }
    },
    action: (result) => {
      if (result.hasRemote) {
        console.log('   ✅ Remote repository configured');
        console.log('   📍 ' + result.remote.split('\n')[0]);
        return true;
      } else {
        console.log('   ⚠️  No remote repository configured');
        console.log('   💡 Add remote: git remote add origin <your-repo-url>');
        return false;
      }
    }
  },
  {
    name: 'Environment variables documented',
    check: () => {
      const hasEnvExample = fs.existsSync('.env.example');
      const hasEnv = fs.existsSync('.env');
      return { hasEnvExample, hasEnv };
    },
    action: (result) => {
      if (result.hasEnvExample) {
        console.log('   ✅ .env.example exists (good for migration)');
        if (result.hasEnv) {
          console.log('   ✅ .env exists (remember to recreate on main PC)');
        } else {
          console.log('   ⚠️  .env missing (you\'ll need to create it on main PC)');
        }
        return true;
      } else {
        console.log('   ❌ .env.example missing');
        console.log('   💡 Create .env.example with required variables');
        return false;
      }
    }
  },
  {
    name: 'Task Master setup',
    check: () => {
      const hasTasksJson = fs.existsSync('tasks/tasks.json');
      const hasPRD = fs.existsSync('scripts/PRD.txt');
      return { hasTasksJson, hasPRD };
    },
    action: (result) => {
      if (result.hasTasksJson) {
        console.log('   ✅ tasks.json exists');
      } else {
        console.log('   ❌ tasks.json missing');
      }
      
      if (result.hasPRD) {
        console.log('   ✅ PRD.txt exists');
      } else {
        console.log('   ⚠️  PRD.txt missing');
      }
      
      return result.hasTasksJson;
    }
  },
  {
    name: 'Node.js dependencies',
    check: () => {
      const hasPackageJson = fs.existsSync('package.json');
      const hasNodeModules = fs.existsSync('node_modules');
      return { hasPackageJson, hasNodeModules };
    },
    action: (result) => {
      if (result.hasPackageJson) {
        console.log('   ✅ package.json exists');
      } else {
        console.log('   ❌ package.json missing');
        return false;
      }
      
      if (result.hasNodeModules) {
        console.log('   ✅ Dependencies installed (will reinstall on main PC)');
      } else {
        console.log('   ⚠️  node_modules missing (run npm install)');
      }
      
      return true;
    }
  }
];

console.log('Running pre-migration checks...\n');

let allPassed = true;
checks.forEach((check, index) => {
  console.log(`${index + 1}. ${check.name}`);
  const result = check.check();
  const passed = check.action(result);
  if (!passed) allPassed = false;
  console.log('');
});

console.log('='.repeat(60));

if (allPassed) {
  console.log('🎉 Ready for migration!');
  console.log('\nRecommended migration steps:');
  console.log('1. Commit any pending changes: git add . && git commit -m "Pre-migration commit"');
  console.log('2. Push to remote: git push origin main');
  console.log('3. On main PC: git clone <your-repo-url>');
  console.log('4. Follow the MIGRATION_GUIDE.md');
} else {
  console.log('⚠️  Please fix the issues above before migrating');
}

console.log('\n📋 What will transfer:');
console.log('✅ Source code (src/, public/, etc.)');
console.log('✅ Task Master setup (tasks/, scripts/)');
console.log('✅ Configuration files (.cursor/, package.json, etc.)');
console.log('✅ Environment template (.env.example)');
console.log('❌ node_modules/ (will reinstall)');
console.log('❌ .next/ (build cache)');
console.log('❌ .env (recreate with your API keys)');

console.log('\n🔑 Remember to set up these API keys on your main PC:');
console.log('- ANTHROPIC_API_KEY (required for Task Master AI)');
console.log('- PERPLEXITY_API_KEY (optional, for research features)');
console.log('- Any other project-specific API keys from .env.example'); 