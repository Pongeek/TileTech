#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying TileTech Web Migration...\n');

const checks = [
  {
    name: 'Package.json exists',
    check: () => fs.existsSync('package.json'),
    fix: 'Ensure package.json was transferred'
  },
  {
    name: 'Tasks directory exists',
    check: () => fs.existsSync('tasks') && fs.existsSync('tasks/tasks.json'),
    fix: 'Ensure tasks/ folder and tasks.json were transferred'
  },
  {
    name: 'Source code exists',
    check: () => fs.existsSync('src'),
    fix: 'Ensure src/ folder was transferred'
  },
  {
    name: 'Environment example exists',
    check: () => fs.existsSync('.env.example'),
    fix: 'Ensure .env.example was transferred'
  },
  {
    name: 'Environment file configured',
    check: () => fs.existsSync('.env'),
    fix: 'Copy .env.example to .env and configure with your API keys'
  },
  {
    name: 'Node modules installed',
    check: () => fs.existsSync('node_modules'),
    fix: 'Run: npm install'
  },
  {
    name: 'Cursor rules exist',
    check: () => fs.existsSync('.cursor'),
    fix: 'Ensure .cursor/ folder was transferred'
  },
  {
    name: 'PRD exists',
    check: () => fs.existsSync('scripts/PRD.txt'),
    fix: 'Ensure scripts/PRD.txt was transferred'
  }
];

let allPassed = true;

checks.forEach((check, index) => {
  const passed = check.check();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${check.name}`);
  
  if (!passed) {
    console.log(`   💡 Fix: ${check.fix}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 Migration verification PASSED!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run dev (to test the app)');
  console.log('2. Run: task-master list (to verify Task Master)');
  console.log('3. Open in Cursor and test MCP tools');
} else {
  console.log('⚠️  Migration verification FAILED!');
  console.log('Please fix the issues above before proceeding.');
}

console.log('\n📋 Task Master Quick Commands:');
console.log('- task-master list              # View all tasks');
console.log('- task-master next              # Get next task to work on');
console.log('- task-master show <id>         # View specific task');
console.log('- task-master set-status --id=<id> --status=done  # Mark task complete'); 