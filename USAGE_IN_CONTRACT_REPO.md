# Using in Your Contract Repository

## Installation

In your Solidity contract repository, install both packages:

```bash
npm install --save-dev prettier prettier-plugin-solidity prettier-plugin-solidity-align-comments
```

**Important:** You need **both** `prettier-plugin-solidity` AND `prettier-plugin-solidity-align-comments` because our plugin extends the base Solidity plugin.

## Configuration

### Option 1: Single Plugin (Recommended)

Create or update `.prettierrc` in your contract repo:

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
        "solidityAlignColumn": -1
      }
    }
  ]
}
```

**Note:** You only need to list `prettier-plugin-solidity-align-comments` - it automatically includes `prettier-plugin-solidity`.

### Option 2: Explicit Both Plugins

If the above doesn't work (due to Prettier version differences), try listing both:

```json
{
  "plugins": [
    "prettier-plugin-solidity",
    "prettier-plugin-solidity-align-comments"
  ],
  "overrides": [
    {
      "files": "*.sol",
      "options": {
        "printWidth": 120,
        "tabWidth": 4,
        "useTabs": false,
        "singleQuote": false,
        "solidityAlignColumn": -1
      }
    }
  ]
}
```

## Usage

Format your Solidity files:

```bash
npx prettier --write contracts/**/*.sol
```

Or add to `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write 'contracts/**/*.sol'"
  }
}
```

## Troubleshooting

### "No parser could be inferred for file"

**Solution:** Make sure `prettier-plugin-solidity` is installed:
```bash
npm install --save-dev prettier-plugin-solidity
```

### Plugin not aligning comments

**Solution 1:** Clear node cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Solution 2:** Try the "Option 2" config above with both plugins explicitly listed.

**Solution 3:** Check your `.prettierrc` is using the package name, not a path:
- ✅ Correct: `"prettier-plugin-solidity-align-comments"`
- ❌ Wrong: `"./node_modules/prettier-plugin-solidity-align-comments"`

### Comments still not aligning

Make sure:
1. Comments are trailing comments (after semicolons): `uint256 x; // comment`
2. There are at least 2 consecutive lines with trailing comments (single lines won't align)
3. `solidityAlignColumn` is set to `-1` for auto-align

## Testing

Create a test file `test-align.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Test {
    uint256 public value; // Some value
    address public owner; // Contract owner
    bool public active; // Active status
}
```

Run prettier:

```bash
npx prettier --write test-align.sol
```

Expected output (comments should be aligned):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Test {
    uint256 public value; // Some value
    address public owner; // Contract owner
    bool public active;   // Active status
}
```

## Need Help?

If it's still not working, please open an issue with:
1. Your `.prettierrc` file
2. Your `package.json` (versions section)
3. The Solidity file you're trying to format
4. The output you're getting

