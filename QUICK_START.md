# Quick Start Guide

Get up and running with prettier-plugin-solidity-align-comments in under 5 minutes!

## 📦 Installation

```bash
npm install --save-dev prettier-plugin-solidity-align-comments prettier prettier-plugin-solidity
```

## 🔧 Configuration

Create a `.prettierrc` file in your project root:

```json
{
  "plugins": ["prettier-plugin-solidity-align-comments"],
  "overrides": [
    {
      "files": "*.sol",
      "options": {
        "printWidth": 120,
        "tabWidth": 4,
        "useTabs": false
      }
    }
  ]
}
```

## 🚀 Usage

### Format a single file
```bash
npx prettier --write MyContract.sol
```

### Format all Solidity files
```bash
npx prettier --write "contracts/**/*.sol"
```

### IDE Integration

#### VS Code
1. Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Enable "Format on Save" in settings
3. Done! Your comments will auto-align when you save

#### Other IDEs
Most IDEs support Prettier. Check your IDE's documentation for Prettier integration.

## ✨ What You'll Get

**Before:**
```solidity
contract Token {
    string public name; // Token name
    string public symbol; // Token symbol
    uint256 public totalSupply; // Total supply
}
```

**After:**
```solidity
contract Token {
    string public name;         // Token name
    string public symbol;       // Token symbol
    uint256 public totalSupply; // Total supply
}
```

## 🎛️ Options

### Auto-align (default)
```json
{
  "solidityAlignColumn": -1
}
```
Comments align based on the longest line in each group.

### Fixed column
```json
{
  "solidityAlignColumn": 60
}
```
All comments align to column 60.

## 📚 More Information

- See [README.md](README.md) for detailed documentation
- Check [examples/](examples/) for more examples
- Run `npm run demo` to see the plugin in action

## 🐛 Issues?

If something's not working:
1. Make sure all packages are installed: `npm list prettier prettier-plugin-solidity`
2. Check that your `.prettierrc` includes the plugin
3. Try running with `--plugin` flag explicitly: `npx prettier --write --plugin prettier-plugin-solidity-align-comments MyContract.sol`
4. [Open an issue](https://github.com/yourusername/prettier-plugin-solidity-align-comments/issues) if you're still stuck

## 💡 Tips

- The plugin only aligns **trailing comments** (comments after code ending with semicolon)
- Comments must be on consecutive lines to be aligned as a group
- Single lines with comments are left unchanged
- It works with all Solidity constructs (variables, mappings, constants, etc.)

Happy formatting! 🎉

