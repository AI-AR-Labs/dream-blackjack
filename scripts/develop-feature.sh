#!/bin/bash

# Local development script that mirrors the GitHub Action workflow
# Usage: ./scripts/develop-feature.sh "acceptance criteria text"

if [ -z "$1" ]; then
    echo "Usage: $0 \"acceptance criteria text\""
    exit 1
fi

CRITERIA="$1"

echo "🚀 Starting local feature development..."
echo "📋 Acceptance Criteria:"
echo "$CRITERIA"
echo ""

# Save criteria to file
echo "$CRITERIA" > acceptance-criteria.txt

# Generate tests
echo "🧪 Generating tests from acceptance criteria..."
cat > generate-tests-prompt.txt << 'EOF'
Read the acceptance criteria from acceptance-criteria.txt and generate comprehensive tests for each criterion.

Follow these guidelines:
1. Create a new test file in the tests/ directory
2. Each acceptance criterion should have at least one test
3. Tests should fail initially (since no implementation exists yet)
4. Use descriptive test names
5. Follow the existing test patterns in the codebase

The tests should be thorough and cover edge cases.
EOF

claude-code --prompt-file generate-tests-prompt.txt

# Implement feature
echo "💻 Implementing feature to make tests pass..."
cat > implement-feature-prompt.txt << 'EOF'
Implement the feature to make all tests pass. Follow these steps:

1. Run npm test to see which tests are failing
2. Implement the minimal code needed to make tests pass
3. Run tests again to verify
4. Repeat until all tests pass
5. Ensure code follows project conventions in CLAUDE.md
6. Do not modify the tests unless they have errors

Keep running tests and fixing issues until all tests pass.
EOF

claude-code --prompt-file implement-feature-prompt.txt

# Run final tests
echo "✅ Running final test suite..."
npm test

# Clean up temporary files
rm -f acceptance-criteria.txt generate-tests-prompt.txt implement-feature-prompt.txt

echo "🎉 Feature development complete!"