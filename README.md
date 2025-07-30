# Dream Skeleton - AI-Driven Development Workflow

This skeleton project enables an AI-driven development workflow using GitHub Issues, GitHub Actions, and Claude Code.

## Workflow Overview

1. **Requirements Definition**: Create a GitHub issue with clear acceptance criteria
2. **Test Generation**: Claude Code translates acceptance criteria into automated tests
3. **Implementation**: Claude Code iteratively writes code until all tests pass
4. **Pull Request**: Automated PR with dev deployment and test results
5. **Integration**: Merge adds feature tests to prevent regression

## Setup

1. Fork/clone this repository
2. Set up a self-hosted GitHub Actions runner on a VM with Claude Code installed
3. Create a GitHub bot account (or use a Personal Access Token):
   - Create a new GitHub account for your bot
   - Generate a Personal Access Token with `repo` and `workflow` permissions
   - Add it as a secret named `BOT_TOKEN` in your repository settings
4. (Optional) For public deployment URLs with ngrok:
   - Sign up for a free ngrok account at https://ngrok.com
   - Get your auth token from https://dashboard.ngrok.com/get-started/your-authtoken
   - Add it as a secret named `NGROK_AUTHTOKEN` in your repository settings
5. Install dependencies: `npm install`
6. Start creating issues with the provided template!

## How It Works

### 1. Create an Issue
Use the "Feature Request" template to create an issue with:
- Clear feature description
- Specific acceptance criteria in testable format
- Add the `ai-ready` label when ready for implementation

### 2. Automated Workflow
The GitHub Action will:
- Extract acceptance criteria from the issue
- Generate comprehensive tests
- Run Claude Code to implement the feature
- Create a PR with all validations

### 3. Review and Merge
Each PR includes:
- Link to dev deployment
- Test coverage report
- Video demonstration (when applicable)
- All tests passing

## Project Structure

```
.github/
  workflows/         # GitHub Actions
  ISSUE_TEMPLATE/    # Issue templates
src/                 # Source code
tests/               # Test files
scripts/             # Automation scripts
config/              # Configuration
CLAUDE.md           # Claude Code instructions
```

## Key Commands

- `npm test` - Run all tests
- `npm run test:coverage` - Generate coverage report
- `npm run dev` - Start development server
- `npm run lint` - Check code style
- `./scripts/develop-feature.sh "criteria"` - Local development workflow

## Local Development

You can test the workflow locally using Claude Code:

```bash
# Run the local development script with your acceptance criteria
./scripts/develop-feature.sh "- [ ] Given X, when Y, then Z
- [ ] The feature should do ABC
- [ ] Error handling: When error occurs, then handle gracefully"
```

This will:
1. Generate tests based on your criteria
2. Implement the feature to pass all tests
3. Run the final test suite

## Example Issue

```markdown
## Acceptance Criteria
- [ ] Given a user visits /api/health, when the server is running, then return { status: "ok" }
- [ ] The endpoint should respond within 100ms
- [ ] Error handling: When database is down, return { status: "error", message: "..." }
```

## Contributing

1. Create an issue with clear acceptance criteria
2. Add the `ai-ready` label
3. Let the AI agent do its magic
4. Review the generated PR
5. Merge when satisfied

## License

MIT