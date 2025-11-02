// prettier-plugin-align-comments.mjs
// Universal Prettier plugin to align trailing comments across all programming languages

import * as prettierModule from "prettier";

// Access prettier APIs
const prettier = prettierModule.default || prettierModule;

// Register custom options for Prettier v3
export const options = {
  alignColumn: {
    category: "Global",
    type: "int",
    default: -1,
    description:
      "Column to align trailing comments (-1 = auto-align, >0 = fixed column)",
  },
  alignMinConsecutive: {
    category: "Global",
    type: "int",
    default: 2,
    description: "Minimum consecutive lines to trigger alignment (default: 2)",
  },
};

/**
 * Language-specific comment patterns
 * Maps parser names to their comment patterns
 * Pattern captures: (indent)(code)(terminator)(spacing)(comment)
 */
const PARSER_PATTERNS = {
  // JavaScript, TypeScript, and variants (C-style comments with semicolons)
  babel: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  typescript: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  "babel-ts": /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  "babel-flow": /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  flow: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  espree: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  meriyah: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  acorn: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  __js_expression: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  __ts_expression: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  __vue_expression: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  __vue_ts_expression: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  angular: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  lwc: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,

  // CSS and variants
  css: /^(\s*)(.*?)([;])\s+(\/\/.*)$/,
  scss: /^(\s*)(.*?)([;])\s+(\/\/.*)$/,
  less: /^(\s*)(.*?)([;])\s+(\/\/.*)$/,

  // JSON (with comments - JSON5, JSONC)
  json: /^(\s*)(.*?)([,])\s+(\/\/.*)$/,
  json5: /^(\s*)(.*?)([,])\s+(\/\/.*)$/,
  "json-stringify": /^(\s*)(.*?)([,])\s+(\/\/.*)$/,

  // YAML (hash comments)
  yaml: /^(\s*)(.+?)([:,])\s+(#.*)$/,

  // GraphQL (hash comments)
  graphql: /^(\s*)(.+?)()\s+(#.*)$/,

  // PHP (C-style comments)
  php: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,

  // Solidity (C-style comments with semicolons)
  "solidity-parse": /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  "solidity-ast": /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
  "slang-ast": /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,

  // Markdown (HTML comments)
  markdown: /^(\s*)(.+?)()\s+(<!--.*?-->)$/,
  mdx: /^(\s*)(.+?)()\s+(<!--.*?-->)$/,

  // HTML and variants (HTML comments)
  html: /^(\s*)(.*?)(>)\s+(<!--.*?-->)$/,
  vue: /^(\s*)(.*?)([;,])\s+(\/\/.*)$/,
};

/**
 * Get the appropriate pattern for a given parser
 */
function getPatternForParser(parser) {
  return PARSER_PATTERNS[parser] || PARSER_PATTERNS["babel"]; // Default to C-style
}

/**
 * Post-process formatted code to align trailing comments
 */
export function alignComments(
  text,
  pattern,
  alignColumn = -1,
  minConsecutive = 2,
) {
  const lines = text.split("\n");
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check if this line has a trailing comment
    const match = line.match(pattern);

    if (match) {
      // Found a line with trailing comment, collect consecutive ones
      const group = [];
      let j = i;

      while (j < lines.length) {
        const currentLine = lines[j];
        const currentMatch = currentLine.match(pattern);

        if (currentMatch) {
          group.push({
            indent: currentMatch[1],
            code: currentMatch[2],
            terminator: currentMatch[3] || "",
            comment: currentMatch[4],
            fullLine: currentLine,
          });
          j++;
        } else {
          break;
        }
      }

      // Align the group if we have enough consecutive lines
      if (group.length >= minConsecutive) {
        // Find the maximum code length
        let maxCodeLen = 0;
        for (const item of group) {
          const codeLen = (item.indent + item.code + item.terminator).length;
          maxCodeLen = Math.max(maxCodeLen, codeLen);
        }

        // Use fixed column if specified
        if (alignColumn > 0) {
          maxCodeLen = alignColumn - 1;
        }

        // Rebuild the lines with aligned comments
        for (const item of group) {
          const codeLen = (item.indent + item.code + item.terminator).length;
          const padding = Math.max(1, maxCodeLen - codeLen + 1);
          const aligned =
            item.indent +
            item.code +
            item.terminator +
            " ".repeat(padding) +
            item.comment;
          result.push(aligned);
        }

        i = j;
      } else {
        // Not enough consecutive lines, keep as-is
        for (const item of group) {
          result.push(item.fullLine);
        }
        i = j;
      }
    } else {
      result.push(line);
      i++;
    }
  }

  return result.join("\n");
}

/**
 * Helper function to wrap an existing plugin (for plugins like Solidity)
 * This is used when you need to wrap a language-specific plugin
 *
 * Usage:
 *   import { wrapPlugin } from 'prettier-plugin-align-comments';
 *   import solidityPlugin from 'prettier-plugin-solidity';
 *   export default wrapPlugin(solidityPlugin, 'solidity-ast');
 */
export function wrapPlugin(originalPlugin, parserName = null) {
  const wrappedPrinters = {};

  if (originalPlugin.printers) {
    for (const [printerName, printer] of Object.entries(
      originalPlugin.printers,
    )) {
      const actualParserName = parserName || printerName;

      wrappedPrinters[printerName] = {
        ...printer,
        print(path, options, print) {
          const doc = printer.print(path, options, print);

          // Only post-process at the root level
          const node = path.getValue();

          // Different parsers have different root node indicators
          const isRoot =
            node.type === "File" || // Babel
            node.type === "Program" || // Many parsers
            node.type === "SourceUnit" || // Solidity
            node.type === "Module" || // Some languages
            node.kind === "SourceUnit" || // Solidity v2
            node.type === "Document" || // YAML, GraphQL
            node.type === "Root" || // Markdown
            path.stack.length <= 1; // Fallback: we're at the root

          if (isRoot) {
            try {
              // Convert doc to string
              const { printDocToString } = prettier.doc.printer;
              const printed = printDocToString(doc, {
                printWidth: options.printWidth,
                tabWidth: options.tabWidth,
                useTabs: options.useTabs,
              });

              // Get the parser-specific pattern
              const pattern = getPatternForParser(actualParserName);

              // Align comments
              const aligned = alignComments(
                printed.formatted,
                pattern,
                options.alignColumn,
                options.alignMinConsecutive,
              );

              // Return the aligned text
              return aligned;
            } catch (error) {
              // If something goes wrong, return the original doc
              console.error("prettier-plugin-align-comments error:", error);
              return doc;
            }
          }

          return doc;
        },
      };
    }
  }

  return {
    ...originalPlugin,
    options: {
      ...originalPlugin.options,
      ...options,
    },
    printers: wrappedPrinters,
  };
}

// Export the plugin
// Note: This plugin works as a post-processor via CLI/API, not as a .prettierrc plugin
// For .prettierrc usage, you need to wrap language-specific plugins using wrapPlugin()
export default {
  options,
  printers: {}, // Empty - this plugin is meant to be used programmatically
};
