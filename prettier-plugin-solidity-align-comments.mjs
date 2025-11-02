// prettier-plugin-solidity-align-comments.mjs
// Prettier v3 plugin to align trailing comments in Solidity files

import prettier from 'prettier';
import originalPlugin from 'prettier-plugin-solidity';

const { printDocToString } = prettier.doc.printer;
const { builders } = prettier.doc;

// Register custom option for Prettier v3
const options = {
  solidityAlignColumn: {
    category: 'Solidity',
    type: 'int',
    default: -1,
    description: 'Column to align trailing comments (-1 = auto-align, >0 = fixed column)',
  },
};

/**
 * Post-process formatted code to align trailing comments
 */
function alignComments(text, alignColumn = -1) {
  const lines = text.split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check if this line has a trailing comment (statement ending with semicolon + comment)
    const match = line.match(/^(\s*)(.*?)(;)\s+(\/\/.*)$/);

    if (match) {
      // Found a line with trailing comment, collect consecutive ones
      const group = [];
      let j = i;

      while (j < lines.length) {
        const currentLine = lines[j];
        const currentMatch = currentLine.match(/^(\s*)(.*?)(;)\s+(\/\/.*)$/);

        if (currentMatch) {
          group.push({
            indent: currentMatch[1],
            code: currentMatch[2],
            semicolon: currentMatch[3],
            comment: currentMatch[4],
            fullLine: currentLine,
          });
          j++;
        } else {
          break;
        }
      }

      // Align the group if we have more than one line
      if (group.length > 1) {
        // Find the maximum code length
        let maxCodeLen = 0;
        for (const item of group) {
          const codeLen = (item.indent + item.code + item.semicolon).length;
          maxCodeLen = Math.max(maxCodeLen, codeLen);
        }

        // Use fixed column if specified
        if (alignColumn > 0) {
          maxCodeLen = alignColumn - 1;
        }

        // Rebuild the lines with aligned comments
        for (const item of group) {
          const codeLen = (item.indent + item.code + item.semicolon).length;
          const padding = Math.max(1, maxCodeLen - codeLen + 1);
          const aligned = item.indent + item.code + item.semicolon + ' '.repeat(padding) + item.comment;
          result.push(aligned);
        }

        i = j;
      } else {
        result.push(line);
        i++;
      }
    } else {
      result.push(line);
      i++;
    }
  }

  return result.join('\n');
}

// Get the original printer
const originalPrinter = originalPlugin.printers['solidity-ast'];

// Create a wrapped printer that post-processes at the root level
const wrappedPrinter = {
  ...originalPrinter,
  print(path, options, print) {
    const doc = originalPrinter.print(path, options, print);

    // Only post-process at the root level (SourceUnit)
    const node = path.getValue();
    if (node.type === 'SourceUnit') {
      // Convert doc to string, align comments, and return as doc
      const printed = printDocToString(doc, {
        printWidth: options.printWidth,
        tabWidth: options.tabWidth,
        useTabs: options.useTabs,
      });

      const aligned = alignComments(printed.formatted, options.solidityAlignColumn);

      // Return the aligned text directly
      return aligned;
    }

    return doc;
  },
};

export default {
  ...originalPlugin,
  options,
  printers: {
    ...originalPlugin.printers,
    'solidity-ast': wrappedPrinter,
  },
};
