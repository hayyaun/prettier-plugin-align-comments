# prettier-plugin-solidity-align-comments

A Prettier plugin for Solidity that automatically aligns trailing comments for better code readability.

## ✨ Features

- 🎯 **Auto-align trailing comments** - Automatically detects and aligns consecutive lines with trailing comments
- 📏 **Flexible alignment** - Choose between auto-alignment (based on longest line) or fixed column alignment
- 🔌 **Seamless integration** - Works as a wrapper around [prettier-plugin-solidity](https://github.com/prettier-solidity/prettier-plugin-solidity)
- ⚡ **Zero configuration** - Works out of the box with sensible defaults

## 📦 Installation

```bash
npm install --save-dev prettier-plugin-solidity-align-comments prettier prettier-plugin-solidity
```

or with yarn:

```bash
yarn add --dev prettier-plugin-solidity-align-comments prettier prettier-plugin-solidity
```

## 🚀 Usage

### Basic Setup

Add the plugin to your `.prettierrc` configuration:

```json
{
  "plugins": ["prettier-plugin-solidity-align-comments"],
  "overrides": [
    {
      "files": "*.sol",
      "options": {
        "printWidth": 120,
        "tabWidth": 4,
        "useTabs": false,
        "singleQuote": false,
        "bracketSpacing": false
      }
    }
  ]
}
```

### Configuration Options

#### `solidityAlignColumn` (default: `-1`)

Controls how trailing comments are aligned:

- **`-1` (default)**: Auto-align based on the longest line in each group
- **`> 0`**: Align to a fixed column number

**Example: Auto-align (default)**

```json
{
  "plugins": ["prettier-plugin-solidity-align-comments"],
  "overrides": [
    {
      "files": "*.sol",
      "options": {
        "solidityAlignColumn": -1
      }
    }
  ]
}
```

Result: Comments align to the longest line in each group

```solidity
uint256 public value;     // Short line
address public owner;     // Another line
bool public isActive;     // Active flag
```

**Example: Fixed column alignment**

```json
{
  "plugins": ["prettier-plugin-solidity-align-comments"],
  "overrides": [
    {
      "files": "*.sol",
      "options": {
        "solidityAlignColumn": 60
      }
    }
  ]
}
```

Result: All comments align to column 60

```solidity
uint256 public value;                                // Short line
address public owner;                                // Another line
bool public isActive;                                // Active flag
```

## 📖 Examples

### Before

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
  uint256 public totalSupply; // Total token supply
  address public owner; // Contract owner
  mapping(address => uint256) public balances; // User balances
  bool public paused; // Pause state
}
```

### After (Auto-aligned)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
  uint256 public totalSupply;                  // Total token supply
  address public owner;                        // Contract owner
  mapping(address => uint256) public balances; // User balances
  bool public paused;                          // Pause state
}
```

### Complex Example

**Before:**

```solidity
contract Token {
  string public name; // Token name
  string public symbol; // Token symbol
  uint8 public decimals; // Decimal places
  uint256 public totalSupply; // Total supply

  mapping(address => uint256) public balanceOf; // Balance tracking
  mapping(address => mapping(address => uint256)) public allowance; // Allowance tracking

  address public owner; // Contract owner
  bool public paused; // Pause state
}
```

**After:**

```solidity
contract Token {
  string public name;         // Token name
  string public symbol;       // Token symbol
  uint8 public decimals;      // Decimal places
  uint256 public totalSupply; // Total supply

  mapping(address => uint256) public balanceOf;                     // Balance tracking
  mapping(address => mapping(address => uint256)) public allowance; // Allowance tracking

  address public owner; // Contract owner
  bool public paused;   // Pause state
}
```

## 🎯 How It Works

The plugin:

1. Wraps the original `prettier-plugin-solidity` printer
2. Post-processes the formatted output
3. Detects consecutive lines ending with semicolons followed by comments
4. Calculates optimal alignment for each group
5. Adds appropriate spacing to align the comments

## 🔧 Command Line Usage

Format a specific file:

```bash
npx prettier --write --plugin prettier-plugin-solidity-align-comments MyContract.sol
```

Format all Solidity files:

```bash
npx prettier --write --plugin prettier-plugin-solidity-align-comments "contracts/**/*.sol"
```

## 🤝 Compatibility

- **Prettier**: v3.0.0 or higher
- **prettier-plugin-solidity**: v1.0.0 or higher
- **Node.js**: v14.0.0 or higher

## 🐛 Troubleshooting

### Plugin not being applied

Make sure you have both `prettier` and `prettier-plugin-solidity` installed:

```bash
npm install --save-dev prettier prettier-plugin-solidity prettier-plugin-solidity-align-comments
```

Then verify they're installed:

```bash
npm list prettier prettier-plugin-solidity
```

### Comments not aligning

The plugin only aligns **trailing comments** on consecutive lines that:

- End with a semicolon
- Have a `//` comment after the semicolon
- Are part of a group (2+ consecutive lines)

Single lines with trailing comments are left as-is.

### Still not working?

Try clearing your node_modules and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

MIT © Hayyan Hami

## 🙏 Acknowledgments

This plugin is built on top of [prettier-plugin-solidity](https://github.com/prettier-solidity/prettier-plugin-solidity) by the Prettier Solidity team.

## 🤔 Why This Plugin?

While Prettier does an excellent job of formatting code, it doesn't align trailing comments. For Solidity contracts with many state variables or struct fields, aligned comments significantly improve readability. This plugin fills that gap!

## 📮 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Prettier](https://prettier.io/)
- [prettier-plugin-solidity](https://github.com/prettier-solidity/prettier-plugin-solidity)
- [Solidity Documentation](https://docs.soliditylang.org/)
