#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 TileTech Web - Migration Method Selector\n');

const questions = [
  {
    question: 'Do you have Docker installed on your main PC? (y/n): ',
    key: 'hasDocker'
  },
  {
    question: 'Are you comfortable with Docker commands? (y/n): ',
    key: 'dockerComfort'
  },
  {
    question: 'Do you want identical environments across machines? (y/n): ',
    key: 'wantsConsistency'
  },
  {
    question: 'Do you prefer minimal setup time? (y/n): ',
    key: 'wantsQuickSetup'
  },
  {
    question: 'Will you be switching between multiple machines frequently? (y/n): ',
    key: 'multiMachine'
  }
];

const answers = {};

function askQuestion(index) {
  if (index >= questions.length) {
    analyzeAnswers();
    return;
  }

  const q = questions[index];
  rl.question(q.question, (answer) => {
    answers[q.key] = answer.toLowerCase().startsWith('y');
    askQuestion(index + 1);
  });
}

function analyzeAnswers() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 Analysis Results:\n');

  let dockerScore = 0;
  let nativeScore = 0;

  // Scoring logic
  if (answers.hasDocker) dockerScore += 3;
  else nativeScore += 2;

  if (answers.dockerComfort) dockerScore += 2;
  else nativeScore += 1;

  if (answers.wantsConsistency) dockerScore += 3;
  else nativeScore += 1;

  if (answers.wantsQuickSetup) dockerScore += 2;
  else nativeScore += 1;

  if (answers.multiMachine) dockerScore += 3;
  else nativeScore += 1;

  console.log(`Docker Score: ${dockerScore}`);
  console.log(`Native Score: ${nativeScore}\n`);

  if (dockerScore > nativeScore) {
    recommendDocker();
  } else {
    recommendNative();
  }

  rl.close();
}

function recommendDocker() {
  console.log('🐳 RECOMMENDATION: Use Docker Migration\n');
  
  console.log('✅ Why Docker is best for you:');
  if (answers.hasDocker) console.log('   - You already have Docker installed');
  if (answers.dockerComfort) console.log('   - You\'re comfortable with Docker');
  if (answers.wantsConsistency) console.log('   - You want identical environments');
  if (answers.wantsQuickSetup) console.log('   - Docker provides faster setup');
  if (answers.multiMachine) console.log('   - Perfect for multi-machine workflows');

  console.log('\n🚀 Quick Start Steps:');
  console.log('1. On main PC: Install Docker Desktop (if needed)');
  console.log('2. git clone https://github.com/Pongeek/TileTech.git');
  console.log('3. cd TileTech');
  console.log('4. cp .env.example .env  # Add your API keys');
  console.log('5. docker-compose up -d');
  console.log('6. docker-compose exec tiletechweb task-master list');

  console.log('\n📚 Read the full guide:');
  console.log('   - scripts/docker-migration-guide.md');
  
  console.log('\n⚡ Estimated setup time: 5-10 minutes');
}

function recommendNative() {
  console.log('⚙️  RECOMMENDATION: Use Native Migration\n');
  
  console.log('✅ Why native is best for you:');
  if (!answers.hasDocker) console.log('   - No Docker installation needed');
  if (!answers.dockerComfort) console.log('   - Uses familiar Node.js tools');
  if (!answers.wantsConsistency) console.log('   - Simpler setup process');
  if (!answers.multiMachine) console.log('   - Single machine development');

  console.log('\n🚀 Quick Start Steps:');
  console.log('1. On main PC: Install Node.js (if needed)');
  console.log('2. git clone https://github.com/Pongeek/TileTech.git');
  console.log('3. cd TileTech');
  console.log('4. npm install');
  console.log('5. npm install -g task-master-ai');
  console.log('6. cp .env.example .env  # Add your API keys');
  console.log('7. npm run dev');
  console.log('8. task-master list');

  console.log('\n📚 Read the full guide:');
  console.log('   - MIGRATION_GUIDE.md');
  
  console.log('\n⚡ Estimated setup time: 15-20 minutes');
}

console.log('Answer a few questions to get a personalized recommendation:\n');
askQuestion(0); 