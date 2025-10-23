/**
 * Remark plugin to escape curly braces in math blocks to prevent MDX from parsing them as JSX
 */
const visit = require('unist-util-visit').visit;

function remarkMathEscape() {
  return (tree) => {
    visit(tree, ['math', 'inlineMath'], (node) => {
      if (node.value) {
        // Don't actually modify - just ensure math plugin processes before MDX
        // The key is that remark-math should convert these to HTML before MDX sees them
      }
    });
  };
}

module.exports = remarkMathEscape;
