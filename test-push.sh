#!/bin/bash

# Test git push with BOT_TOKEN
echo "🔍 Testing git push with BOT_TOKEN..."

# Get the token (you'll need to set this)
BOT_TOKEN="${1:-YOUR_BOT_TOKEN_HERE}"

if [ "$BOT_TOKEN" = "YOUR_BOT_TOKEN_HERE" ]; then
    echo "❌ Please provide BOT_TOKEN as first argument:"
    echo "   ./test-push.sh YOUR_ACTUAL_TOKEN"
    exit 1
fi

# Create a test directory
TEST_DIR="/tmp/push-test-$$"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

echo "📁 Working in: $TEST_DIR"

# Clone the repo using the token
echo "📥 Cloning repository..."
git clone https://robottonik:${BOT_TOKEN}@github.com/AI-AR-Labs/dream-blackjack.git
cd dream-blackjack

# Create a test branch
TEST_BRANCH="test-push-$(date +%s)"
echo "🌿 Creating test branch: $TEST_BRANCH"
git checkout -b "$TEST_BRANCH"

# Make a small change
echo "# Test push at $(date)" >> test-push.txt
git add test-push.txt
git config user.email "robottonik@users.noreply.github.com"
git config user.name "robottonik"
git commit -m "Test push from local script"

# Try to push
echo "🚀 Attempting push..."
if git push origin "$TEST_BRANCH"; then
    echo "✅ Push successful! Branch created: $TEST_BRANCH"
    echo "🧹 Cleaning up test branch..."
    git push origin --delete "$TEST_BRANCH"
    echo "✅ Test branch deleted"
else
    echo "❌ Push failed!"
    echo "Debug info:"
    git remote -v
fi

# Cleanup
cd /
rm -rf "$TEST_DIR"

echo "✨ Test complete!"