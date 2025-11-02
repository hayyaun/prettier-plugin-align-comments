#!/usr/bin/env node

/**
 * Simple demo script to show the plugin in action
 * Run with: node demo.mjs
 */

import prettier from 'prettier';
import plugin from './prettier-plugin-solidity-align-comments.mjs';

const unformattedCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Demo {
    uint256 public value; // Some value
    address public owner; // Contract owner  
    bool public active; // Active status
    mapping(address => uint256) public balances; // User balances
}`;

console.log('='.repeat(60));
console.log('Prettier Plugin Solidity Align Comments - Demo');
console.log('='.repeat(60));
console.log('\n📝 Original Code:\n');
console.log(unformattedCode);

const formatted = await prettier.format(unformattedCode, {
  parser: 'solidity-parse',
  plugins: [plugin],
  printWidth: 80,
  tabWidth: 4,
  useTabs: false,
  solidityAlignColumn: -1, // Auto-align
});

console.log('\n✨ Formatted Code (with aligned comments):\n');
console.log(formatted);
console.log('='.repeat(60));
console.log('✅ Demo complete! Comments are now aligned.');
console.log('='.repeat(60));

