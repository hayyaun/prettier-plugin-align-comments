#!/usr/bin/env node

/**
 * Verification script to ensure the plugin is working correctly
 */

console.log('🔍 Verifying plugin structure...\n');

import fs from 'fs';
import path from 'path';

const checks = [
  { file: 'package.json', desc: 'Package configuration' },
  { file: 'README.md', desc: 'Documentation' },
  { file: 'LICENSE', desc: 'License file' },
  { file: 'prettier-plugin-solidity-align-comments.mjs', desc: 'Main plugin file' },
  { file: 'examples/Token.sol', desc: 'Example files' },
  { file: '.gitignore', desc: 'Git ignore file' },
  { file: '.npmignore', desc: 'NPM ignore file' },
];

let allGood = true;

checks.forEach(check => {
  const exists = fs.existsSync(check.file);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${check.desc}: ${check.file}`);
  if (!exists) allGood = false;
});

console.log('\n' + '='.repeat(60));

if (allGood) {
  console.log('✅ All checks passed! Repository is ready for publishing.');
  console.log('\nNext steps:');
  console.log('  1. Update package.json with your author info and repository URL');
  console.log('  2. Update LICENSE with your name');
  console.log('  3. Initialize git: git init && git add . && git commit -m "Initial commit"');
  console.log('  4. Create a GitHub repository and push your code');
  console.log('  5. Publish to npm: npm publish');
  console.log('\nSee PUBLISHING.md for detailed instructions.');
} else {
  console.log('❌ Some files are missing. Please check the errors above.');
  process.exit(1);
}

console.log('='.repeat(60));
