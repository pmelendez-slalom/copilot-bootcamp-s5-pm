---
description: "Workspace instructions for TODO application development with TDD focus"
---

# GitHub Copilot Instructions - TODO Application

## Project Context

This is a **full-stack TODO application** with:
- **Frontend**: React-based user interface
- **Backend**: Express.js REST API
- **Development Approach**: Iterative, feedback-driven development
- **Current Phase**: Backend stabilization and frontend feature completion

The project emphasizes test-driven development, incremental changes, and systematic validation at every step.

## Documentation References

Refer to these project documentation files to understand architecture, patterns, and standards:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles throughout all development work:

### Test-Driven Development (TDD)
- Follow the **Red-Green-Refactor cycle**
- Write tests FIRST before implementing features
- Use failing tests as specifications
- Ensure all tests pass before considering work complete

### Incremental Changes
- Make small, testable modifications
- Validate after each change
- Keep commits focused and meaningful
- Each change should be independently verifiable

### Systematic Debugging
- Use test failures as guides for troubleshooting
- Isolate issues through targeted testing
- Debug incrementally with clear hypotheses
- Document findings for future reference

### Validation Before Commit
- Ensure ALL tests pass locally
- Fix ALL lint errors
- Review code for clarity and correctness
- Only commit validated, working code

## Testing Scope

This project uses **unit tests and integration tests ONLY**. No end-to-end testing frameworks are used.

### Testing Tools by Layer

**Backend**: Jest + Supertest
- API endpoint testing
- Business logic validation
- Integration between components

**Frontend**: React Testing Library
- Component unit tests
- Component integration tests
- User interaction simulation

**UI Verification**: Manual browser testing
- Full page flows
- Visual correctness
- Cross-browser compatibility (if applicable)

### Important Constraints

**DO NOT** suggest or implement:
- ❌ End-to-end test frameworks (Playwright, Cypress, Selenium)
- ❌ Browser automation tools
- ❌ Test runners outside Jest and React Testing Library

**Reason**: Keep the lab focused on core unit and integration testing patterns without e2e complexity.

### Testing Approach by Context

**Backend API Changes**:
1. Write Jest tests FIRST (RED)
2. Run tests—they will fail
3. Implement backend code (GREEN)
4. Ensure tests pass
5. Refactor if needed (REFACTOR)

**Frontend Component Features**:
1. Write React Testing Library tests FIRST for component behavior (RED)
2. Run tests—they will fail
3. Implement component code (GREEN)
4. Ensure tests pass
5. Follow with manual browser testing for full UI flows
6. Refactor if needed (REFACTOR)

This is **true TDD**: Test first, then code to pass the test.

## Workflow Patterns

### TDD Workflow
1. Write or fix tests based on requirements
2. Run the test suite
3. Observe failures (RED phase)
4. Implement code to pass tests (GREEN phase)
5. Refactor for clarity and efficiency (REFACTOR phase)
6. Re-run tests to confirm stability

### Code Quality Workflow
1. Run lint checks across the codebase
2. Categorize issues by type and severity
3. Fix issues systematically
4. Re-validate with lint checks
5. Commit when all issues are resolved

### Integration Workflow
1. Identify the issue or requirement
2. Debug systematically with targeted tests
3. Test the fix in isolation
4. Implement the solution
5. Verify end-to-end functionality

## Chat Mode Usage

Use specialized chat modes for specific development contexts:

### `tdd-developer` Mode
- **Purpose**: Test-related work and Red-Green-Refactor cycles
- **Use When**: Writing tests, implementing code to pass tests, debugging test failures
- **Focus**: TDD workflow, test strategy, and code implementation

### `code-reviewer` Mode
- **Purpose**: Addressing lint errors and code quality improvements
- **Use When**: Fixing linting issues, refactoring code, improving code style
- **Focus**: Code quality, standards compliance, best practices

## Memory System

This project uses a working memory system to track development discoveries and patterns:

- **Persistent Memory**: This file (`.github/copilot-instructions.md`) contains foundational principles and workflows
- **Working Memory**: `.github/memory/` directory contains discoveries and patterns
- **During active development**, take notes in `.github/memory/scratch/working-notes.md` (not committed)
- **At end of session**, summarize key findings into `.github/memory/session-notes.md` (committed)
- **Document recurring code patterns** in `.github/memory/patterns-discovered.md` (committed)
- **Reference these files** when providing context-aware suggestions

### Memory Files

- **[.github/memory/README.md](memory/README.md)** - Complete memory system documentation
- **[.github/memory/session-notes.md](memory/session-notes.md)** - Historical session summaries (committed)
- **[.github/memory/patterns-discovered.md](memory/patterns-discovered.md)** - Accumulated code patterns (committed)
- **[.github/memory/scratch/working-notes.md](memory/scratch/working-notes.md)** - Active session notes (not committed)

The memory system creates a knowledge base that grows over time, helping both developers and AI assistants make better decisions based on past learnings.

## Workflow Utilities

### GitHub CLI Commands

Use these GitHub CLI commands to manage project work (available in all modes):

- **List open issues**: `gh issue list --state open`
- **Get issue details**: `gh issue view <issue-number>`
- **Get issue with comments**: `gh issue view <issue-number> --comments`

### Exercise Workflow

When working on exercises:
- The main exercise issue will have **"Exercise:"** in the title
- Steps are posted as **comments on the main issue**
- Use the GitHub CLI commands above when `/execute-step` or `/validate-step` prompts are invoked
- Follow each step systematically

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

```
<type>: <subject>

<body>
```

**Commit Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Build, dependency, or tooling changes
- `docs:` - Documentation updates
- `refactor:` - Code refactoring without behavior change
- `test:` - Test additions or modifications
- `style:` - Code style changes (formatting, missing semicolons, etc.)

### Branch Strategy

- **Feature branches**: `feature/<descriptive-name>`
- Example: `feature/add-todo-filter` or `feature/fix-api-validation`

### Staging and Pushing

1. **Stage all changes**: `git add .`
2. **Commit with conventional format**: `git commit -m "feat: add user authentication"`
3. **Push to branch**: `git push origin <branch-name>`

Always stage all changes together before committing to ensure atomic, well-organized commits.
