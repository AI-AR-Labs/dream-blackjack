# Claude Code Rules for AI-Driven Development

## Project Overview
This is an AI-driven development project where features are implemented based on GitHub issues with acceptance criteria.

## Development Workflow

1. **Test-First Approach**: Always generate tests from acceptance criteria before writing implementation code
2. **Iterative Development**: Run tests frequently and fix failures one by one
3. **Clean Code**: Follow existing patterns and conventions in the codebase
4. **Documentation**: Update relevant documentation when adding new features

## Key Commands

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Check code style
- `npm run format` - Format code

## Testing Guidelines

1. Each acceptance criterion should have at least one corresponding test
2. Tests should be independent and not rely on external services
3. Use descriptive test names that explain what is being tested
4. Include both positive and negative test cases

## Code Structure

- `/src` - Source code
- `/tests` - Test files
- `/config` - Configuration files
- `/scripts` - Build and automation scripts

## Implementation Process

When implementing a feature:
1. Read the acceptance criteria from the GitHub issue
2. Generate comprehensive tests covering all criteria
3. Implement the minimal code to make tests pass
4. Refactor for clarity and maintainability
5. Ensure all existing tests still pass
6. Update documentation if needed

## Git Workflow

- Feature branches: `feature/issue-{number}`
- Commit messages: Clear and descriptive
- Always run tests before committing
- Keep commits focused on single changes

## Important Notes

- Never modify existing tests unless they are incorrect
- Always preserve backward compatibility
- If unclear about requirements, add clarifying comments in the PR
- Include examples in documentation for new features