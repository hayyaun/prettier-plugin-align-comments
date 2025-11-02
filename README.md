# prettier-plugin-align-comments

Utility for aligning trailing comments in Prettier-formatted code.

## Installation

```bash
npm install --save-dev prettier-plugin-align-comments
```

## Usage

Create a wrapper file for your language plugin:

```javascript
// prettier-solidity-aligned.mjs
import { wrapPlugin } from "prettier-plugin-align-comments";
import solidityPlugin from "prettier-plugin-solidity";

export default wrapPlugin(solidityPlugin, "solidity-ast");
```

Then reference it in your config:

```javascript
// prettier.config.mjs
export default {
  plugins: ["./prettier-solidity-aligned.mjs"],
  alignColumn: -1,
  alignMinConsecutive: 2,
};
```

Or with JSON config:

```json
{
  "plugins": ["./prettier-solidity-aligned.mjs"],
  "alignColumn": -1,
  "alignMinConsecutive": 2
}
```

## Example

**Before:**

```solidity
uint256 public x; // Short
address public owner; // Another line
bool public isActive; // Active flag
```

**After:**

```solidity
uint256 public x;        // Short
address public owner;    // Another line
bool public isActive;    // Active flag
```

## Options

**`alignColumn`** (default: `-1`)

- `-1`: Auto-align to longest line
- `> 0`: Fixed column number

**`alignMinConsecutive`** (default: `2`)

- Minimum consecutive lines to trigger alignment

## Programmatic API

```javascript
import { alignComments } from "prettier-plugin-align-comments";

const pattern = /^(\s*)(.*?)([;,])\s+(\/\/.*)$/;
const aligned = alignComments(text, pattern, -1, 2);
```

## License

MIT
